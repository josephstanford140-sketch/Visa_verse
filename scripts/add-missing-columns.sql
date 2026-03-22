-- Migration to add missing columns to the doctors table
-- Run this on your Railway PostgreSQL database

-- Add city column if it doesn't exist
ALTER TABLE doctors ADD COLUMN IF NOT EXISTS city TEXT DEFAULT '';

-- Add any other potentially missing columns
ALTER TABLE doctors ADD COLUMN IF NOT EXISTS degree TEXT DEFAULT '';
ALTER TABLE doctors ADD COLUMN IF NOT EXISTS dob TEXT DEFAULT '';
ALTER TABLE doctors ADD COLUMN IF NOT EXISTS clinic TEXT DEFAULT '';
ALTER TABLE doctors ADD COLUMN IF NOT EXISTS phone TEXT DEFAULT '';
ALTER TABLE doctors ADD COLUMN IF NOT EXISTS address TEXT DEFAULT '';
ALTER TABLE doctors ADD COLUMN IF NOT EXISTS specialty TEXT DEFAULT '';
ALTER TABLE doctors ADD COLUMN IF NOT EXISTS notes TEXT DEFAULT '';
ALTER TABLE doctors ADD COLUMN IF NOT EXISTS medical_store TEXT DEFAULT '';
ALTER TABLE doctors ADD COLUMN IF NOT EXISTS prescribed_products TEXT[] DEFAULT '{}';
