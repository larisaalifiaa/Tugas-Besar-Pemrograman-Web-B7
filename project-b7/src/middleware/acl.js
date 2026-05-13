const db = require('../config/database');

// Middleware: cek apakah user punya permission tertentu
function hasPermission(permissionName) {
  return async (req, res, next) => {
    try {
      const userId = req.session.user.id;

      // Cek direct permission ke user
      const [directPerms] = await db.query(
        `SELECT p.name FROM permissions p
         JOIN model_has_permissions mhp ON p.id = mhp.permission_id
         WHERE mhp.model_id = ? AND mhp.model_type = 'App\\\\Models\\\\User'
           AND p.name = ?`,
        [userId, permissionName]
      );

      if (directPerms.length > 0) return next();

      // Cek permission lewat role
      const [rolePerms] = await db.query(
        `SELECT p.name FROM permissions p
         JOIN role_has_permissions rhp ON p.id = rhp.permission_id
         JOIN model_has_roles mhr ON rhp.role_id = mhr.role_id
         WHERE mhr.model_id = ? AND mhr.model_type = 'App\\\\Models\\\\User'
           AND p.name = ?`,
        [userId, permissionName]
      );

      if (rolePerms.length > 0) return next();

      return res.status(403).json({ message: 'Forbidden: tidak punya akses' });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ message: 'Server error' });
    }
  };
}

// Middleware: cek apakah user punya role tertentu
function hasRole(roleName) {
  return async (req, res, next) => {
    try {
      const userId = req.session.user.id;

      const [rows] = await db.query(
        `SELECT r.name FROM roles r
         JOIN model_has_roles mhr ON r.id = mhr.role_id
         WHERE mhr.model_id = ? AND mhr.model_type = 'App\\\\Models\\\\User'
           AND r.name = ?`,
        [userId, roleName]
      );

      if (rows.length > 0) return next();

      return res.status(403).json({ message: 'Forbidden: role tidak sesuai' });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ message: 'Server error' });
    }
  };
}

module.exports = { hasPermission, hasRole };
