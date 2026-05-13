-- =============================================
-- Elaborasi Struktur Database - B7 Profile
-- FTI HC - Sistem Kepegawaian
-- =============================================

-- Tabel users sudah ada dari ERD dosen
-- Berikut adalah query untuk kebutuhan modul B7 Profile

-- 1. Seed data roles (jika belum ada)
INSERT IGNORE INTO roles (name, guard_name, created_at, updated_at) VALUES
('pegawai', 'web', NOW(), NOW()),
('hr_admin', 'web', NOW(), NOW()),
('system_admin', 'web', NOW(), NOW());

-- 2. Seed data permissions untuk modul profile
INSERT IGNORE INTO permissions (name, guard_name, created_at, updated_at) VALUES
('view_profile', 'web', NOW(), NOW()),
('update_profile', 'web', NOW(), NOW()),
('change_password', 'web', NOW(), NOW());

-- 3. Assign permissions ke role pegawai
INSERT IGNORE INTO role_has_permissions (permission_id, role_id)
SELECT p.id, r.id
FROM permissions p, roles r
WHERE p.name IN ('view_profile', 'update_profile', 'change_password')
  AND r.name = 'pegawai';

-- 4. Seed user contoh untuk testing (password: password123)
-- bcrypt hash dari 'password123'
INSERT IGNORE INTO users (name, email, password, created_at, updated_at) VALUES
('Larisa Alifia Handini', 'larisa@fti.ac.id', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', NOW(), NOW());

-- 5. Assign role pegawai ke user test
INSERT IGNORE INTO model_has_roles (role_id, model_type, model_id)
SELECT r.id, 'App\\Models\\User', u.id
FROM roles r, users u
WHERE r.name = 'pegawai' AND u.email = 'larisa@fti.ac.id';

-- =============================================
-- Query yang dipakai di modul B7 (referensi)
-- =============================================

-- Ambil profile dengan roles
SELECT u.id, u.name, u.email, u.created_at,
       GROUP_CONCAT(r.name) as roles
FROM users u
LEFT JOIN model_has_roles mhr ON u.id = mhr.model_id AND mhr.model_type = 'App\\Models\\User'
LEFT JOIN roles r ON mhr.role_id = r.id
WHERE u.id = 1
GROUP BY u.id;

-- Cek permission user
SELECT p.name FROM permissions p
JOIN role_has_permissions rhp ON p.id = rhp.permission_id
JOIN model_has_roles mhr ON rhp.role_id = mhr.role_id
WHERE mhr.model_id = 1 AND mhr.model_type = 'App\\Models\\User';
