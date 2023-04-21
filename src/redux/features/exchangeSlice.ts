import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

type InitialState = {
  [key: string]: number;
};
interface ExchangePayload {
  from: string;
  fromValue: number;
  to: string;
  toValue: number;
}

const initialState: InitialState = {
  USD: 1000,
  EUR: 1000,
  GBP: 1000,
};

const exchangeSlice = createSlice({
  name: 'exchange',
  initialState,
  reducers: {
    exchange: (state, action: PayloadAction<ExchangePayload>) => {
      if (state[action.payload.from]) {
        state[action.payload.from] =
          state[action.payload.from] - action.payload.fromValue;
      }
      state[action.payload.to] =
        state[action.payload.to] + action.payload.toValue;
    },
  },
});

export default exchangeSlice.reducer;
export const { exchange } = exchangeSlice.actions;
