# Approach, Challenges & Solutions

## Approach

The app was built in 4 incremental phases:

1. **Scaffold** — Vite `react-ts` template, clean folder structure (`types/`, `hooks/`, `components/`), confirm boot.
2. **Data layer** — `useProducts` hook encapsulates all fetch logic. State lives in one place; components receive data as props.
3. **Table UI** — Plain `<table>` HTML decomposed into `TableHeader`, `TableRow`, and `EditableCell`. No third-party libraries.
4. **Infinite scroll + editing** — `IntersectionObserver` on a sentinel `<div>` below the table triggers `loadMore`. `EditableCell` manages its own local edit state.

---

## Key Patterns

### Append-only products array
```ts
setProducts(prev => [...prev, ...data.products]);
```
The array is never replaced — only grown. This prevents React from losing DOM state on existing rows during re-renders.

### Loading guard
```ts
if (loading || skip >= total) return;
```
Prevents the most common infinite-scroll bug: firing duplicate fetches while a request is already in-flight or when there's no more data.

### `useCallback` + `useEffect` pagination chain
`fetchProducts` is memoized with `useCallback([skip])`. `useEffect([fetchProducts])` only re-runs when `skip` changes, which happens only via `loadMore`. This creates a reliable one-page-per-tick fetch loop with no extra dependencies.

### IntersectionObserver cleanup
```ts
return () => { observer.disconnect(); };
```
The `useEffect` cleanup function disconnects the observer on unmount, preventing memory leaks and stale callbacks in React StrictMode's double-invocation.

---

## Challenges

| Challenge | Solution |
|---|---|
| **Double-fetch in StrictMode** | Loading guard (`if (loading) return`) + `observer.disconnect()` on cleanup |
| **Sentinel fires too early** | `threshold: 0.1` — observer waits until 10% of sentinel is visible before firing |
| **Editable cell loses value on parent re-render** | `localTitle` is initialised from `initialValue` prop and then fully owned by `EditableCell`'s local state |
| **Sticky header z-index overlap** | Table `<th>` has `top: 72px` to sit below the app header (72px tall), both using `position: sticky` |
| **Brand field is undefined for some products** | Fallback `product.brand \|\| '—'` renders an em-dash instead of blank |

---

## Deliberate Design Decisions

- **No Redux / Zustand** — the state graph is shallow (one hook → one table). Adding a global store would be over-engineering.
- **No axios** — `fetch` + async/await is sufficient; avoids an extra dependency.
- **No scroll event listeners** — `IntersectionObserver` is more performant (fires off the main thread), avoids debounce boilerplate, and is the modern web standard for this pattern.
- **`EditableCell` owns its local state** — changes to a title don't reach the server in this version, so it makes sense to keep the edit state local. If persistence were needed, a `onSave` callback prop would be passed down.
