import { useEffect, useState } from "react"
import { useSearchParams } from "react-router-dom"
import { PAGE_SIZE_OPTIONS } from "../libs/constants"
import { parseNumberOrDefault } from "../libs/utils"

// Generic hook to sync filter state with URL search params
export default function useFilterStateWithUrl(defaults: {
  minMarketCap: number,
  maxPrice: number,
  sortKey: string,
  sortDir: 'asc' | 'desc',
  page: number,
  pageSize: typeof PAGE_SIZE_OPTIONS[number],
}) {
  const [searchParams, setSearchParams] = useSearchParams()

  // State for each filter
  const [minMarketCap, setMinMarketCap] = useState(() => parseNumberOrDefault(searchParams.get('minMarketCap'), defaults.minMarketCap))
  const [maxPrice, setMaxPrice] = useState(() => parseNumberOrDefault(searchParams.get('maxPrice'), defaults.maxPrice))
  const [sortKey, setSortKey] = useState(() => searchParams.get('sortBy') || defaults.sortKey)
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>(() => searchParams.get('order') === 'asc' ? 'asc' : 'desc')
  const [page, setPage] = useState(() => parseNumberOrDefault(searchParams.get('page'), defaults.page))
  const [pageSize, setPageSize] = useState<typeof PAGE_SIZE_OPTIONS[number]>(() => {
    const val = searchParams.get('pageSize')
    if (val === 'All') return 'All'
    const n = Number(val)
    return PAGE_SIZE_OPTIONS.includes(n as 10 | 20 | 50 | 100) ? (n as typeof PAGE_SIZE_OPTIONS[number]) : defaults.pageSize
  })

  // Update URL on state change
  useEffect(() => {
    setSearchParams({
      minMarketCap: String(minMarketCap),
      maxPrice: String(maxPrice === Infinity ? '' : maxPrice),
      sortBy: sortKey,
      order: sortDir,
      page: String(page),
      pageSize: String(pageSize),
    })
    // eslint-disable-next-line
  }, [minMarketCap, maxPrice, sortKey, sortDir, page, pageSize])

  // Reset all filters to default values
  function resetFilters() {
    setMinMarketCap(defaults.minMarketCap)
    setMaxPrice(defaults.maxPrice)
    setSortKey(defaults.sortKey)
    setSortDir(defaults.sortDir)
    setPage(defaults.page)
    setPageSize(defaults.pageSize)
  }

  return {
    minMarketCap, setMinMarketCap,
    maxPrice, setMaxPrice,
    sortKey, setSortKey,
    sortDir, setSortDir,
    page, setPage,
    pageSize, setPageSize,
    resetFilters,
  }
} 