# Leegality Frontend Assessment — Product Listing App

## Links
- **GitHub Repository:** https://github.com/Nagasai1112/leegality-frontend-task
- **Demo:** https://leegality-frontend-task.vercel.app

---

## Setup Instructions

### Prerequisites
- Node.js (v18 or above)
- npm

### Steps to run locally

1. Clone the repository
   git clone https://github.com/Nagasai1112/leegality-frontend-task.git

2. Navigate into the project folder
   cd leegality-frontend-task

3. Install dependencies
   npm install

4. Create a .env file in the root folder
   VITE_API_BASE_URL=https://dummyjson.com

5. Start the development server
   npm run dev

6. Open in browser
   http://localhost:5173

---

## Assumptions Made

- Brand filter is extracted dynamically from the fetched products
  since DummyJSON does not expose a dedicated brands endpoint.

- Price filter is applied client-side because DummyJSON API does
  not support min/max price as query parameters.

- Multiple categories can be selected simultaneously. When multiple
  categories are selected, products are fetched in parallel using
  Promise.all and merged with duplicate removal.

- Filters persist when navigating back from the Product Detail page
  using sessionStorage. On a fresh page load or browser refresh,
  filters reset and all products are shown by default.

- The quantity selector on the Product Detail page is UI-only
  since there is no cart API available in DummyJSON.

---

## Architectural Decisions

- **Axios with a base instance** — A single Axios instance reads
  the base URL from .env, keeping all API calls consistent and
  easy to update.

- **Separate API service files** — productApi.js and categoryApi.js
  separate API logic from UI components, making the codebase easier
  to maintain and test.

- **Custom useFilters hook** — All filter state (category, brand,
  price, search, page) is managed in one custom hook with
  sessionStorage persistence so filters survive navigation to the
  Product Detail page and back.

- **Combined filtering with Promise.all** — When multiple categories
  are selected, all category API calls are made in parallel and
  results are merged and deduplicated on the client side.

- **Skeleton loaders** — SkeletonCard and SkeletonProductDetail
  components replace plain loading text for a better user experience.

- **Component separation** — UI is split into small reusable
  components: Navbar, Sidebar, ProductCard, Pagination,
  SkeletonCard, SkeletonGrid, SkeletonProductDetail.

---

## Improvements Given More Time

- Add sorting options (Price: Low to High, High to Low, Top Rated)
- Add debounce on the search input to reduce API calls
- Add a shopping cart with local state or Context API
- Add unit and integration tests using React Testing Library
- Make brand and price filters server-side if the API supports it
- Add infinite scroll as an alternative to pagination
- Add toast notifications for errors instead of inline text
- Improve mobile responsiveness of the Product Detail page
- Add breadcrumb navigation on the Product Detail page

---

## Tech Stack

- React (Functional Components)
- React Router v6
- Axios
- Tailwind CSS
- Lucide React (icons)
- Vite