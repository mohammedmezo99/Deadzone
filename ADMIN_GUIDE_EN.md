# ProjectMove Admin Dashboard Guide

Welcome to the ProjectMove Admin Dashboard. This comprehensive guide covers every aspect of managing your platform, from real-time analytics to changing your core credentials.

## 🚀 Control Center Overview
The Admin Dashboard is the nerve center of the ProjectMove website. It allows you to synchronize database content with the frontend in real-time using `force-dynamic` rendering.

---

## 🔑 How to Change Email/Password
Your admin credentials are hardcoded for maximum speed and initial setup. To change them:

1. **Locate the File**: Open `src/app/api/admin/login/route.ts` in your editor.
2. **Find the Constants**: Around lines 8-9, you will see:
   ```typescript
   const ADMIN_EMAIL = "mohamedmezo@projectmove.co";
   const ADMIN_PASSWORD = "Mohamed0931#";
   ```
3. **Modify**: Replace these strings with your preferred email and a secure password.
4. **Deploy**: Save the file. If you are using Vercel or a similar CI/CD, pushing this change will update your login credentials immediately.

---

## 🖼️ How to Upload Images (Logo, Screenshots, etc.)
The dashboard requires **direct image URLs**. We recommend using **[Catbox.moe](https://catbox.moe/)** because it is fast, free, and provides permanent direct links.

1. **Visit Catbox**: Go to [https://catbox.moe/](https://catbox.moe/).
2. **Upload**: Select your image file and click "Upload".
3. **Copy Link**: Once uploaded, you will get a link. **Right-click the link and select "Copy Link Address"** (make sure the link ends in `.jpg`, `.png`, or `.svg`).
4. **Paste in Dashboard**: Paste this URL into the "Node Image", "Member Photo", or "Screenshot URL" fields in the Admin Dashboard.

---

## 📥 ROM Download Links
The dashboard accepts any valid URL for ROM downloads. You can use popular hosting services such as:

- **Google Drive**: Ensure the file is set to "Anyone with the link can view". 
- **GoFile**: A fast, temporary/permanent hosting solution.
- **Mega.nz / Mediafire**: Standard hosting platforms.
- **SourceForge / AndroidFileHost**: Specialized hosting for Android ROMs.

**Tip**: Make sure the link is "Direct" if possible, or at least leads directly to the file's landing page so users don't get lost.

---

## 🛠 Detailed Page Guides

### 1. Control Center (Main Dashboard)
- **Dynamic Stats**: Displays real-time counts for Devices, ROMs, Downloads, and Team Members.
- **Protocol Analytics**: A visual overview of the platform's trajectory.
- **Pulse Feed**: Shows the 5 most recent activities (Downloads, ROM publications, etc.).
- **Quick Access**: Buttons at the bottom for Hardware Registry, Cluster Release, and Personnel Hub.

### 2. Analytics Hub (`/admin/analytics`)
Deep dive into your user base behavior:
- **Download Trends**: Graphs showing daily/monthly download volume.
- **Geographical Distribution**: Lists the top 20 countries and detailed city-level data for the top country.
- **Technical Specs**: Identifies browsers and operating systems used by your audience.

### 3. Hardware Registry (Devices - `/admin/devices`)
Manage the ecosystem of supported hardware:
- **Register Node**: Click the "+" button to add a new device.
  - **Node Designation**: The marketing name (e.g., "Poco F5").
  - **Registry Codename**: The internal device codename (e.g., "marble").
  - **Manufacturer**: The brand (e.g., "Xiaomi").
  - **Architecture**: The chipset used (e.g., "Snapdragon 7+ Gen 2").
- **Modify/Delete**: Use the icons on each device card to update specs or remove a device.

### 4. ROM Repository (ROMs - `/admin/roms`)
Control the distribution of DeadZone builds:
- **Authorize Build**: Links a ROM file to a specific device registry.
  - **Target Hardware**: Select the device from the dropdown.
  - **Build Designation**: The version name (e.g., "DeadZone v2 Stable").
  - **Version Vector**: The specific version number (e.g., "2.0.1").
  - **Deployment Track**: Choose between "Official Stable", "Community", or "Experimental".
  - **Revision Changelog**: Use this area to detail what's new in this build.
- **VIP Only**: Toggle builds to be accessible only by authorized users if configured.

### 5. Personnel Hub (Team - `/admin/team`)
- **Add Contributor**: Create profiles with names, bio, and social links (GitHub, Telegram, Twitter).
- **Assign Roles**: Set roles like "Founder", "Developer", or "Maintainer".
- **Order Management**: Drag or set order numbers to control how members appear on the public page.

### 6. Interaction Log (Contact Forms - `/admin/contact`)
- **Bug Reports**: Filter submissions specifically for bugs to prioritize development.
- **Feature Requests**: Review user suggestions for future DeadZone versions.
- **Audit Status**: Mark messages as "Read" or "Resolved" to track progress.

### 7. Knowledge Base (FAQ - `/admin/faq`)
Manage the platform's support documentation:
- **Add FAQ Entry**: Use the "+" button to register a new inquiry.
- **Question Ingress**: The specific question being asked.
- **Knowledge Payload**: The detailed official response.
- **Sequence Index**: Set a number to control the order in which FAQs appear.

### 8. Visual Assets (Screenshots - `/admin/screenshots`)
Curate the high-fidelity gallery for DeadZone:
- **Register Snapshot**: Add a new capture to the visual records.
- **Asset Source URL**: Use a direct link (e.g., from Catbox) ending in `.jpg` or `.png`.
- **Category Sector**: Group screenshots by "System UI", "Performance", etc.

### 9. Community Outposts (Social Links - `/admin/social`)
Manage external communication nodes:
- **Deploy Outpost**: Connect a new social handle.
- **Platform Vector**: Select from GitHub, Telegram, Twitter/X, or Discord.
- **Active State**: Toggle whether the link is visible on the public footer.

### 10. System Core (Settings - `/admin/settings`)
Configure global mainframe variables:
- **Hero Alert**: Update the "Broadcast Signal" text shown on the homepage alert bar.
- **Cluster Health**: Monitor real-time status of Data Clusters, Compute Nodes, and Security Layers.

### 11. Identity Control (Users - `/admin/users`)
Overview of core developers and access levels:
- **Team Roster**: View profiles and roles of core infrastructure developers.
- **RBAC Active**: Monitor Role-Based Access Control status and clearance levels.
- **Provisioning**: (Admin Only) Manage specialized invitation tokens for new developers.

---

## ⚙️ Technical Principles
- **Authentication**: Managed via `admin_session` cookies. If the cookie is missing or invalid, Next.js Middleware redirects you to `/login`.
- **API Communication**: Uses RESTful endpoints located at `/api/admin/*`.
- **Real-time Sync**: Uses Prisma ORM with PostgreSQL. All updates are reflected on the public site instantly.
