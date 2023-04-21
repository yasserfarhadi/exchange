import Combo from '../components/Combo';
import Input from '../components/Input';
import { currencyPrefix } from '../utilities';
import {
  ComboOption,
  CompoChangeType,
  usePropsCollector,
} from './selectorReducer';
import SwapSVG from '../assets/swapSVG';

const comboOptions: ComboOption[] = [
  { value: 'USD', label: 'USD' },
  { value: 'EUR', label: 'EUR' },
  { value: 'GBP', label: 'GBP' },
];

const Exchange = () => {
  const {
    state,
    wallet,
    exchangeHandler,
    swapHandler,
    comboChangeHandler,
    inputChangeHandler,
    // isLoading,
    // isError,
    base,
  } = usePropsCollector();

  return (
    <div className="exchange">
      <div className="exchange__wrapper">
        <div className="exchange__row">
          <Combo
            className="exchange__combo"
            value={state.from}
            options={comboOptions}
            handleChange={(item) =>
              comboChangeHandler(item as ComboOption, CompoChangeType.FROM)
            }
          />
          <Input
            className={`exchange__input${
              state.inputError &&
              state.inputTouched &&
              state.inputValue > wallet[state.from] &&
              ' exchange__input--error'
            }`}
            value={state.inputValue}
            changeHandler={inputChangeHandler}
          />
        </div>
        <div className="exchange__row">
          {state.from && (
            <p className="exchange__current-amout">
              {currencyPrefix(state.from)}
              {wallet[state.from]}
            </p>
          )}
          {state.inputError && (
            <p className="exchange__error-message">{state.inputError}</p>
          )}
        </div>
      </div>

      <div className="exchange__wrapper">
        <div className="exchange__row">
          <Combo
            className="exchange__combo"
            key={state.to === '' ? Math.random() : 1}
            value={state.to}
            options={comboOptions.filter((item) => item.value !== state.from)}
            handleChange={(item) =>
              comboChangeHandler(item as ComboOption, CompoChangeType.TO)
            }
          />
          {state.inputValue > 0 && base && (
            <p className="exchange__final-conversion">
              {currencyPrefix(state.to)}
              {(state.inputValue * base).toFixed(2)}
            </p>
          )}
        </div>
        {state.to && (
          <p className="exchange__current-amout">
            {currencyPrefix(state.to)}
            {wallet[state.to]}
          </p>
        )}
        {base && (
          <div className="exchange__base-conversion">
            <h4>
              {currencyPrefix(state.from)}1 = {base.toFixed(6)}
              {currencyPrefix(state.to)}
            </h4>
          </div>
        )}
      </div>

      <button
        className="exchange__submit"
        disabled={!state.to || !state.from || !state.inputValue}
        onClick={exchangeHandler}
      >
        Exchange
      </button>
      <button
        className="exchange__swap"
        disabled={!state.to || !state.from}
        onClick={swapHandler}
      >
        <SwapSVG />
      </button>
    </div>
  );
};

export default Exchange;
