import axios from 'axios';
import { RatesResponse } from './Models/Rates';

const HTTPRequest = axios.create({
  baseURL: 'https://openexchangerates.org/api/latest.json',
  headers: {
    'Content-Type': 'application/json',
  },
});

export const fetchCurrencyRates = async () => {
  const response = await HTTPRequest.get<RatesResponse>('', {
    params: {
      app_id: '501f46f9f3c541b7896d08b8710b3df4',
    },
  });
  return response.data;
};
