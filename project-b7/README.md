# FTI HC - Modul Profile (B7)

Modul **Profile** dari aplikasi FTI Human Capital (HC). Dibangun menggunakan ExpressJS, MySQL2, dan Basecoat UI.

## Fitur (B7)
- Pegawai dapat melihat portofolio/profile pribadi
- Pegawai dapat mengupdate profile (nama & email)
- Pegawai dapat mengubah password pribadi
- Autentikasi (Login/Logout)
- ACL berbasis role & permission

## Teknologi
- **Backend**: ExpressJS (Node.js)
- **Database**: MySQL / MariaDB (mysql2 native)
- **Frontend**: Basecoat UI
- **Auth**: express-session + bcryptjs

## Cara Instalasi

```bash
# 1. Clone repository
git clone <url-repo>
cd project-b7

# 2. Install dependencies
npm install

# 3. Setup environment
cp .env.example .env
# Edit .env sesuai konfigurasi database

# 4. Import database
mysql -u root -p nama_database < database.sql

# 5. Jalankan aplikasi
npm run dev
```

## Struktur Project

```
project/
├── src/
│   ├── config/database.js      # Koneksi database
│   ├── middleware/
│   │   ├── auth.js             # Middleware autentikasi
│   │   └── acl.js              # Middleware ACL (role & permission)
│   ├── routes/
│   │   ├── auth.js             # Route login/logout
│   │   └── profile.js          # Route profile
│   ├── controllers/
│   │   ├── authController.js   # Logic autentikasi
│   │   └── profileController.js # Logic profile (B7)
│   └── views/
│       ├── auth/login.html
│       └── profile/index.html
├── app.js                      # Entry point
├── database.sql                # Elaborasi database
└── .env                        # Konfigurasi
```

## API Endpoints

| Method | Endpoint | Keterangan |
|--------|----------|------------|
| GET | /auth/login | Halaman login |
| POST | /auth/login | Proses login |
| POST | /auth/logout | Logout |
| GET | /profile | Halaman profile |
| GET | /api/profile | Ambil data profile (JSON) |
| PUT | /api/profile | Update nama & email |
| PUT | /api/profile/password | Ganti password |

## Pembagian Tugas

| NIM | Nama | Kontribusi |
|-----|------|------------|
| 2411523026 | Larisa Alifia Handini | Modul Profile B7 (auth, ACL, middleware, profile CRUD) |
