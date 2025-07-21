import { useEffect, useRef, useState } from "react"
import { useCoinLogos, useCoinMarketCap } from "../api/coinmarketcap"
import CryptoFilters from "../components/CryptoFilters"
import CryptoTable from "../components/CryptoTable"
import useDebounce from "../hooks/useDebounce"
import useFilterStateWithUrl from "../hooks/useFilterStateWithUrl"
import useInfiniteScroll from '../hooks/useInfiniteScroll'
import { DEFAULT_MAX_PRICE, DEFAULT_MIN_MARKET_CAP, DEFAULT_PAGE, DEFAULT_PAGE_SIZE, DEFAULT_SORT_DIR, DEFAULT_SORT_KEY, INFINITE_SCROLL_LIMIT } from "../libs/constants"
import { exportToCSV, formatShortNumber } from "../libs/utils"
import type { CryptoCurrency } from "../types/coinmarketcap"

const CryptoPage = () => {
  // Use the custom hook to manage filter state and URL sync
  const {
    minMarketCap, setMinMarketCap,
    maxPrice, setMaxPrice,
    sortKey, setSortKey,
    sortDir, setSortDir,
    page, setPage,
    pageSize, setPageSize,
    resetFilters,
  } = useFilterStateWithUrl({
    minMarketCap: DEFAULT_MIN_MARKET_CAP,
    maxPrice: DEFAULT_MAX_PRICE,
    sortKey: DEFAULT_SORT_KEY,
    sortDir: DEFAULT_SORT_DIR,
    page: DEFAULT_PAGE  ,
    pageSize: DEFAULT_PAGE_SIZE,
  })

  // Debounced values
  const debouncedMinMarketCap = useDebounce(minMarketCap, 300)
  const debouncedMaxPrice = useDebounce(maxPrice, 300)
  // Sorting handler: update global sortKey/sortDir
  const onSortChange = (key: string) => {
    if (sortKey === key) setSortDir(sortDir === 'asc' ? 'desc' : 'asc')
    else {
      setSortKey(key)
      setSortDir('desc')
    }
  }

  // Compute server-side pagination params
  // CoinMarketCap API: start is 1-based, limit is max 5000
  const limit = pageSize === 'All' ? INFINITE_SCROLL_LIMIT : pageSize
  const start = pageSize === 'All'
    ? ((page - 1) * INFINITE_SCROLL_LIMIT) + 1
    : ((page - 1) * (pageSize as number)) + 1

  const { data, error, isFetching } = useCoinMarketCap({
    price_max: debouncedMaxPrice,
    market_cap_min: debouncedMinMarketCap,
    sort: sortKey,
    sort_dir: sortDir,
    start,
    limit,
  })

  // Get all IDs of displayed cryptos
  const allIds = data?.data ? data.data.map(c => c.id) : []
  // Get logos for all displayed cryptos
  const { data: logos } = useCoinLogos(allIds)

  // Local state to accumulate all data for infinite scroll
  const [allData, setAllData] = useState<CryptoCurrency[]>([])
  // To track last filter state for reset
  const lastFilterRef = useRef({ minMarketCap, maxPrice, sortKey, sortDir })

  // When new data arrives in 'All' mode, append to allData
  useEffect(() => {
    if (pageSize === 'All' && data?.data) {
      setAllData(prev => {
        // Avoid duplicates by id
        const ids = new Set(prev.map(c => c.id))
        const newItems = data.data.filter(c => !ids.has(c.id))
        return [...prev, ...newItems]
      })
    }
  }, [data, pageSize])

  // Reset allData if filters change (except page)
  useEffect(() => {
    const last = lastFilterRef.current
    if (
      last.minMarketCap !== minMarketCap ||
      last.maxPrice !== maxPrice ||
      last.sortKey !== sortKey ||
      last.sortDir !== sortDir ||
      pageSize !== 'All'
    ) {
      setAllData([])
    }
    lastFilterRef.current = { minMarketCap, maxPrice, sortKey, sortDir }
  }, [minMarketCap, maxPrice, sortKey, sortDir, pageSize])

  // Use allData for infinite scroll, else use paged data
  const pagedData = pageSize === 'All' ? allData : (data?.data || [])

  // Infinite scroll for 'All' mode
  useInfiniteScroll(
    () => {
      if (!isFetching) setPage(page + 1)
    },
    pageSize === 'All'
  )

  // Export CSV handler (moved from CryptoTable)
  const handleExport = () => {
    exportToCSV(
      pagedData.map(crypto => ({
        name: `${crypto.name} (${crypto.symbol})`,
        price: crypto.quote.USD.price.toFixed(2),
        market_cap: formatShortNumber(crypto.quote.USD.market_cap),
        percent_change_24h: `${crypto.quote.USD.percent_change_24h > 0 ? '+' : crypto.quote.USD.percent_change_24h < 0 ? '-' : ''}${Math.abs(crypto.quote.USD.percent_change_24h).toFixed(2)}%`
      })),
      [
        { key: 'name', label: 'Name' },
        { key: 'price', label: 'Price (USD)' },
        { key: 'market_cap', label: 'Market Cap' },
        { key: 'percent_change_24h', label: '24h % Change' },
      ],
      'cryptos.csv'
    )
  }

  if (error) return <div className="text-center mt-8 text-red-500">Error: {error.message}</div>
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100 p-6">
      <h1 className="text-3xl font-extrabold mb-8 text-center text-blue-700 tracking-tight drop-shadow">Latest Cryptocurrency Listings</h1>
      <CryptoFilters
        minMarketCap={minMarketCap}
        maxPrice={maxPrice}
        sortKey={sortKey}
        sortDir={sortDir}
        pageSize={pageSize}
        onMinMarketCapChange={setMinMarketCap}
        onMaxPriceChange={setMaxPrice}
        onSortKeyChange={setSortKey}
        onSortDirChange={setSortDir}
        onPageSizeChange={setPageSize}
        onReset={resetFilters}
      />
      <div className="flex justify-between items-center mb-4">
      <div className="flex justify-end ">
         <button
          className="px-4 py-2 rounded-lg bg-gradient-to-r from-blue-500 to-blue-400 text-white font-semibold shadow hover:from-blue-600 hover:to-blue-500 transition text-sm border-0 disabled:opacity-50"
          onClick={handleExport}
          disabled={pagedData.length === 0}
        >
          Export CSV
        </button>
      </div>
      <div className="text-right text-xs text-gray-400 font-semibold">
        {pageSize !== 'All' && (
          <span>Page <span className="font-bold text-blue-600">{page}</span></span>
        )}
      </div>
  
      </div>
      <CryptoTable
        data={pagedData}
        sortKey={sortKey}
        sortDir={sortDir}
        onSortChange={onSortChange}
        logos={logos}
        pageSize={pageSize}
        page={page}
        setPage={setPage}
        loading={isFetching}
      />
    </div>
  )
}

export default CryptoPage
