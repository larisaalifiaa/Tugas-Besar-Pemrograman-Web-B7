const db = require('../config/database');
const bcrypt = require('bcryptjs');

// GET /profile - tampilkan halaman profile
const showProfile = (req, res) => {
  res.sendFile('index.html', { root: './src/views/profile' });
};

// GET /api/profile - ambil data profile (API)
const getProfile = async (req, res) => {
  try {
    const userId = req.session.user.id;

    const [rows] = await db.query(
      `SELECT u.id, u.name, u.email, u.created_at,
              GROUP_CONCAT(r.name) as roles
       FROM users u
       LEFT JOIN model_has_roles mhr ON u.id = mhr.model_id AND mhr.model_type = 'App\\\\Models\\\\User'
       LEFT JOIN roles r ON mhr.role_id = r.id
       WHERE u.id = ?
       GROUP BY u.id`,
      [userId]
    );

    if (rows.length === 0) {
      return res.status(404).json({ success: false, message: 'User tidak ditemukan' });
    }

    const user = rows[0];
    user.roles = user.roles ? user.roles.split(',') : [];

    return res.json({ success: true, data: user });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ success: false, message: 'Server error' });
  }
};

// PUT /api/profile - update profile
const updateProfile = async (req, res) => {
  const { name, email } = req.body;
  const userId = req.session.user.id;

  if (!name || !email) {
    return res.status(400).json({ success: false, message: 'Name dan email wajib diisi' });
  }

  try {
    // Cek email sudah dipakai user lain
    const [existing] = await db.query(
      'SELECT id FROM users WHERE email = ? AND id != ?',
      [email, userId]
    );

    if (existing.length > 0) {
      return res.status(400).json({ success: false, message: 'Email sudah digunakan' });
    }

    await db.query(
      'UPDATE users SET name = ?, email = ?, updated_at = NOW() WHERE id = ?',
      [name, email, userId]
    );

    // Update session
    req.session.user.name = name;
    req.session.user.email = email;

    return res.json({ success: true, message: 'Profile berhasil diupdate' });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ success: false, message: 'Server error' });
  }
};

// PUT /api/profile/password - ganti password
const updatePassword = async (req, res) => {
  const { current_password, new_password, confirm_password } = req.body;
  const userId = req.session.user.id;

  if (!current_password || !new_password || !confirm_password) {
    return res.status(400).json({ success: false, message: 'Semua field wajib diisi' });
  }

  if (new_password !== confirm_password) {
    return res.status(400).json({ success: false, message: 'Konfirmasi password tidak cocok' });
  }

  if (new_password.length < 8) {
    return res.status(400).json({ success: false, message: 'Password minimal 8 karakter' });
  }

  try {
    const [rows] = await db.query('SELECT password FROM users WHERE id = ?', [userId]);
    const user = rows[0];

    const isMatch = await bcrypt.compare(current_password, user.password);
    if (!isMatch) {
      return res.status(400).json({ success: false, message: 'Password lama salah' });
    }

    const hashed = await bcrypt.hash(new_password, 10);
    await db.query(
      'UPDATE users SET password = ?, updated_at = NOW() WHERE id = ?',
      [hashed, userId]
    );

    return res.json({ success: true, message: 'Password berhasil diubah' });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ success: false, message: 'Server error' });
  }
};

module.exports = { showProfile, getProfile, updateProfile, updatePassword };
