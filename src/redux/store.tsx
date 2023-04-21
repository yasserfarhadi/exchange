import React from 'react';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import exchangeSReducer from './features/exchangeSlice';

const store = configureStore({
  reducer: {
    wallet: exchangeSReducer,
  },
});

export const ReduxProvider: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  return <Provider store={store}>{children}</Provider>;
};

export type AppStore = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
