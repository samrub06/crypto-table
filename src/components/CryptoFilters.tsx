import React from "react"

// Type for the possible page size options
const PAGE_SIZE_OPTIONS = [10, 20, 50, 100, 'All'] as const

// Type for the sort options
const SORTS = [
  { key: "name", label: "Name" },
  { key: "symbol", label: "Symbol" },
  { key: "price", label: "Price" },
  { key: "market_cap", label: "Market Cap" },
  { key: "percent_change_24h", label: "24h % Change" },
]

type CryptoFiltersProps = {
  minMarketCap: number
  maxPrice: number
  sortKey: string
  sortDir: 'asc' | 'desc'
  pageSize: typeof PAGE_SIZE_OPTIONS[number]
  onMinMarketCapChange: (v: number) => void
  onMaxPriceChange: (v: number) => void
  onSortKeyChange: (v: string) => void
  onSortDirChange: (v: 'asc' | 'desc') => void
  onPageSizeChange: (v: typeof PAGE_SIZE_OPTIONS[number]) => void
  onReset: () => void
}

// Presentational component for the filters UI
const CryptoFilters: React.FC<CryptoFiltersProps> = ({
  minMarketCap,
  maxPrice,
  sortKey,
  sortDir,
  pageSize,
  onMinMarketCapChange,
  onMaxPriceChange,
  onSortKeyChange,
  onSortDirChange,
  onPageSizeChange,
  onReset,
}) => {


  return (
    <div className="flex flex-wrap gap-4 mb-6 items-end justify-center bg-white/80 rounded-xl shadow p-4 border border-gray-100">
      <div>
        <label htmlFor="minMarketCap" className="block text-xs font-semibold text-gray-500 mb-1">Min Market Cap ($)</label>
        <input
          id="minMarketCap"
          type="number"
          className="border border-gray-200 focus:border-blue-400 focus:ring-2 focus:ring-blue-100 rounded-lg px-3 py-2 w-40 text-sm transition"
          min={0}
          step={100000}
          value={minMarketCap}
          onChange={e => onMinMarketCapChange(Number(e.target.value))}
          aria-label="Minimum market capitalization in dollars"
        />
      </div>
      <div>
        <label htmlFor="maxPrice" className="block text-xs font-semibold text-gray-500 mb-1">Max Price ($)</label>
        <input
          id="maxPrice"
          type="number"
          className="border border-gray-200 focus:border-blue-400 focus:ring-2 focus:ring-blue-100 rounded-lg px-3 py-2 w-32 text-sm transition"
          value={maxPrice}
          min={0}
          step={1}
          onChange={e => onMaxPriceChange(Number(e.target.value))}
          aria-label="Maximum price in dollars"
        />
      </div>
      <div>
        <label htmlFor="sortKey" className="block text-xs font-semibold text-gray-500 mb-1">Sort by</label>
        <select
          id="sortKey"
          className="border border-gray-200 focus:border-blue-400 focus:ring-2 focus:ring-blue-100 rounded-lg px-3 py-2 w-40 text-sm transition"
          value={sortKey}
          onChange={e => onSortKeyChange(e.target.value)}
          aria-label="Sort by field"
        >
          {SORTS.map(s => <option key={s.key} value={s.key}>{s.label}</option>)}
        </select>
      </div>
      <div>
        <label htmlFor="sortDir" className="block text-xs font-semibold text-gray-500 mb-1">Direction</label>
        <select
          id="sortDir"
          className="border border-gray-200 focus:border-blue-400 focus:ring-2 focus:ring-blue-100 rounded-lg px-3 py-2 w-24 text-sm transition"
          value={sortDir}
          onChange={e => onSortDirChange(e.target.value as 'asc' | 'desc')}
          aria-label="Sort direction"
        >
          <option value="desc">Desc</option>
          <option value="asc">Asc</option>
        </select>
      </div>
      <div>
        <label htmlFor="pageSize" className="block text-xs font-semibold text-gray-500 mb-1">Items per page</label>
        <select
          id="pageSize"
          className="border border-gray-200 focus:border-blue-400 focus:ring-2 focus:ring-blue-100 rounded-lg px-3 py-2 w-32 text-sm transition"
          value={pageSize}
          onChange={e => onPageSizeChange(e.target.value === 'All' ? 'All' : Number(e.target.value) as typeof PAGE_SIZE_OPTIONS[number])}
          aria-label="Items per page"
        >
          {PAGE_SIZE_OPTIONS.map(opt => <option key={opt} value={opt}>{opt}</option>)}
        </select>
      </div>
      <div className="flex flex-col justify-end">
        <button
          className="px-4 py-2 rounded-lg bg-gradient-to-r from-blue-500 to-blue-400 text-white font-semibold shadow hover:from-blue-600 hover:to-blue-500 transition text-sm border-0"
          onClick={onReset}
          aria-label="Reset all filters"
        >
          Reset filters
        </button>
      </div>
    </div>
  )
}

export default CryptoFilters 