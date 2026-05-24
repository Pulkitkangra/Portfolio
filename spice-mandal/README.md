# 🍛 Spice Mandal — Indian Fine Dining Restaurant Website

A full-stack Node.js + Express restaurant website with Handlebars templating.

## Tech Stack
- **Backend**: Node.js + Express 4
- **Templating**: Handlebars (express-handlebars)
- **Styling**: Custom CSS (no framework — warm saffron palette)
- **JS**: Vanilla JS (custom cursor, scroll reveal, AJAX reservation, page loader)

## Project Structure
```
spice-mandal/
├── app.js              ← Express app entry point
├── package.json
├── routes/
│   ├── index.js        ← All pages + restaurant data
│   └── reservation.js  ← POST /reservation handler
├── views/
│   ├── layouts/
│   │   └── main.hbs    ← Nav, footer, loader, cursor
│   ├── home.hbs        ← Full homepage
│   ├── menu.hbs        ← Full menu page
│   ├── about.hbs       ← About & chefs
│   ├── reservation.hbs ← Standalone booking page
│   ├── contact.hbs     ← Contact page
│   ├── 404.hbs
│   └── error.hbs
└── public/
    ├── css/style.css   ← Full custom CSS
    └── js/main.js      ← All client-side JS

## Pages & Routes
| Route          | Page              |
|----------------|-------------------|
| GET  /         | Homepage          |
| GET  /menu     | Full Menu         |
| GET  /about    | Our Story & Chefs |
| GET  /reservation | Book a Table   |
| POST /reservation | Submit Booking |
| GET  /contact  | Contact & Map     |

## Quick Start
```bash
npm install
npm start          # Runs on http://localhost:3000
npm run dev        # With nodemon (auto-restart)
```

## Restaurant Info
- **Name**: Spice Mandal
- **Location**: 12, Connaught Place, Inner Circle, Block F, New Delhi – 110001
- **Phone**: +91 98765 43210
- **Email**: reservations@spicemandal.in
- **Hours**: Mon–Thu 12PM–11PM · Fri–Sat 12PM–11:30PM · Sun 12PM–10:30PM

## Customisation
All restaurant data (menu items, chefs, testimonials, hours, address) lives in `routes/index.js` — easy to update without touching the HTML.
