# How I Built This & Challenges Along the Way

## Overall Approach

I built the application in four main steps so the implementation stayed manageable and organized.

### Scaffold
I started with the Vite `react-ts` template and set up a simple folder structure with `types/`, `hooks/`, and `components/`. This made it easier to organize the code and locate files during development.

### Data Layer
All data fetching logic was placed inside a custom hook called `useProducts`. This hook manages the product list, loading state, and pagination values (`skip` and `total`). Centralizing this logic avoided unnecessary prop drilling and kept the components focused on rendering.

### Table UI
Instead of introducing a third-party table library, I implemented the table using native HTML `<table>` elements. The UI was divided into smaller components such as `TableHeader`, `TableRow`, and `EditableCell`. This kept the bundle size small and made the structure easier to maintain.

### Infinite Scroll and Editing
For infinite scrolling, I added a placeholder `<div>` at the bottom of the table and used the Intersection Observer API to detect when it enters the viewport. When triggered, the next batch of products is fetched.

Each `EditableCell` manages its own local state so updates to one cell do not trigger unnecessary updates across the table.

## Key Technical Decisions

**IntersectionObserver instead of scroll listeners**
Initially, I considered using a window scroll listener to trigger pagination. However, scroll listeners require manual calculations and debouncing to avoid performance issues.
The Intersection Observer API is more efficient because it runs within the browser's rendering pipeline and detects element visibility without continuous scroll event handling.

**No Redux or Zustand**
The application's state requirements are minimal—primarily a list of products and pagination values. Introducing a global state management library such as Redux or Zustand would have added unnecessary complexity for this use case.

**Native fetch instead of Axios**
Since the application only calls a single API endpoint, the native `fetch` API with `async/await` was sufficient. Using `fetch` avoided adding an extra dependency and kept the project lightweight.

**Letting EditableCell manage its own state**
The edited product titles are currently not persisted to a backend. For this reason, each `EditableCell` stores its own local value.
If persistence were required later, a callback such as `onSave` could be passed from the parent component to handle updates.

## Challenges & Fixes

| Challenge | How I Fixed It |
|---|---|
| **Double-fetch in React StrictMode** | React StrictMode intentionally runs effects twice in development to help detect side effects. This caused duplicate API requests.<br><br>To prevent this, I added a guard condition:<br>`if (loading || skip >= total) return;`<br><br>I also ensured the Intersection Observer disconnects during component cleanup. |
| **Race condition on initial load** | Before the first API request completed, the observer sometimes triggered another fetch because the placeholder `<div>` was already visible in the viewport.<br><br>**Solution:**<br>The observer element is rendered only when:<br>`products.length > 0`<br><br>This ensures the observer activates only after the initial data load. |
| **Sticky headers overlapping** | The main application header is a sticky element with a height of 64px. When the table header was made sticky, it overlapped with the main header.<br><br>**Solution:**<br>I added a `top: 64px` offset to the `<th>` elements so the table header stays positioned correctly below the main header. |
| **Missing brands looked weird** | Some products returned from the API did not include a brand, which resulted in empty table cells.<br><br>**Solution:**<br>A fallback value was added:<br>`product.brand || '—'`<br><br>This keeps the UI consistent and avoids empty cells. |
| **Editable cells losing value when the parent re-rendered** | Initially, when the parent table component re-rendered, edited titles were reset to their original values.<br><br>**Solution:**<br>The editable cell initializes a local state (`localTitle`) from the prop once, and the component fully manages that value afterwards. This prevents parent re-renders from overwriting user edits. |
