-- DeadZone Management System Schema

-- Devices Management
CREATE TABLE IF NOT EXISTS "Device" (
    "id" TEXT PRIMARY KEY,
    "name" TEXT NOT NULL,
    "codename" TEXT NOT NULL UNIQUE,
    "brand" TEXT NOT NULL,
    "chipset" TEXT NOT NULL,
    "status" TEXT DEFAULT 'ACTIVE',
    "image" TEXT,
    "description" TEXT,
    "createdAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ROM Management
CREATE TABLE IF NOT EXISTS "Rom" (
    "id" TEXT PRIMARY KEY,
    "deviceId" TEXT NOT NULL REFERENCES "Device"("id") ON DELETE CASCADE,
    "name" TEXT NOT NULL,
    "version" TEXT NOT NULL,
    "androidVersion" TEXT NOT NULL,
    "type" TEXT DEFAULT 'FREE', 
    "downloadUrl" TEXT NOT NULL,
    "fileSize" TEXT,
    "changelog" TEXT,
    "releaseDate" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    "installationGuide" TEXT,
    "status" TEXT DEFAULT 'ACTIVE',
    "isVipOnly" BOOLEAN DEFAULT FALSE,
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

-- Team Management
CREATE TABLE IF NOT EXISTS "TeamMember" (
    "id" TEXT PRIMARY KEY,
    "name" TEXT NOT NULL,
    "role" TEXT NOT NULL,
    "country" TEXT,
    "image" TEXT,
    "bio" TEXT,
    "github" TEXT,
    "telegram" TEXT,
    "twitter" TEXT,
    "website" TEXT,
    "order" INTEGER DEFAULT 0,
    "createdAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Initial Mock Data for Reference
INSERT INTO "Device" (id, name, codename, brand, chipset, description) 
VALUES ('1', 'Poco F5', 'marble', 'XIAOMI', 'Snapdragon 7+ Gen 2', 'The mid-range performance king.');

INSERT INTO "Rom" (id, deviceId, name, version, androidVersion, downloadUrl, fileSize)
VALUES ('1', '1', 'DeadZone v2.1', '2.1-STABLE', '14', 'https://download.projectmove.com/marble/DeadZone-2.1.zip', '2.4GB');

-- Buat tabel SiteConfig jika belum ada
CREATE TABLE IF NOT EXISTS "SiteConfig" (
    "key" TEXT NOT NULL,
    "value" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "SiteConfig_pkey" PRIMARY KEY ("key")
);

-- Masukkan teks alert untuk Hero Section
INSERT INTO "SiteConfig" ("key", "value") 
VALUES ('heroAlertText', 'DeadZone v2.0 Now Available'),
       ('visitor_count', '0')
ON CONFLICT ("key") DO UPDATE SET "value" = EXCLUDED."value", "updatedAt" = CURRENT_TIMESTAMP;

-- FAQ Management
CREATE TABLE IF NOT EXISTS "Faq" (
    "id" TEXT PRIMARY KEY,
    "question" TEXT NOT NULL,
    "answer" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "order" INTEGER DEFAULT 0,
    "createdAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Contact Form Submissions
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

-- Screenshots Gallery
CREATE TABLE IF NOT EXISTS "Screenshot" (
    "id" TEXT PRIMARY KEY,
    "title" TEXT NOT NULL,
    "imageUrl" TEXT NOT NULL,
    "description" TEXT,
    "category" TEXT,
    "order" INTEGER DEFAULT 0,
    "createdAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Social Media Links
CREATE TABLE IF NOT EXISTS "SocialLink" (
    "id" TEXT PRIMARY KEY,
    "platform" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "isActive" BOOLEAN DEFAULT TRUE,
    "createdAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Sample FAQ Data
INSERT INTO "Faq" (id, question, answer, category, "order") VALUES
('faq1', 'What is DeadZone?', 'DeadZone is a custom Android ROM built on AOSP, specifically optimized for MediaTek devices. It focuses on performance, battery life, and a clean user experience.', 'General', 0),
('faq2', 'Is DeadZone safe to install?', 'Yes, but installing any custom ROM carries inherent risks including potential device damage and warranty void. Always backup your data first and follow installation instructions carefully.', 'Safety', 1),
('faq3', 'Which devices are supported?', 'Currently, DeadZone supports select MediaTek devices. Check the Download page for the complete list of supported devices and their respective ROM versions.', 'Compatibility', 2),
('faq4', 'Will this void my warranty?', 'Yes, installing custom ROMs typically voids your manufacturer warranty. Proceed only if you understand and accept this risk.', 'Safety', 3),
('faq5', 'How do I install DeadZone?', 'Check our Installation Guide page for detailed step-by-step instructions. You will need an unlocked bootloader and a custom recovery like TWRP.', 'Installation', 4);

-- Sample Screenshot Data
INSERT INTO "Screenshot" (id, title, imageUrl, description, category, "order") VALUES
('ss1', 'Home Screen', 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800', 'Clean and minimal home screen design', 'UI', 0),
('ss2', 'Settings', 'https://images.unsplash.com/photo-1551650975-87deedd944c3?w=800', 'Comprehensive settings interface', 'UI', 1),
('ss3', 'Quick Settings', 'https://images.unsplash.com/photo-1556656793-08538906a9f8?w=800', 'Customizable quick settings panel', 'Features', 2);

-- Sample Social Links (Real DeadZone Community Links)
INSERT INTO "SocialLink" (id, platform, url, isActive) VALUES
('social1', 'github', 'https://github.com/sleep-bugy', TRUE),
('social2', 'telegram', 'https://t.me/xDeadZone', TRUE),
('social3', 'telegram', 'https://t.me/DeadZoneDiscussion', TRUE),
('social4', 'telegram', 'https://t.me/DeadZoneCloud', TRUE);

-- =====================================================
-- ANALYTICS & TRACKING SETUP
-- =====================================================

-- Create indexes for faster analytics queries
CREATE INDEX IF NOT EXISTS "Download_romId_idx" ON "Download"("romId");
CREATE INDEX IF NOT EXISTS "Download_deviceId_idx" ON "Download"("deviceId");
CREATE INDEX IF NOT EXISTS "Download_downloadedAt_idx" ON "Download"("downloadedAt");
CREATE INDEX IF NOT EXISTS "Download_country_idx" ON "Download"("country");

-- Optional: Create materialized view for daily stats (refresh daily for better performance)
CREATE MATERIALIZED VIEW IF NOT EXISTS daily_download_stats AS
SELECT 
    DATE("downloadedAt") as date,
    COUNT(*) as total_downloads,
    COUNT(DISTINCT "deviceId") as unique_devices,
    COUNT(DISTINCT "country") as unique_countries
FROM "Download"
GROUP BY DATE("downloadedAt")
ORDER BY date DESC;

-- To refresh the materialized view (run daily via cron):
-- REFRESH MATERIALIZED VIEW daily_download_stats;

-- =====================================================
-- USEFUL ANALYTICS QUERIES (Reference)
-- =====================================================
--
-- Quick reference queries for analytics dashboard:
--
-- Total Downloads:
-- SELECT COUNT(*) FROM "Download";
--
-- Downloads Today:
-- SELECT COUNT(*) FROM "Download" WHERE DATE("downloadedAt") = CURRENT_DATE;
--
-- Top Devices:
-- SELECT d."name", COUNT(dl."id") as downloads 
-- FROM "Download" dl JOIN "Device" d ON dl."deviceId" = d."id" 
-- GROUP BY d."id", d."name" ORDER BY downloads DESC LIMIT 10;
--
-- Geographic Distribution:
-- SELECT "country", COUNT(*) as downloads FROM "Download" 
-- WHERE "country" IS NOT NULL GROUP BY "country" ORDER BY downloads DESC;