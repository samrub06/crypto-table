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
    <div className="flex flex-wrap gap-4 mb-4 items-end justify-center">
      <div>
        <label className="block text-sm font-medium">Min Market Cap ($)</label>
        <div className="flex items-center gap-2">
          <input
            type="number"
            className="border rounded px-2 py-1 w-40"
            min={0}
            step={100000}
            value={minMarketCap}
            onChange={e => onMinMarketCapChange(Number(e.target.value))}
          />
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium">Max Price ($)</label>
        <input
          type="number"
          className="border rounded px-2 py-1 w-32"
          value={maxPrice}
          min={0}
          step={1}
          onChange={e => onMaxPriceChange(Number(e.target.value))}
        />
      </div>
      <div>
        <label className="block text-sm font-medium">Sort by</label>
        <select
          className="border rounded px-2 py-1 w-40"
          value={sortKey}
          onChange={e => onSortKeyChange(e.target.value)}
        >
          {SORTS.map(s => <option key={s.key} value={s.key}>{s.label}</option>)}
        </select>
      </div>
      <div>
        <label className="block text-sm font-medium">Direction</label>
        <select
          className="border rounded px-2 py-1 w-24"
          value={sortDir}
          onChange={e => onSortDirChange(e.target.value as 'asc' | 'desc')}
        >
          <option value="desc">Desc</option>
          <option value="asc">Asc</option>
        </select>
      </div>
      <div>
        <label className="block text-sm font-medium">Items per page</label>
        <select
          className="border rounded px-2 py-1 w-32"
          value={pageSize}
          onChange={e => onPageSizeChange(e.target.value === 'All' ? 'All' : Number(e.target.value) as typeof PAGE_SIZE_OPTIONS[number])}
        >
          {PAGE_SIZE_OPTIONS.map(opt => <option key={opt} value={opt}>{opt}</option>)}
        </select>
      </div>
      <div className="flex flex-col justify-end">
        <button
          className="px-3 py-1 rounded border bg-gray-200 hover:bg-gray-300 text-sm"
          onClick={onReset}
        >
          Reset filters
        </button>
      </div>
    </div>
  )
}

export default CryptoFilters 