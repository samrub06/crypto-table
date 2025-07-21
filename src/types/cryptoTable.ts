// Interface for CryptoTable component props
import type { CryptoCurrency } from './coinmarketcap'

export interface CryptoTableProps {
  data: CryptoCurrency[]
  sortKey?: string
  sortDir?: 'asc' | 'desc'
  onSortChange?: (key: string) => void
  logos?: Record<string, { logo: string }>
  pageSize: string | number
  setPage: (page: number) => void
  page: number
  loading?: boolean // Show loading spinner/row
} 