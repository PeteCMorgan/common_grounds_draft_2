# Common Grounds — frontend-only MVP
Deploys cleanly on Vercel (Next.js 14). No backend. Uses localStorage to simulate groups & posts.

## Quick deploy on Vercel
- Add New → Project → Upload → choose this zip
- No environment variables needed
- Build command: `next build` (default)
- Output directory: `.next` (default)

## Features
- Create group with name, description, center lat/lng (geolocation helper), and radius km
- Join group with distance (Haversine) check
- Per-group simple offers/requests (client-side only)
- Everything stored in localStorage
