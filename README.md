# Product Table

A React + TypeScript single-page app that fetches product data from a public API, displays it in a hand-built table, supports **inline title editing**, and automatically loads more data as the user scrolls using `IntersectionObserver`.

## Live Demo

> 🚀 **Deployed URL:** _Add your Vercel URL here after deployment_

## Tech Stack

| Tool | Purpose |
|---|---|
| React 19 + TypeScript | UI framework |
| Vite | Build tool / dev server |
| Fetch API | Data fetching (no axios) |
| IntersectionObserver | Infinite scroll (no scroll listeners) |
| Plain `<table>` HTML | No third-party table library |
| CSS Custom Properties | Dark-mode design system |
| Vercel | Deployment |

## Features

- ♾️ **Infinite scroll** — auto-loads next 10 products when sentinel enters viewport
- ✏️ **Inline editing** — double-click any title to edit it (Enter/blur to save, Escape to cancel)
- 🎨 **Premium dark UI** — sticky headers, alternating rows, color-coded ratings, category badges
- ⚡ **Loading guard** — prevents duplicate fetches during rapid scrolling
- 🖼️ **Lazy thumbnails** — product images load on demand

## Setup

```bash
git clone <repo-url>
cd product-table
npm install
npm run dev
```

App runs at **http://localhost:5173**

## Build

```bash
npm run build      # Production bundle → dist/
npm run preview    # Preview production build locally
```

## API

Data sourced from [dummyjson.com/products](https://dummyjson.com/products):
- `?limit=10&skip=0` → first page, `skip=10` → second, etc.
- Fetching stops when `skip >= total`

## Folder Structure

```
src/
├── types/
│   └── product.ts        ← Product + ProductsResponse interfaces
├── hooks/
│   └── useProducts.ts    ← Fetch, pagination, state management
├── components/
│   ├── ProductTable.tsx  ← Table shell + IntersectionObserver + sentinel
│   ├── TableHeader.tsx   ← <thead> column headers
│   ├── TableRow.tsx      ← One <tr> per product
│   └── EditableCell.tsx  ← Double-click inline edit
├── App.tsx               ← Root, wires hook into table
├── App.css               ← Premium dark-mode table styles
├── index.css             ← Global reset + design tokens
└── main.tsx              ← Vite entry point
```
