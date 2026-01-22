# Afterlunch Bakery

A modern, responsive dessert shop web application built with Angular, featuring product browsing, detailed product views, and a dynamic shopping cart.

## Features

- **Product Catalog** — Browse a curated selection of desserts with images and pricing
- **Product Details** — View detailed information for each item
- **Shopping Cart** — Add/remove items with real-time total calculation
- **Responsive Design** — Optimized for mobile, tablet, and desktop
- **Smooth Animations** — Polished overlay transitions and hover effects

## Tech Stack

- **Angular 21** — Latest standalone components architecture
- **TypeScript** — Strict type checking
- **Tailwind CSS** — Utility-first styling
- **Signals** — Reactive state management
- **Feather Icons** — Clean, minimal iconography

## Getting Started

### Prerequisites
- Node.js 18+
- npm 10+

### Installation

```bash
npm install
ng serve
```

Open [http://localhost:4200](http://localhost:4200) in your browser.

## Build & Deploy

```bash
ng build
```

Compiled artifacts go to the `dist/` directory. Deployed on Vercel.

## Live Demo

https://afterlunch-bakery.vercel.app/

## Project Structure

```
src/app/
├── components/       # UI components (shop, cart, product-detail, etc.)
├── services/         # Inventory & cart state management
├── models/           # TypeScript interfaces
└── app.ts            # Root component
```

## License

MIT