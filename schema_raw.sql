-- DeadZone Database Schema (Raw - No Sample Data)
-- PostgreSQL Schema for DeadZone Website

-- Device Table
CREATE TABLE IF NOT EXISTS "Device" (
    "id" TEXT PRIMARY KEY,
    "codename" TEXT UNIQUE NOT NULL,
    "name" TEXT NOT NULL,
    "brand" TEXT NOT NULL,
    "imageUrl" TEXT,
    "specs" TEXT,
    "isActive" BOOLEAN DEFAULT TRUE,
    "createdAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ROM Table
CREATE TABLE IF NOT EXISTS "Rom" (
    "id" TEXT PRIMARY KEY,
    "name" TEXT NOT NULL,
    "version" TEXT NOT NULL,
    "androidVersion" TEXT,
    "buildDate" TIMESTAMP,
    "downloadUrl" TEXT,
    "changelog" TEXT,
    "fileSize" TEXT,
    "isArchived" BOOLEAN DEFAULT FALSE,
    "deviceId" TEXT REFERENCES "Device"("id") ON DELETE CASCADE,
    "createdAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Download Tracking Table (with Analytics)
CREATE TABLE IF NOT EXISTS "Download" (
    "id" TEXT PRIMARY KEY,
    "romId" TEXT REFERENCES "Rom"("id") ON DELETE CASCADE,
    "deviceId" TEXT REFERENCES "Device"("id") ON DELETE SET NULL,
    "ipAddress" TEXT,
    "userAgent" TEXT,
    "country" TEXT,
    "city" TEXT,
    "downloadedAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Team Member Table
CREATE TABLE IF NOT EXISTS "TeamMember" (
    "id" TEXT PRIMARY KEY,
    "name" TEXT NOT NULL,
    "role" TEXT NOT NULL,
    "bio" TEXT,
    "avatarUrl" TEXT,
    "githubUrl" TEXT,
    "telegramUrl" TEXT,
    "twitterUrl" TEXT,
    "websiteUrl" TEXT,
    "country" TEXT,
    "isFounder" BOOLEAN DEFAULT FALSE,
    "order" INTEGER DEFAULT 0,
    "createdAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Site Configuration Table
CREATE TABLE IF NOT EXISTS "SiteConfig" (
    "id" TEXT PRIMARY KEY,
    "key" TEXT UNIQUE NOT NULL,
    "value" TEXT NOT NULL,
    "description" TEXT,
    "updatedAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- FAQ Table
CREATE TABLE IF NOT EXISTS "Faq" (
    "id" TEXT PRIMARY KEY,
    "question" TEXT NOT NULL,
    "answer" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "order" INTEGER DEFAULT 0,
    "createdAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Contact Form Submissions Table
CREATE TABLE IF NOT EXISTS "ContactForm" (
    "id" TEXT PRIMARY KEY,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "subject" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "status" TEXT DEFAULT 'new',
    "createdAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Screenshots Gallery Table
CREATE TABLE IF NOT EXISTS "Screenshot" (
    "id" TEXT PRIMARY KEY,
    "title" TEXT NOT NULL,
    "imageUrl" TEXT NOT NULL,
    "description" TEXT,
    "category" TEXT,
    "order" INTEGER DEFAULT 0,
    "createdAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Social Media Links Table
CREATE TABLE IF NOT EXISTS "SocialLink" (
    "id" TEXT PRIMARY KEY,
    "platform" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "isActive" BOOLEAN DEFAULT TRUE,
    "createdAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Indexes for better query performance
-- Run these AFTER creating and populating the tables

-- Device indexes
CREATE INDEX IF NOT EXISTS "idx_device_codename" ON "Device"("codename");
CREATE INDEX IF NOT EXISTS "idx_device_active" ON "Device"("isActive");

-- Rom indexes
CREATE INDEX IF NOT EXISTS "idx_rom_device" ON "Rom"("deviceId");
CREATE INDEX IF NOT EXISTS "idx_rom_archived" ON "Rom"("isArchived");

-- Download indexes
CREATE INDEX IF NOT EXISTS "idx_download_rom" ON "Download"("romId");
CREATE INDEX IF NOT EXISTS "idx_download_device" ON "Download"("deviceId");

-- FAQ indexes
CREATE INDEX IF NOT EXISTS "idx_faq_category" ON "Faq"("category");

-- ContactForm indexes
CREATE INDEX IF NOT EXISTS "idx_contact_status" ON "ContactForm"("status");
CREATE INDEX IF NOT EXISTS "idx_contact_type" ON "ContactForm"("type");

-- Screenshot indexes
CREATE INDEX IF NOT EXISTS "idx_screenshot_category" ON "Screenshot"("category");

-- SocialLink indexes
CREATE INDEX IF NOT EXISTS "idx_social_active" ON "SocialLink"("isActive");
