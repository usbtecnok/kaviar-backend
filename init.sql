-- ===============================================
-- SCRIPT DE INICIALIZAÇÃO DO BANCO - PROJETO KAVIAR
-- ===============================================

CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  role VARCHAR(20) CHECK (role IN ('passenger', 'driver')) NOT NULL,
  phone VARCHAR(20),
  doc_number VARCHAR(50),
  vehicle_model VARCHAR(100),
  is_approved BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT NOW()
);
