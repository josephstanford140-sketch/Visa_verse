# Field Sales Hub (MedRep Dashboard) — RealMed Pharma

## Overview
A mobile-first Progressive Web App (PWA) for pharmaceutical field sales representatives. Works offline as an installable Android app — no hosting required after initial install. All data is stored locally via Zustand/localStorage.

## Architecture
- **Frontend**: React 18 + TypeScript + Vite
- **Routing**: react-router-dom v6
- **State Management**: Zustand with localStorage persistence (`medrep-storage` key)
- **Styling**: Tailwind CSS with shadcn/ui components
- **Toasts**: Sonner
- **PWA**: Service worker + manifest.json for offline support & Android install
- **Backend**: Express server (serves the frontend, no API routes used)

## Key Features
- **Auth**: Local sign up/login with email & password (stored in localStorage)
- **Dashboard**: Overview with counts for doctors, products, orders, visits, reminders
- **Doctors**: CRUD management with search
- **Products**: Category-based product management with slide view
- **Orders**: Create orders linked to doctors/products, share via WhatsApp
- **Visits**: Schedule and track daily visits with today/tour plan tabs
- **Reminders**: Track reminders with slide view and completion status
- **Bottom Navigation**: Native-style tab bar for quick page switching
- **PWA Install**: Can be installed on Android via "Add to Home Screen"

## File Structure
```
client/src/
├── App.tsx              # Main app with BrowserRouter routes + AppLayout
├── main.tsx             # Entry point + service worker registration
├── index.css            # Tailwind + CSS variables + mobile optimizations
├── store/
│   └── useAppStore.ts   # Zustand store with User auth + all data models
├── pages/
│   ├── LoginPage.tsx    # Email/password login
│   ├── SignUpPage.tsx   # Registration with name/email/password
│   ├── Dashboard.tsx
│   ├── DoctorsPage.tsx
│   ├── ProductsPage.tsx
│   ├── OrdersPage.tsx
│   ├── VisitsPage.tsx
│   ├── RemindersPage.tsx
│   └── NotFound.tsx
├── components/
│   ├── BottomNav.tsx    # Fixed bottom navigation bar
│   ├── NavLink.tsx
│   ├── PageHeader.tsx
│   └── ui/              # shadcn/ui components
├── hooks/
│   ├── use-mobile.tsx
│   └── use-toast.ts
└── lib/
    ├── queryClient.ts
    └── utils.ts

client/public/
├── manifest.json        # PWA manifest
├── sw.js                # Service worker for offline caching
├── icon-192.png         # PWA icon 192x192
├── icon-512.png         # PWA icon 512x512
└── favicon.png
```

## Branding
- Company: "RealMed Pharma"
- Tagline: "Serving & Preserving Eye Health"
- Logo: Bird in flight (orange/amber wings, teal blue body) at `attached_assets/realmed_bird_logo.png`
- Primary color: Teal/sky blue (#0ea5e9)
- Accent: Amber/gold (#f59e0b)

## Dependencies
- react-router-dom (routing)
- zustand (state management)
- sonner (toast notifications)
- lucide-react (icons)
- shadcn/ui (UI components)
- recharts (charts)
- date-fns (date utilities)
