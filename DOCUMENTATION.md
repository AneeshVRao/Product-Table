# Development Approach, Challenges & Solutions

## Approach

The application was built in four incremental phases:

1. **Scaffold** — Vite `react-ts` template, clean folder structure (`types/`, `hooks/`, `components/`).
2. **Data layer** — A single custom hook (`useProducts`) owns all fetch state: `products`, `loading`, `error`, `skip`, and `total`. Components receive data as props with no prop-drilling beyond one level.
3. **Table UI** — Plain `<table>` HTML decomposed into `TableHeader`, `TableRow`, and `EditableCell`. No third-party table libraries were used, keeping the bundle small and the rendering logic fully under control.
4. **Infinite scroll + editing** — An `IntersectionObserver` on a sentinel `<div>` below the last row triggers `loadMore`. `EditableCell` manages its own local edit state independently of the parent.

---

## Key Technical Decisions

**`IntersectionObserver` over scroll listeners**
The observer fires off the main thread and requires no debounce logic, making it more performant and simpler to maintain than a `window.scroll` listener.

**No global state manager (no Redux/Zustand)**
The state graph is shallow: one hook feeds one table. Adding a store would be over-engineering for this scope.

**Native `fetch` over axios**
`fetch` with `async/await` is sufficient for a single REST endpoint and avoids an unnecessary dependency.

**`EditableCell` owns its local state**
Since title changes are not persisted to a server, it makes sense to keep edit state local to the cell component. If persistence were needed, an `onSave` callback prop would be the clean extension point.

---

## Challenges & Solutions

| Challenge | Solution |
|---|---|
| **Double-fetch in React StrictMode** | Added a `loading` guard (`if (loading \|\| skip >= total) return`) and disconnected the observer on cleanup to prevent stale callbacks. |
| **Race condition on initial load** | The sentinel `<div>` is only rendered after `products.length > 0`, preventing the observer from firing before the first fetch completes. |
| **Sticky header z-index overlap** | Table `<th>` uses `top: 64px` to sit below the 64px-tall app header; both use `position: sticky`. |
| **Brand field missing for some products** | Fallback `product.brand \|\| '—'` renders an em-dash instead of a blank cell. |
| **Editable cell losing value on re-render** | `localTitle` is initialised once from `initialValue` and then fully owned by `EditableCell`'s local state, so parent re-renders do not reset it. |
