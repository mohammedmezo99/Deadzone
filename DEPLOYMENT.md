# 🚀 Deployment Guide - ProjectMove Website

This document provides a **complete, step-by-step walkthrough** for deploying the ProjectMove website. Follow these instructions carefully to ensure a successful launch.

---

## 📋 Prerequisites

Before deployment, ensure you have:
- ✅ GitHub account with repository access
- ✅ Vercel account (free tier works)
- ✅ Neon Database account (free tier works)
- ✅ All code committed and pushed to GitHub

---

## 🗄️ Part 1: Database Setup (Neon.tech)

**Goal**: Get your PostgreSQL database running and ready for data.

### Step 1: Create Your Neon Project

1. Go to [console.neon.tech](https://console.neon.tech)
2. Click **"New Project"**
3. Configure project:
   - **Project Name:** `projectmove` (or your choice)
   - **Region:** Choose closest to your users (e.g., `US East`, `EU Central`, `Asia Pacific`)
   - **Postgres Version:** Latest (recommended)
4. Click **"Create Project"**

### Step 2: Get Database Connection String

1. In your Neon dashboard, go to **Connection Details**
2. Copy the **Connection string**
   - Format: `postgresql://username:password@host/database?sslmode=require`
   - Example: `postgresql://user:pass@ep-cool-name-123456.us-east-2.aws.neon.tech/neondb?sslmode=require`
3. **Save this connection string** - you'll need it for Vercel

### Step 3: Initialize Database Schema

#### Option A: Using Neon SQL Editor (Recommended)

1. In Neon dashboard, go to **SQL Editor**
2. Copy contents of `schema.sql` from your project
3. Paste into SQL Editor
4. Click **"Run"**
5. Verify tables are created in **Tables** tab

#### Option B: Using Prisma

```bash
# Set database URL in .env
DATABASE_URL="your-neon-connection-string"

# Push schema to database
npx prisma db push

# Generate Prisma Client
npx prisma generate
```

### Step 4: Verify Database Tables

Check that all tables exist:
- ✅ Device
- ✅ Rom
- ✅ Download (with analytics fields: ipAddress, userAgent, country, city)
- ✅ TeamMember
- ✅ SiteConfig
- ✅ Faq
- ✅ ContactForm
- ✅ Screenshot
- ✅ SocialLink

---

## ☁️ Part 2: Vercel Deployment

### Step 1: Import Project to Vercel

1. Go to [vercel.com/new](https://vercel.com/new)
2. Click **"Import Git Repository"**
3. Select your GitHub repository: `sleep-bugy/ProjectMove-website`
4. Click **"Import"**

### Step 2: Configure Project Settings

**Framework Preset:** Next.js (auto-detected)

**Root Directory:** `./` (leave default)

**Build Command:** 
```bash
npm run build
```

**Output Directory:** 
```
.next
```

**Install Command:**
```bash
npm install
```

### Step 3: Set Environment Variables

Click **"Environment Variables"** and add the following:

#### Required Variables:

| Variable Name | Value | Description |
|--------------|-------|-------------|
| `DATABASE_URL` | `your-neon-connection-string` | Neon database URL |
| `NEXT_PUBLIC_APP_URL` | `https://your-domain.vercel.app` | Your Vercel URL (fill after first deploy) |

#### Optional (if using Supabase for storage):

| Variable Name | Value | Description |
|--------------|-------|-------------|
| `NEXT_PUBLIC_SUPABASE_URL` | `your-supabase-url` | Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | `your-anon-key` | Supabase anon key |
| `SUPABASE_SERVICE_ROLE_KEY` | `your-service-role-key` | Supabase service key |

> **Note:** All environment variables are available in all environments (Production, Preview, Development) by default.

### Step 4: Deploy!

1. Click **"Deploy"**
2. Wait for build to complete (~2-3 minutes)
3. Once deployed, you'll get a URL like: `https://deadzone-web-website.vercel.app`

---

## 🔧 Part 3: Post-Deployment Setup

### Step 1: Update Environment Variables

1. Go to your Vercel project settings
2. Navigate to **Settings → Environment Variables**
3. Update `NEXT_PUBLIC_APP_URL` with your actual Vercel URL
4. Click **"Save"**
5. Redeploy to apply changes:
   - Go to **Deployments**
   - Click **"..."** on latest deployment
   - Click **"Redeploy"**

### Step 2: Generate Prisma Client (Important!)

Vercel automatically runs `npx prisma generate` during build, but verify:

1. Check build logs for:
   ```
   ✔ Generated Prisma Client
   ```
2. If missing, add to `package.json`:
   ```json
   {
     "scripts": {
       "postinstall": "prisma generate"
     }
   }
   ```

### Step 3: Test Admin Access

1. Visit: `https://your-domain.vercel.app/admin/login`
2. Use hardcoded credentials (change in production!):
   - **Email:** `admin@projectmove.com`
   - **Password:** `admin123`
3. Verify all admin pages work:
   - Dashboard ✅
   - Analytics ✅
   - Devices ✅
   - ROMs ✅
   - Team ✅
   - FAQ ✅
   - Contact ✅
   - Screenshots ✅
   - Social Links ✅

### Step 4: Add Initial Data

Via admin panel, add:
1. **Devices** - At least 1 device (e.g., Poco F5)
2. **ROMs** - At least 1 ROM for the device
3. **Team Members** - Add team profiles
4. **FAQs** - Add common questions
5. **Screenshots** - Upload gallery images
### Step 5: Seed Dynamic Stats (New!)

To initialize the homepage counters:
1. Go to **Admin → System Settings**.
2. Ensure you have at least one device added to start the **Devices** counter.
3. The **Active Users** counter starts automatically from a base seed (50,000+) and increments as people visit the site.
4. If you want to manually adjust the visitor count, you can update the `visitor_count` key in the `SiteConfig` table.

---

## 🌐 Part 4: Custom Domain (Optional)

### Step 1: Add Domain to Vercel

1. Go to **Settings → Domains**
2. Click **"Add"**
3. Enter your domain: `projectmove.com`
4. Click **"Add"**

### Step 2: Configure DNS

Add these records to your domain provider:

**For Root Domain:**
| Type | Name | Value |
|------|------|-------|
| A | @ | `76.76.21.21` |

**For www subdomain:**
| Type | Name | Value |
|------|------|-------|
| CNAME | www | `cname.vercel-dns.com` |

### Step 3: Wait for DNS Propagation

- Propagation can take 24-48 hours
- Check status at: [dnschecker.org](https://dnschecker.org)
- Vercel will auto-provision SSL certificate

---

## 🔒 Part 5: Security & Production Setup

### Change Admin Credentials

**⚠️ CRITICAL:** Change hardcoded admin credentials before production!

1. Update `src/app/admin/login/page.tsx`:
   ```typescript
   // Replace with environment variables or database
   const ADMIN_EMAIL = process.env.ADMIN_EMAIL;
   const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;
   ```

2. Add to Vercel environment variables:
   - `ADMIN_EMAIL`
   - `ADMIN_PASSWORD` (use bcrypt hash)

### Enable Analytics Tracking

Analytics are enabled by default. Features:
- ✅ IP tracking with geolocation
- ✅ User agent detection
- ✅ Country/city tracking
- ✅ Download trends

**Privacy Note:** Update Privacy Policy to mention analytics tracking.

### Rate Limiting (Recommended)

Add rate limiting for:
- Contact form submissions
- Download tracking
- Admin login attempts

Use Vercel Edge Config or Upstash Redis.

---

## 📊 Part 6: Monitoring & Maintenance

### Vercel Analytics

Enable in project settings:
1. Go to **Settings → Analytics**
2. Enable **Web Analytics**
3. View metrics in **Analytics** tab

### Database Monitoring

Neon provides:
- **Usage Dashboard** - CPU, Storage, Connections
- **Query Stats** - Slow queries
- **Branching** - Database snapshots

### Backup Strategy

**Neon Automated Backups:**
- Point-in-time recovery (7 days on free tier)
- Manual snapshots via **Branches**

**Export Database:**
```bash
# Local backup
pg_dump $DATABASE_URL > backup.sql

# Restore
psql $DATABASE_URL < backup.sql
```

---

## 🚨 Troubleshooting

### Build Fails

**Error:** `Prisma Client is not generated`

**Solution:**
```json
// package.json
{
  "scripts": {
    "postinstall": "prisma generate"
  }
}
```

### Database Connection Issues

**Error:** `Can't reach database server`

**Solutions:**
1. Verify `DATABASE_URL` in Vercel env vars
2. Check Neon project is active
3. Ensure `?sslmode=require` in connection string
4. Test connection locally:
   ```bash
   npx prisma db pull
   ```

### 404 on Dynamic Routes

**Error:** Admin pages return 404

**Solution:**
- Ensure all pages use Next.js App Router structure
- Check file paths: `src/app/admin/analytics/page.tsx`
- Redeploy after file structure changes

### Analytics Not Working

**Error:** No download data in analytics dashboard

**Solutions:**
1. Verify database has `Download` table with new fields:
   - `ipAddress`
   - `userAgent`
   - `country`
   - `city`
   - `deviceId`
2. Check API routes are accessible:
   - `/api/admin/analytics/overview`
   - `/api/admin/analytics/downloads`
   - `/api/admin/analytics/devices`
   - `/api/admin/analytics/geographic`
3. Test download tracking:
   - Click download button
   - Check database for new record
   - Verify geolocation API (ip-api.com) is reachable

### Slow Performance

**Solutions:**
1. Enable Vercel caching
2. Optimize images with `next/image`
3. Add database indexes (already included in schema)
4. Use Neon connection pooling

---

## 📦 Part 7: Updating Deployment

### Deploy New Changes

**Automatic (Recommended):**
1. Push to GitHub `main` branch
2. Vercel auto-deploys

**Manual:**
1. Go to Vercel dashboard
2. Click **"Redeploy"**

### Database Schema Updates

When updating Prisma schema:

```bash
# 1. Update schema.prisma locally
# 2. Generate migration
npx prisma migrate dev --name add_new_field

# 3. Push to production
npx prisma db push

# 4. Commit and push to GitHub
git add .
git commit -m "feat: add new database field"
git push
```

Vercel will auto-deploy with new schema.

---

## ✅ Deployment Checklist

Use this checklist for each deployment:

- [ ] Code committed and pushed to GitHub
- [ ] Neon database created and schema applied
- [ ] Vercel project imported from GitHub
- [ ] Environment variables configured
- [ ] First deployment successful
- [ ] `NEXT_PUBLIC_APP_URL` updated and redeployed
- [ ] Admin login tested
- [ ] Sample data added (devices, ROMs, team, etc.)
- [ ] All public pages accessible
- [ ] All admin pages functional
- [ ] Analytics dashboard working
- [ ] Custom domain configured (if applicable)
- [ ] SSL certificate active
- [ ] Admin credentials changed for production
- [ ] Privacy policy updated
- [ ] Monitoring enabled

---

## 📞 Support Resources

- **Vercel Docs:** [vercel.com/docs](https://vercel.com/docs)
- **Neon Docs:** [neon.tech/docs](https://neon.tech/docs)
- **Next.js Docs:** [nextjs.org/docs](https://nextjs.org/docs)
- **Prisma Docs:** [prisma.io/docs](https://prisma.io/docs)

---

## 🎉 Deployment Complete!

Your ProjectMove website is now live! 🚀

**Production URL:** `https://your-domain.vercel.app`

**Next Steps:**
1. Share URL with team
2. Monitor analytics dashboard
3. Add more content via admin panel
4. Configure custom domain
5. Set up continuous monitoring

---

**Credits:** Built with ❤️ by [Mohammad Adi](https://github.com/sleep-bugy) and the DeadZone Team
