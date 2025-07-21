
---

# CryptoTable App – Quick Documentation

## Overview

This app displays a list of cryptocurrencies with filters and sorting options. It fetches data from the CoinMarketCap API and allows users to filter by market cap, price, sort by various fields, and paginate or use infinite scroll.

---

## Main Components

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
<code_block_to_apply_changes_from>
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
```

---

Let me know if you want more details or another part of the app explained!

## env api key

VITE_COINMARKETCAP_KEY=0d0aec28-1e4f-4ace-b6f3-ba559214ab15