# Jospeed Portfolio

A premium, fully animated developer portfolio built with React and Three.js.

## Run locally
npm install
npm run dev

## Build
npm run build

## Deploy
Push to GitHub, connect the repo on Vercel, and deploy. vite.config.js already sets base: '/' to avoid blank-screen deploy issues.

## What's inside
- Real interactive 3D scene in the hero (drag to rotate) - built directly in Three.js
- Custom cursor, typewriter effect, scroll-reveal system, animated count-up stats
- Bento-style project grid with category filters, wired to src/data/projects.js
- Real Jospeed content throughout - Borynx, Fiverr Scout, and other projects

## Finish before going live
1. Add real GitHub/live links in src/data/projects.js
2. Drop a resume.pdf into /public
3. Replace social links in Hero.jsx and Contact.jsx with your real URLs
4. Swap the "JO" avatar circle in About.jsx for a real photo
5. Wire the contact form to Formspree or another form backend
