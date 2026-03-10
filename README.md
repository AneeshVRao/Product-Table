# ⚡ Product Table (Pro-Max Edition)

A high-performance, **Brutalist-inspired** React 19 application for browsing and managing product data. This project demonstrates advanced frontend engineering patterns including infinite scrolling with `IntersectionObserver`, custom data hooks, and a robust micro-interaction system.

## 🚀 Live Links

- **Deployment**: [Live on Vercel](https://product-table-boz0yx0l5-aneeshvrao2017-gmailcoms-projects.vercel.app/)
- **Repository**: [GitHub Source](https://github.com/AneeshVRao/Product-Table)

---

## ✨ Features (Standard & Pro-Max)

### Core Requirements
- 🔄 **Incremental Infinite Scroll**: Fetches products in batches of 10 from `dummyjson.com` using the `IntersectionObserver` API.
- ✏️ **Inline Title Editing**: Custom edit interaction with pencil-toggle, auto-focus, and keyboard support (`Enter` to save, `Esc` to cancel).
- 📱 **Responsive Design**: Fully fluid layout that adapts from 4K monitors down to mobile devices.
- 📦 **Zero Third-Party Table Libraries**: Hand-rolled table logic for maximum performance and control.

### Pro-Max UX Enhancements
- 🦴 **Skeleton Shimmer Loaders**: Premium loading states for initial data fetch to reduce perceived latency.
- 📬 **"Saved" Success Toasts**: Instant visual feedback via a fading micro-interaction when a title is modified.
- 📊 **Client-Side Sorting**: Quick-sort loaded products by **Price** or **Rating** directly in the header.
- 🔝 **Back to Top (FAB)**: Smooth-scroll floating action button that appears intelligently as you scroll.
- 🛡️ **Race-Condition Gating**: Advanced logic in the `IntersectionObserver` to prevent double-fetches and offset skips on slow networks.

---

## 🛠️ Tech Stack

- **Core**: React 19 + TypeScript (Vite)
- **State Management**: React Hooks (`useProducts` custom hook)
- **Styling**: Vanilla CSS (Brutalist Design System)
- **Typography**: IBM Plex Mono (Data) & Space Grotesk (Headers)
- **Icons**: Custom SVG + Lucide-style iconography
- **Deployment**: Vercel CI/CD

---

## 🏗️ Architecture Overview

### Data Flow
The app uses a **unidirectional data flow** managed by a central custom hook:
`Sentinel Element` → `IntersectionObserver` → `loadMore()` → `useEffect` → `Fetch API` → `React State` → `Optimized Re-render`.

### Directory Structure
```
src/
├── types/
│   └── product.ts        # TypeScript interfaces for API responses
├── hooks/
│   └── useProducts.ts    # Centralized fetching logic & pagination state
├── components/
│   ├── ProductTable.tsx  # Optimized table container & observer logic
│   ├── TableHeader.tsx   # Header component with sorting triggers
│   ├── TableRow.tsx      # Memoized row component
│   └── EditableCell.tsx  # Field-level state & edit micro-frontend
├── App.tsx               # Application entry & layout
└── App.css               # Brutalist Design System implementation
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn

### Local Installation
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
   Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## 📜 Available Scripts

| Command | Action |
| :--- | :--- |
| `npm run dev` | Starts the Vite dev server with Hot Module Replacement (HMR). |
| `npm run build` | Compiles the project into a production-ready `dist` folder. |
| `npm run preview` | Spins up a local server to test the production build. |
| `npm run lint` | Runs ESLint to check for code quality issues. |

---

## 🛡️ Best Practices Followed
- **Accessibility (A11y)**: ARIA roles, labels, and focus management for the inline editing flow.
- **Performance**: Use of `useCallback` and `useMemo` to prevent unnecessary re-renders during infinite scroll updates.
- **Clean Code**: Modular component architecture with strict TypeScript typing.
- **Separation of Concerns**: Logic lived in hooks, presentation in components, and patterns in types.

---

## 💎 Credits
This README was enhanced using the [Antigravity Awesome Skills](https://github.com/sickn33/antigravity-awesome-skills) `readme` helper.
