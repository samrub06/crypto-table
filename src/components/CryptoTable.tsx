import { formatShortNumber } from '../libs/utils'
import type { CryptoTableProps } from '../types/cryptoTable'

const columns = [
  { key: 'name', label: 'Name', className: 'w-56 text-left' },
  { key: 'price', label: 'Price (USD)', className: 'w-40 text-right' },
  { key: 'market_cap', label: 'Market Cap', className: 'w-48 text-right' },
  { key: 'percent_change_24h', label: '24h % Change', className: 'w-40 text-right' },
]

const CryptoTable = ({ data, sortKey, sortDir, onSortChange, logos, pageSize, setPage,  page, loading }: CryptoTableProps) => {


  return (
    <div className="overflow-x-auto bg-white p-0 border border-gray-200">
      <table className="min-w-full bg-white border border-gray-200 table-fixed text-sm" role="table" aria-label="Cryptocurrency data table">
        <caption className="sr-only">Latest cryptocurrency listings with filters and sorting</caption>
        <thead>
          <tr className="bg-gray-50 border-b border-gray-200">
            {columns.map(col => (
              <th
                key={col.key}
                className={`py-1.5 px-2 text-gray-700 font-medium border-r border-gray-100 last:border-r-0 ${col.className} ${sortKey === col.key ? 'bg-blue-50' : ''}`}
                onClick={() => onSortChange && onSortChange(col.key)}
                style={{ cursor: 'pointer', fontWeight: 500 }}
                aria-sort={sortKey === col.key ? (sortDir === 'asc' ? 'ascending' : 'descending') : 'none'}
                scope="col"
                tabIndex={0}
                aria-label={`Sort by ${col.label}`}
                onKeyDown={e => (e.key === 'Enter' || e.key === ' ') && onSortChange && onSortChange(col.key)}
              >
                {col.label}
                {sortKey === col.key && (
                  <span className="ml-1 text-blue-500" aria-hidden="true">{sortDir === 'asc' ? '\u25b2' : '\u25bc'}</span>
                )}
              </th>
            ))}
          </tr>
        </thead>
        <tbody aria-live="polite">
          {data.length === 0 && !loading ? (
            <tr>
              <td colSpan={columns.length} className="py-6 text-center text-gray-400 bg-white border-b border-gray-100">No result</td>
            </tr>
          ) : (
            data.map((crypto) => (
              <tr key={crypto.id} className="border-b border-gray-100 bg-white"> 
                <td className="py-1.5 px-2 font-medium w-56 flex items-center gap-1 border-r border-gray-100 last:border-r-0">
                  {logos && logos[crypto.id]?.logo && (
                    <img src={logos[crypto.id].logo} alt={crypto.symbol} className="inline-block w-5 h-5 rounded-full mr-1 align-middle bg-white" loading="lazy" />
                  )}
                  <span className="font-bold mr-1 text-blue-700">{crypto.symbol}</span>
                  <span className="text-gray-700 truncate max-w-[180px]">{crypto.name}</span>
                </td>
                <td className="py-1.5 px-2 text-right w-40 border-r border-gray-100 last:border-r-0">
                  <div className="font-semibold text-gray-800">{crypto.quote.USD.price.toFixed(2)}</div>
                  <div className="text-xs text-gray-400">${crypto.quote.USD.price.toLocaleString(undefined, { maximumFractionDigits: 2 })}</div>
                </td>
                <td className="py-1.5 px-2 text-right w-48 border-r border-gray-100 last:border-r-0">
                  <div className="text-gray-700">${formatShortNumber(crypto.quote.USD.market_cap)}</div>
                </td>
                <td className="py-1.5 px-2 text-right w-40">
                  <span className={
                    crypto.quote.USD.percent_change_24h > 0
                      ? 'text-green-500 font-semibold'
                      : crypto.quote.USD.percent_change_24h < 0
                      ? 'text-red-500 font-semibold'
                      : 'text-gray-500'
                  }>
                    {crypto.quote.USD.percent_change_24h > 0 ? '+' : crypto.quote.USD.percent_change_24h < 0 ? '-' : ''}
                    {Math.abs(crypto.quote.USD.percent_change_24h).toFixed(2)}%
                  </span>
                </td>
              </tr>
            ))
          )}
          {loading && (
            <tr>
              <td colSpan={columns.length} className="py-4 text-center bg-white border-b border-gray-100">
                <span className="text-blue-400">Loading...</span>
              </td>
            </tr>
          )}
        </tbody>
      </table>
      {pageSize !== 'All' && (
        <div className="flex justify-center items-center gap-3 mt-4">
          <button
            className="px-3 py-1 rounded bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold transition disabled:opacity-50"
            onClick={() => setPage(page - 1)}
            disabled={page === 1}
          >
            Previous
          </button>
          <button
            className="px-3 py-1 rounded bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold transition disabled:opacity-50"
            onClick={() => setPage(page + 1)}
          >
            Next
          </button>
        </div>
      )}
    </div>
  )
}

export default CryptoTable 