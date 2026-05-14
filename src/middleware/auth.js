// Middleware: cek apakah user sudah login
function isAuthenticated(req, res, next) {
  if (req.session && req.session.user) {
    return next();
  }
  return res.redirect('/auth/login');
}

// Middleware: redirect ke dashboard kalau sudah login
function isGuest(req, res, next) {
  if (req.session && req.session.user) {
    return res.redirect('/dashboard');
  }
  return next();
}

module.exports = { isAuthenticated, isGuest };
