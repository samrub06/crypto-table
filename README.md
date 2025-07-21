
---

# CryptoTable App – Quick Documentation

## Overview

This app displays a list of cryptocurrencies with filters and sorting options. It fetches data from the CoinMarketCap API and allows users to filter by market cap, price, sort by various fields, and paginate or use infinite scroll.

---


## Main Components

- `CryptoTable.tsx` (table rendering, accessibility, sorting)
- `CryptoFilters.tsx` (filter controls, a11y)
- `CryptoPage.tsx` (data fetching, state, error handling)


### 1. CryptoPage.tsx

- Main page for displaying the cryptocurrency table.
- Handles:
  - Fetching crypto data and logos.
  - Managing filters, sorting, pagination, and infinite scroll.
  - Passing data and handlers to child components.

### 2. CryptoFilters.tsx

- Presentational component for filter controls.
- Allows user to:
  - Set minimum market cap and maximum price.
  - Choose sort key and direction.
  - Select items per page or infinite scroll.
  - Reset all filters.

---

## Folder Structure (suggested)

```
src/
  api/                # API hooks and data fetching logic
    coinmarketcap.ts
  components/         # Reusable UI components
    CryptoFilters.tsx
    CryptoTable.tsx
  hooks/              # Custom React hooks
    useDebounce.ts
    useFilterStateWithUrl.ts
    useInfiniteScroll.ts
  libs/               # Constants and utility functions
    constants.ts
  pages/              # Page-level components
    CryptoPage.tsx
  types/              # TypeScript type definitions
    coinmarketcap.ts
  test/               # All test files (unit, integration, etc.)
    hooks/            # Tests for custom hooks
      useDebounce.test.tsx
    components/       # Tests for components (if any)
```

---

## Challenges & Solutions

- **API Batch IDs for Logos**: CoinMarketCap requires fetching crypto logos by ID in batches. I collect all visible crypto IDs and request their logos in a single API call to minimize requests and improve performance.

- **Infinite Scroll & URLSearchParams**: Supporting both classic pagination and infinite scroll, while keeping filters and page state in the URL, required careful use of custom hooks and state. The URL always reflects the current filters, sort, and page, even in infinite scroll mode.

- **React Query Cache**: I use React Query to cache API responses and avoid unnecessary refetches. This improves speed and reduces API quota usage, especially when users change filters or pages frequently.

- **useCallback for Children**: To prevent unnecessary re-renders, I wrap event handlers (like sorting or pagination) in `useCallback` before passing them to child components. This keeps the UI fast and stable.

- **Container/Presentation Pattern**: I separate logic-heavy container components (like `CryptoPage.tsx`) from presentational components (`CryptoTable.tsx`, `CryptoFilters.tsx`). This makes the code easier to test, maintain, and reuse.

- **Throttle for Infinite Scroll**: To avoid flooding the API with requests during fast scrolling, I use a throttle utility. This ensures new data is only fetched at controlled intervals, keeping the app responsive and efficient.

---

## env api key

VITE_COINMARKETCAP_KEY=0d0aec28-1e4f-4ace-b6f3-ba559214ab15

---

---