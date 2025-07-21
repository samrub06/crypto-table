import { useCallback } from 'react'
import { exportToCSV, formatShortNumber } from '../libs/utils'
import type { CryptoTableProps } from '../types/cryptoTable'

const columns = [
  { key: 'name', label: 'Name', className: 'w-48 text-left' },
  { key: 'price', label: 'Price (USD)', className: 'w-40 text-right' },
  { key: 'market_cap', label: 'Market Cap', className: 'w-48 text-right' },
  { key: 'percent_change_24h', label: '24h % Change', className: 'w-40 text-right' },
]

const CryptoTable = ({ data, sortKey, sortDir, onSortChange, logos, pageSize, setPage,  page, loading }: CryptoTableProps) => {
  // Export CSV handler
  const handleExport = useCallback(() => {
    exportToCSV(
      data.map(crypto => ({
        name: `${crypto.name} (${crypto.symbol})`,
        price: crypto.quote.USD.price.toFixed(2),
        market_cap: formatShortNumber(crypto.quote.USD.market_cap),
        percent_change_24h: `${crypto.quote.USD.percent_change_24h > 0 ? '+' : crypto.quote.USD.percent_change_24h < 0 ? '-' : ''}${Math.abs(crypto.quote.USD.percent_change_24h).toFixed(2)}%`
      })),
      columns,
      'cryptos.csv'
    )
  }, [data])


  return (
    <div className="overflow-x-auto">
      <div className="flex justify-end mb-2">
        <button
          className="px-3 py-1 rounded border bg-blue-500 text-white hover:bg-blue-600 text-sm"
          onClick={handleExport}
          disabled={data.length === 0}
        >
          Export CSV
        </button>
      </div>
      <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow table-fixed">
        <thead>
          <tr className="bg-gray-100">
            {columns.map(col => (
              <th
                key={col.key}
                className={`py-2 px-4 border-b cursor-pointer select-none ${col.className} ${sortKey === col.key ? 'bg-blue-50' : ''}`}
                onClick={() => onSortChange && onSortChange(col.key)}
              >
                {col.label}
                {sortKey === col.key && (
                  <span className="ml-1">{sortDir === 'asc' ? '▲' : '▼'}</span>
                )}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.length === 0 && !loading ? (
            <tr>
              <td colSpan={columns.length} className="py-8 text-center text-gray-500 text-lg">No result</td>
            </tr>
          ) : (
            data.map((crypto) => (
              <tr key={crypto.id} className="hover:bg-gray-50">
                <td className="py-2 px-4 border-b font-medium w-48">
                  {logos && logos[crypto.id]?.logo && (
                    <img src={logos[crypto.id].logo} alt={crypto.symbol} className="inline-block w-6 h-6 mr-2 align-middle" loading="lazy" />
                  )}
                  <span className="font-bold mr-2">{crypto.symbol}</span>{crypto.name}
                </td>
                <td className="py-2 px-4 border-b text-right w-40">
                  <div className="font-bold">{crypto.quote.USD.price.toFixed(2)}</div>
                  <div className="text-xs text-gray-500">${crypto.quote.USD.price.toLocaleString(undefined, { maximumFractionDigits: 2 })}</div>
                </td>
                <td className="py-2 px-4 border-b text-right w-48">
                  <div>${formatShortNumber(crypto.quote.USD.market_cap)}</div>
                </td>
                <td className="py-2 px-4 border-b text-right w-40">
                  <span className={
                    crypto.quote.USD.percent_change_24h > 0
                      ? 'text-green-600 font-semibold'
                      : crypto.quote.USD.percent_change_24h < 0
                      ? 'text-red-600 font-semibold'
                      : ''
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
              <td colSpan={columns.length} className="py-4 text-center">
                <span className="text-blue-500">Loading...</span>
              </td>
            </tr>
          )}
        </tbody>
      </table>
      {pageSize !== 'All' && (
        <div className="flex justify-center items-center gap-2 mt-4">
          <button
            className="px-3 py-1 rounded border bg-gray-100 hover:bg-gray-200 disabled:opacity-50"
            onClick={() => setPage(page - 1)}
            disabled={page === 1}
          >
            Previous
          </button>
       
          <button
            className="px-3 py-1 rounded border bg-gray-100 hover:bg-gray-200 disabled:opacity-50"
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