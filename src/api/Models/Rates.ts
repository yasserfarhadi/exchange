export interface RatesResponse {
  disclaimer: string;
  license: string;
  timestamp: number;
  base: string;
  rates: Rates;
}

export interface Rates {
  [key: string]: number;
}
