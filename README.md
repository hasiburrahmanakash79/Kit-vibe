# KitVibe — Premium Jersey E-commerce Platform

A frontend-only jersey e-commerce platform with a full customer storefront and an admin dashboard, built with React, Tailwind CSS, React Router, Recharts, and React Hook Form. All data is mocked and state is persisted to `localStorage` — there is no backend.

## Getting Started

```bash
npm install
npm run dev
```

Then open the URL Vite prints (usually http://localhost:5173).

To build for production:

```bash
npm run build
npm run preview
```

## Demo Accounts

- **Customer:** demo@kitvibe.com / kitvibe123 (or register a new account, or continue as guest)
- **Admin:** admin@kitvibe.com / admin123 — sign in at `/admin/login` or via the main Login page

## What's Included

**Customer storefront:** Home, Shop (search/filter/sort), Product Detail (image zoom + lightbox gallery, size guide, reviews), Wishlist, Cart, multi-step Checkout, Order Success/History/Tracking, Profile, Login/Register/Forgot Password, About, Contact, FAQ, Shipping/Return/Privacy/Terms policies, and a styled 404 page. First-time visitors get a short onboarding tour and contextual coach marks (dismissible, stored in localStorage).

**Admin dashboard** (`/admin`): analytics overview with KPI cards and Recharts visualizations, full Product CRUD, Category management, Order management with status updates, Customer management, Review moderation, Inventory tracking with low-stock alerts, Discount and Coupon management, homepage Content editing, and Store Settings.

## Notes

- All product imagery is placeholder artwork (no real team logos/photos are used) since this is a demo catalog of fictional clubs and leagues.
- State (cart, wishlist, orders, admin edits) is stored in your browser's localStorage, so it persists across reloads but is local to your browser/device.
- Checkout is a fully functional mock flow — no real payment is processed.
