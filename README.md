# DeadZone Website

Public-facing DeadZone website built with Next.js, TypeScript, and Tailwind CSS.

DeadZone is a premium HyperOS ROM project by Mohammed MEZO.

## Public direction

- Marketing
- Downloads
- Supported Devices
- Styles
- Premium Membership
- Community links
- Contact MEZO

## Styles

- DeadZone Lite
- GamingPlus
- Legend
- Ninja

DeadZone Lite is the public build line.

Premium Membership unlocks:

- GamingPlus
- Legend
- Ninja

## Build requests

Fastest and cleanest build process:

`/mezo <OTA_ROM_LINK>`

Use a valid Recovery OTA ROM `.zip` link.

Existing builds command:

`/mezo <codename>`

Example:

`/mezo zircon`

## Official links

- Contact MEZO: https://t.me/MohamedMezo1
- Discussion Group: https://t.me/DeadZoneDiscussion
- Official Updates: https://t.me/xDeadZone
- Screenshots Cloud: https://t.me/DeadZoneCloud
- Supported Devices: https://t.me/DeadZoneDiscussion/2851
- Group Rules: https://t.me/DeadZoneDiscussion/2849

## Local development

```bash
npm install
npm run dev
```

## Production build

```bash
npm run build
```

## Deployment note

Set `DEADZONE_WORKER_API_BASE` in Vercel Environment Variables.

No backend storage is required for the public website.
