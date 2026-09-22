# MRG — Compliance | Liaison | Solutions

Production-quality corporate website for MRG.

## Stack

- **Frontend:** React 19 + Vite + TypeScript + React Router + Lucide icons
- **Backend:** Node.js + Express + Nodemailer (consultation form emails)

## Pages / Routes

| Route | Page |
|-------|------|
| `/` | Home |
| `/about` | About Us |
| `/why-mrg` | Why MRG |
| `/contact` | Contact |
| `/consultation` | Get a Consultation (form) |

Navigation contains **only**: Home · About Us · Why MRG · Contact · Get a Consultation.  
Services and Industries appear as Home page sections only.

## Setup

```bash
cd mrg-website
npm install
cp .env.example .env
# Edit .env with your SMTP credentials
```

### Environment variables

| Variable | Description |
|----------|-------------|
| `SMTP_HOST` | SMTP server host |
| `SMTP_PORT` | Port (usually 587 or 465) |
| `SMTP_USER` | SMTP username |
| `SMTP_PASSWORD` | SMTP password |
| `SMTP_FROM` | From address |
| `CONSULTATION_RECEIVER` | Email that receives consultation requests (e.g. info@mrgsolutions.in) |
| `PORT` | API server port (default 3001) |

## Run locally

**Terminal 1 — API**
```bash
npm run server
# or: node server/index.js
```

**Terminal 2 — Frontend**
```bash
npm run dev
```

Open http://localhost:5173

The Vite dev server proxies `/api/*` to the API on port 3001.

## Build

```bash
npm run build
npm run preview
```

For production, serve the `dist/` folder and run the Express server (or mount the API under the same domain).

## Notes

- Social media links in the footer are placeholders (`#`). Replace with real URLs when available.
- Logo is text-based. Replace with an image asset in `Navbar` / `Footer` if you have a brand logo file.
- Images use Unsplash placeholders for the hero and about sections; replace with your own assets for production.
- SMTP must be configured for the consultation form to send emails. Without it, the API returns a clear 503 error.

## Contact info used on site

- Phone: +91 9086000911
- Email: info@mrgsolutions.in
- Location: Srinagar, Jammu & Kashmir (Serving clients across India)
