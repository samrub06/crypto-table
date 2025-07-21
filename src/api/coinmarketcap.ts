import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import type { CoinMarketCapResponse } from '../types/coinmarketcap'
const apiKey = import.meta.env.VITE_COINMARKETCAP_KEY


// Custom hook to fetch latest cryptocurrency listings
export function useCoinMarketCap(params?: {
  price_min?: number
  price_max?: number
  market_cap_min?: number
  market_cap_max?: number
  sort?: string
  sort_dir?: 'asc' | 'desc'
  start?: number // 1-based index for pagination
  limit?: number // number of results per page
  [key: string]: unknown
}) {
  return useQuery<CoinMarketCapResponse, Error>({
    queryKey: ['coinmarketcap', params],
    queryFn: async () => {
      const res = await axios.get('https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest', {
        headers: {
          'X-CMC_PRO_API_KEY': apiKey,
        },
        params: {
          price_min: params?.price_min,
          price_max: params?.price_max,
          market_cap_min: params?.market_cap_min,
          market_cap_max: params?.market_cap_max,
          sort: params?.sort ?? 'market_cap',
          sort_dir: params?.sort_dir ?? 'desc',
          convert: 'USD',
          // Add server-side pagination
          start: params?.start,
          limit: params?.limit,
        },
      })
      return res.data
    },
    staleTime: 1000 * 60, // 1 minute
    refetchOnWindowFocus: false,
  })
}

// Custom hook to fetch logos for a list of crypto IDs
export function useCoinLogos(ids: number[]) {
  const apiKey = import.meta.env.VITE_COINMARKETCAP_KEY
  return useQuery({
    queryKey: ['coinmarketcap-logos', ids.sort().join(',')],
    queryFn: async () => {
      if (!ids.length) return {}
      const res = await axios.get('https://pro-api.coinmarketcap.com/v1/cryptocurrency/info', {
        headers: {
          'X-CMC_PRO_API_KEY': apiKey,
        },
        params: {
          id: ids.join(','),
          aux: 'logo',
        },
      })
      // The API returns an object with id as key
      return res.data.data as Record<string, { logo: string }>
    },
    staleTime: 1000 * 60 * 60, // 1 hour
    enabled: ids.length > 0,
  })
} 