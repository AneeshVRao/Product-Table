# Product Table

A React-based application for viewing and managing product data from a REST API. This project implements a custom infinite scrolling table with inline editing capabilities, built using modern React patterns and a clean industrial aesthetic.

## Deployment and Source

- **Live Demo**: [product-table-json.vercel.app](https://product-table-json.vercel.app/)
- **Repository**: [github.com/AneeshVRao/Product-Table](https://github.com/AneeshVRao/Product-Table)

---

## Features

### Core Implementation
- **Infinite Scrolling**: Batched data fetching (1 batch = 10 items) using the `IntersectionObserver` API.
- **Inline Editing**: Custom title editing interface with accessibility support (keyboard navigation and focus management).
- **Responsive Layout**: CSS Grid and Flexbox system that works across desktop and mobile viewports.
- **Custom Table Engine**: Direct `<table>` implementation without external library dependencies for better performance and smaller bundle size.

### UI/UX Refinements
- **Skeleton Loading**: Shimmering placeholder rows displayed during the initial data fetch.
- **Micro-feedback Toasts**: Temporary success indicators appearing after successful field edits.
- **Client-Side Sorting**: Interactive headers for sorting loaded data by Price or Rating.
- **Navigation Utilities**: A floating "Back to Top" button that toggles visibility based on scroll depth.
- **Request Gating**: Logic to prevent redundant API calls and handle race conditions during rapid scrolling.

---

## Tech Stack

- **Framework**: React 19
- **Tooling**: Vite + TypeScript
- **Styling**: Vanilla CSS (Custom Design System)
- **Typography**: IBM Plex Mono & Space Grotesk
- **Data Source**: DummyJSON API
- **Deployment**: Vercel

---

## Architecture Overview

### Data Flow
The application manages state through a centralized custom hook (`useProducts`):
1. Sentinel element intersection triggers the `loadMore` callback.
2. The hook updates the `skip` parameter and initiates a fetch request.
3. New data is appended to the local state, triggering a memoized re-render of the table rows.

### Directory Structure
```
src/
├── types/
│   └── product.ts        # TypeScript interfaces for API contracts
├── hooks/
│   └── useProducts.ts    # Logic for data fetching, pagination, and state
├── components/
│   ├── ProductTable.tsx  # Main table container and observer logic
│   ├── TableHeader.tsx   # Sortable column headers
│   ├── TableRow.tsx      # Individual row rendering
│   └── EditableCell.tsx  # Inline editing state and UI
├── App.tsx               # Entry component and layout
└── App.css               # Design system and component styles
```

---

## Getting Started

### Prerequisites
- Node.js (Version 18 or higher)
- npm or yarn

### Installation
1. **Clone the repository**
   ```bash
   git clone https://github.com/AneeshVRao/Product-Table.git
   cd product-table
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```
   The application will be available at [http://localhost:5173](http://localhost:5173).

---

## Available Scripts

| Command | Description |
| :--- | :--- |
| `npm run dev` | Runs the development server. |
| `npm run build` | Builds the application for production. |
| `npm run preview` | Locally previews the production build. |
| `npm run lint` | Checks the codebase for linting errors. |

---

## Technical Standards
- **Accessibility**: Implements ARIA roles and labels for screen reader support and keyboard-only navigation.
- **Performance Optimization**: Utilizes `useMemo` and `useCallback` to minimize unnecessary component re-renders.
- **Clean Code**: Follows a strictly typed TypeScript architecture with clear separation of concerns between logic and presentation.
