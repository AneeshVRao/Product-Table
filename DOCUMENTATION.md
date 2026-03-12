# How I Built This & Challenges Along the Way

## Overall Approach

I built the app in four main steps so I wouldn't get too overwhelmed:

1. **Scaffold** — Started with the Vite `react-ts` template. I just set up a clean folder structure with `types/`, `hooks/`, and `components/` so I could find things easily.
2. **Data layer** — I put all the fetching logic into a single custom hook called `useProducts`. It keeps track of the data, loading state, and pagination (`skip` and `total`). This way, I didn't have to pass props down too many levels—just straight to the components that need it.
3. **Table UI** — Instead of pulling in a heavy table library, I just used plain HTML `<table>` tags and split the code into `TableHeader`, `TableRow`, and `EditableCell`. It kept the app bundle pretty small and made styling way easier to handle myself.
4. **Infinite scroll + editing** — For the infinite scroll, I put a dummy `<div>` at the bottom and used an `IntersectionObserver` to detect when it scrolled into view, which triggers the next fetch. For the editing part, each `EditableCell` just handles its own state so it doesn't mess with the rest of the table.

---

## Key Technical Decisions

**`IntersectionObserver` instead of scroll listeners**
I initially thought about listening to window scroll events, but that can get laggy and you usually have to write debounce logic. `IntersectionObserver` just works in the background and is way easier to maintain.

**No Redux or Zustand**
The state is really simple in this app—basically just one hook feeding one table. Adding a whole state management library felt like complete overkill here.

**Native `fetch` instead of Axios**
I only needed to hit one single API endpoint, so using standard `fetch` with `async/await` was totally fine. It saved me from adding another dependency I didn't really need.

**Letting `EditableCell` manage its own state**
Since the edits to the titles aren't actually saving to a real backend right now, I just let the cell component hold onto its own edited value. If I eventually wanted to save it to a database, passing an `onSave` prop to the cell would be a pretty straightforward way to handle it.

---

## Challenges & Fixes

| Challenge | How I Fixed It |
|---|---|
| **Double-fetch in React StrictMode** | StrictMode runs effects twice, which was causing duplicate data fetching. I added a quick `loading` check (`if (loading || skip >= total) return`) and made sure to disconnect the observer when the component cleans up. |
| **Race condition on initial load** | Before the first fetch even finished, the observer would trigger *another* fetch because the dummy `<div>` was already visible. I fixed this by only rendering the `<div>` when `products.length > 0`. |
| **Sticky header headers overlapping** | The main app header is 64px tall and sticky. When I made the table headers sticky too, they just slid underneath it. I added `top: 64px` to the `<th>` elements so they lock in right below the app header. |
| **Missing brands looked weird** | Some products didn't have a brand coming from the API, which left empty table cells. I just added a fallback (`product.brand || '—'`) so it shows a nice em-dash instead. |
| **Editable cells losing value when the parent re-rendered** | Originally, table re-renders were wiping out the user's edits. I fixed it by initializing `localTitle` once from the prop, and then letting the cell fully own that state so parent changes don't overwrite it. |
