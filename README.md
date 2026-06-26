# DeadZone ROM Website

Official website foundation for DeadZone ROM, built with Next.js, TypeScript, Tailwind CSS, Prisma, and PostgreSQL.

This repository keeps the imported site architecture intact while aligning the public website and admin data model around DeadZone ROM releases.

## ROM Flavors

- DeadZone Base
- DeadZone Gaming
- DeadZone EPiC
- DeadZone Legend

## Platform Support

DeadZone targets Android devices across both Snapdragon and MTK platforms. Device records, ROM metadata, changelogs, screenshots, and download links are managed through the admin dashboard.

## Downloads

The website supports release downloads through:

- PixelDrain links
- GitHub Release or GitHub Actions build links
- Direct ROM download URLs
- SHA-256 checksum metadata for release verification

## Admin Dashboard

The existing dashboard remains part of the foundation and is intended to manage:

- Supported devices
- ROM links and release metadata
- Changelogs
- Screenshots
- Download tracking
- Team members
- FAQs
- Contact submissions
- Social links
- Site configuration

## Tech Stack

- Next.js App Router
- TypeScript
- Tailwind CSS
- Prisma
- PostgreSQL

## Local Development

Install dependencies:

```bash
npm install
```

Generate the Prisma client:

```bash
npx prisma generate
```

Start the development server:

```bash
npm run dev
```

Build for production:

```bash
npm run build
```

## Environment

Create a local `.env` file with a PostgreSQL connection string when database access is required:

```env
DATABASE_URL="postgresql://user:password@localhost:5432/deadzone"
```

Do not commit secrets or production database credentials.
