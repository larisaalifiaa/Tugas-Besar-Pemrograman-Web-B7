require('dotenv').config();
const express = require('express');
const session = require('express-session');
const path = require('path');

const app = express();
app.set('view engine', 'ejs');
app.set('views', './src/views');

// Static files (CSS, JS, images)
app.use(express.static(path.join(__dirname, 'public')));

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Session
app.use(session({
  secret: process.env.SESSION_SECRET || 'secret_key',
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 1000 * 60 * 60 * 24 }, // 1 hari
}));

// Routes autentikasi
app.use('/auth', require('./src/routes/auth'));

// Route dashboard (butuh login)
const { isAuthenticated } = require('./src/middleware/auth');
app.get('/dashboard', isAuthenticated, (req, res) => {
  res.render('auth/dashboard', { user: req.session.user });
});

// API: ambil data user dari session (untuk dashboard)
app.get('/auth/me', isAuthenticated, (req, res) => {
  res.json(req.session.user);
});

// Redirect root ke dashboard atau login
app.get('/', (req, res) => {
  if (req.session.user) return res.redirect('/dashboard');
  res.redirect('/auth/login');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server berjalan di http://localhost:${PORT}`);
});
