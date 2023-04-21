export function clone<T>(state: T, funcModifier: (clonedState: T) => void): T {
  const clonedState = JSON.parse(JSON.stringify(state));
  funcModifier.call(null, clonedState);
  return clonedState;
}

export function currencyPrefix(currency: string) {
  if (currency === 'USD') return '\u0024';
  if (currency === 'EUR') return '\u20AC';
  if (currency === 'GBP') return '\u00A3';
  return null;
}
