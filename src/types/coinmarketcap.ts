// Type for a single cryptocurrency (simplified)
export interface CryptoCurrency {
  id: number
  name: string
  symbol: string
  slug: string
  cmc_rank: number
  quote: {
    USD: {
      price: number
      percent_change_24h: number
      market_cap: number
    }
  }
}

// Type for the API response
export interface CoinMarketCapResponse {
  data: CryptoCurrency[]
}
