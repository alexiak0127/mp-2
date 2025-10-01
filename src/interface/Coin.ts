export interface UsdQuote {
  price: number;
  market_cap: number;
  percent_change_24h: number;
}

export interface CoinTicker {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  quotes: {
    USD: UsdQuote;
  };
}
