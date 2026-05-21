# 🏢 FTI HC — Sistem Kepegawaian

> Tugas Besar Pemrograman Web — Kelompok B7
> Sistem Informasi, FTI Universitas Andalas

## 📋 Deskripsi

Aplikasi web untuk mengelola **Data Kepegawaian** di lingkungan FTI HC (Human Capital). Sistem ini mencakup fitur autentikasi, otorisasi berbasis role & permission (ACL), serta antarmuka yang terstruktur menggunakan Basecoat UI.

## 🛠️ Tech Stack

| Teknologi | Keterangan |
|-----------|------------|
| **Express.js** | Backend framework (Node.js) |
| **MySQL** | Database (mysql2, tanpa ORM) |
| **EJS** | Template engine (server-side rendering) |
| **Basecoat UI** | CSS framework (CDN) |
| **bcryptjs** | Hash password |
| **express-session** | Session management |

## 👥 Anggota Kelompok

| No | NIM | Nama | GitHub |
|----|-----|------|--------|
| 1 | 2411523026 | Larisa Alifia Handini | [@larisaalifiaa](https://github.com/larisaalifiaa) |

## 📁 Struktur Project

```
├── app.js                        ← Entry point & Express setup
├── database.sql                  ← Struktur & data awal database
├── package.json
├── public/
│   └── css/
│       └── style.css             ← Custom styling
└── src/
    ├── config/
    │   └── database.js           ← Koneksi MySQL
    ├── controllers/
    │   └── authController.js     ← Logic autentikasi
    ├── middleware/
    │   ├── auth.js               ← Middleware autentikasi
    │   └── acl.js                ← Middleware ACL (role & permission)
    ├── routes/
    │   └── auth.js               ← Route login & logout
    └── views/
        └── auth/
            ├── login.ejs         ← Halaman login
            └── dashboard.ejs     ← Halaman dashboard
```

## 🚀 Cara Menjalankan

### 1. Clone & Install
```bash
git clone https://github.com/larisaalifiaa/Tugas-Besar-Pemrograman-Web-B7.git
cd Tugas-Besar-Pemrograman-Web-B7
npm install
```

### 2. Setup Environment
Buat file `.env` di root project (sesuaikan dengan konfigurasi lokal):
```env
PORT=3000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_db_password
DB_NAME=your_db_name
SESSION_SECRET=your_secret_key
```

### 3. Setup Database
```bash
mysql -u root -p < database.sql
```

### 4. Jalankan Server
```bash
npm run dev     # development (auto-reload dengan nodemon)
npm start       # production
```

### 5. Buka Browser
```
http://localhost:3000
```

## 🔐 Akun Default

| Email | Password |
|-------|----------|
| `larisa@fti.ac.id` | `password123` |

## 📊 Database (ERD)

Sesuai ERD yang disediakan dosen:
- [Auth & Authorization ERD](https://drawsql.app/teams/husnilk/diagrams/project-authentication-authorization)

## 📝 Lisensi

Project ini dibuat untuk keperluan akademik mata kuliah Pemrograman Web, FTI Universitas Andalas.
