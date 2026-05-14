const db = require('../config/database');
const bcrypt = require('bcryptjs');

// GET /auth/login - tampilkan halaman login
const showLogin = (req, res) => {
  res.sendFile('login.html', { root: './src/views/auth' });
};

// POST /auth/login - proses login
const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ success: false, message: 'Email dan password wajib diisi' });
  }

  try {
    const [rows] = await db.query(
      'SELECT * FROM users WHERE email = ? LIMIT 1',
      [email]
    );

    if (rows.length === 0) {
      return res.status(401).json({ success: false, message: 'Email tidak ditemukan' });
    }

    const user = rows[0];
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ success: false, message: 'Password salah' });
    }

    // Ambil roles user
    const [roles] = await db.query(
      `SELECT r.name FROM roles r
       JOIN model_has_roles mhr ON r.id = mhr.role_id
       WHERE mhr.model_id = ? AND mhr.model_type = 'App\\\\Models\\\\User'`,
      [user.id]
    );

    // Simpan ke session
    req.session.user = {
      id: user.id,
      name: user.name,
      email: user.email,
      roles: roles.map(r => r.name),
    };

    return res.json({ success: true, message: 'Login berhasil', redirect: '/dashboard' });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ success: false, message: 'Server error' });
  }
};

// POST /auth/logout - proses logout
const logout = (req, res) => {
  req.session.destroy(() => {
    res.redirect('/auth/login');
  });
};

module.exports = { showLogin, login, logout };
