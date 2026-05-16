# FTI HC - Web Project

Aplikasi sistem kepegawaian FTI Human Capital berbasis ExpressJS.

## Teknologi
- **Backend**: ExpressJS (Node.js)
- **Database**: MySQL (mysql2 native, tanpa ORM)
- **Frontend**: Basecoat UI
- **Auth**: express-session + bcryptjs

## Cara Menjalankan

```bash
# 1. Install dependencies
npm install

# 2. Import database
mysql -u root -p < database.sql

# 3. Sesuaikan konfigurasi di .env
# DB_HOST, DB_USER, DB_PASSWORD, DB_NAME

# 4. Jalankan server
npm run dev
```

## Akun Testing
| Email | Password |
|-------|----------|
| larisa@fti.ac.id | password123 |

## Struktur Project
```
├── app.js                        # Entry point
├── database.sql                  # Struktur & data awal database
├── src/
│   ├── config/database.js        # Koneksi MySQL
│   ├── middleware/
│   │   ├── auth.js               # Middleware autentikasi
│   │   └── acl.js                # Middleware ACL (role & permission)
│   ├── routes/
│   │   └── auth.js               # Route login & logout
│   ├── controllers/
│   │   └── authController.js     # Logic autentikasi
│   └── views/auth/
│       ├── login.ejs             # Halaman login
│       └── dashboard.ejs         # Halaman dashboard
```
