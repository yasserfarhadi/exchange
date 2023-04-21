import React from 'react';
import { clone } from '../utilities';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { useQuery } from 'react-query';
import { fetchCurrencyRates } from '../api';
import { exchange } from '../redux/features/exchangeSlice';

enum ActionTypes {
  INPUT_CHANGE = 'INPUT_CHANGE',
  CURRENCY_FROM = 'CURRENCY_FROM',
  CURRENCY_TO = 'CURRENCY_TO',
  VALIDATATION_ERROR = 'VALIDATATION_ERROR',
  RESET = 'RESET',
}
export enum CompoChangeType {
  FROM = 'FROM',
  TO = 'TO',
}

export type ComboOption = {
  value: string;
  label: string;
};

interface Action {
  type: ActionTypes;
  payload?: string | number;
}

interface InitialState {
  from: string;
  to: string;
  inputValue: number;
  inputTouched: boolean;
  inputError: string;
}

const initialState: InitialState = {
  from: '',
  to: '',
  inputValue: 0,
  inputTouched: false,
  inputError: '',
};

export const reducer = (state: InitialState, action: Action): InitialState => {
  switch (action.type) {
    case ActionTypes.CURRENCY_FROM:
      return clone(state, (clonedState) => {
        if (typeof action.payload === 'string' && action.payload) {
          clonedState.from = action.payload;
          if (state.to === action.payload) clonedState.to = '';
        }
      });
    case ActionTypes.CURRENCY_TO:
      return clone(state, (clonedState) => {
        if (typeof action.payload === 'string' && action.payload) {
          clonedState.to = action.payload;
        }
      });
    case ActionTypes.INPUT_CHANGE:
      return clone(state, (clonedState) => {
        if (typeof action.payload === 'number' && action.payload >= 0) {
          if (!clonedState.inputTouched) clonedState.inputTouched = true;
          if (clonedState.inputError) clonedState.inputError = '';
          clonedState.inputValue = +action.payload.toFixed(2);
        }
      });

    case ActionTypes.VALIDATATION_ERROR:
      return clone(state, (clonedState) => {
        clonedState.inputError = 'Insufficient Balance';
      });
    case ActionTypes.RESET:
      return clone(state, (clonedState) => {
        clonedState.inputValue = 0;
        if (clonedState.inputError) clonedState.inputError = '';
      });
    default:
      return state;
  }
};

export const usePropsCollector = () => {
  const [state, dispatch] = React.useReducer(reducer, initialState);
  const wallet = useAppSelector((state) => state.wallet);
  const reduxDispatch = useAppDispatch();
  const {
    data,
    //  isLoading,
    //  isError
  } = useQuery('latest-currency-values', fetchCurrencyRates, {
    refetchInterval: 5000,
  });
  const base =
    data &&
    state.from &&
    state.to &&
    (1 / data.rates[state.from]) * data.rates[state.to];

  function exchangeHandler() {
    if (base) {
      if (state.inputValue < wallet[state.from]) {
        const payload = {
          from: state.from,
          fromValue: state.inputValue,
          to: state.to,
          toValue: +(state.inputValue * base).toFixed(2),
        };
        reduxDispatch(exchange(payload));
        dispatch({ type: ActionTypes.RESET });
      } else {
        dispatch({ type: ActionTypes.VALIDATATION_ERROR });
      }
    }
  }

  function swapHandler() {
    const from = state.from;
    const to = state.to;
    dispatch({ type: ActionTypes.CURRENCY_FROM, payload: to });
    dispatch({ type: ActionTypes.CURRENCY_TO, payload: from });
  }

  function comboChangeHandler(item: ComboOption, type: CompoChangeType) {
    if (item?.value) {
      if (type === CompoChangeType.TO) {
        dispatch({ type: ActionTypes.CURRENCY_TO, payload: item.value });
      }

      if (type === CompoChangeType.FROM) {
        dispatch({ type: ActionTypes.CURRENCY_FROM, payload: item.value });
      }
    }
  }

  const inputChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({
      type: ActionTypes.INPUT_CHANGE,
      payload: +event.target.value,
    });
  };

  return {
    data,
    state,
    wallet,
    exchangeHandler,
    swapHandler,
    comboChangeHandler,
    inputChangeHandler,
    // isLoading,
    // isError,
    base,
  };
};

// export const useExchangeSelector = () =>
