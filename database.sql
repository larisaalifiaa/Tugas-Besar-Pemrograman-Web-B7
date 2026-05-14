-- =============================================
-- Database: fti_hc
-- Sesuai ERD dosen - Project Pemrograman Web
-- =============================================

CREATE DATABASE IF NOT EXISTS fti_hc;
USE fti_hc;

-- Tabel users
CREATE TABLE IF NOT EXISTS users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  password VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  email_verified_at DATETIME DEFAULT NULL,
  remember_token VARCHAR(255) DEFAULT NULL,
  two_factor_secret TEXT DEFAULT NULL,
  two_factor_recovery_codes TEXT DEFAULT NULL,
  two_factor_confirmed_at DATETIME DEFAULT NULL,
  updated_at DATETIME DEFAULT NULL,
  created_at DATETIME DEFAULT NULL
);

-- Tabel roles
CREATE TABLE IF NOT EXISTS roles (
  id BIGINT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  guard_name VARCHAR(255) NOT NULL,
  created_at DATETIME DEFAULT NULL,
  updated_at DATETIME DEFAULT NULL
);

-- Tabel permissions
CREATE TABLE IF NOT EXISTS permissions (
  id BIGINT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  guard_name VARCHAR(255) NOT NULL,
  created_at DATETIME DEFAULT NULL,
  updated_at DATETIME DEFAULT NULL
);

-- Tabel role_has_permissions
CREATE TABLE IF NOT EXISTS role_has_permissions (
  permission_id BIGINT NOT NULL,
  role_id BIGINT NOT NULL,
  PRIMARY KEY (permission_id, role_id),
  FOREIGN KEY (permission_id) REFERENCES permissions(id) ON DELETE CASCADE,
  FOREIGN KEY (role_id) REFERENCES roles(id) ON DELETE CASCADE
);

-- Tabel model_has_roles
CREATE TABLE IF NOT EXISTS model_has_roles (
  role_id BIGINT NOT NULL,
  model_type VARCHAR(255) NOT NULL,
  model_id INT NOT NULL,
  PRIMARY KEY (role_id, model_id, model_type),
  FOREIGN KEY (role_id) REFERENCES roles(id) ON DELETE CASCADE
);

-- Tabel model_has_permissions
CREATE TABLE IF NOT EXISTS model_has_permissions (
  permission_id BIGINT NOT NULL,
  model_type VARCHAR(255) NOT NULL,
  model_id INT NOT NULL,
  PRIMARY KEY (permission_id, model_id, model_type),
  FOREIGN KEY (permission_id) REFERENCES permissions(id) ON DELETE CASCADE
);

-- =============================================
-- Data awal
-- =============================================

-- Roles
INSERT INTO roles (name, guard_name, created_at, updated_at) VALUES
('pegawai', 'web', NOW(), NOW());

-- Permissions
INSERT INTO permissions (name, guard_name, created_at, updated_at) VALUES
('view_profile', 'web', NOW(), NOW()),
('update_profile', 'web', NOW(), NOW()),
('change_password', 'web', NOW(), NOW());

-- Assign semua permission ke role pegawai
INSERT INTO role_has_permissions (permission_id, role_id)
SELECT p.id, r.id FROM permissions p, roles r WHERE r.name = 'pegawai';

-- User contoh (password: password123)
INSERT INTO users (name, email, password, created_at, updated_at) VALUES
('Larisa Alifia Handini', 'larisa@fti.ac.id', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', NOW(), NOW());

-- Assign role pegawai ke user
INSERT INTO model_has_roles (role_id, model_type, model_id)
SELECT r.id, 'App\\Models\\User', u.id
FROM roles r, users u
WHERE r.name = 'pegawai' AND u.email = 'larisa@fti.ac.id';
