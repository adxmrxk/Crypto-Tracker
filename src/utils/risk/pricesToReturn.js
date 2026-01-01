export function pricesToReturns(prices) {
  const returns = [];

  for (let i = 1; i < prices.length; i++) {
    const today = prices[i][1];
    const yesterday = prices[i - 1][1];

    returns.push((today - yesterday) / yesterday);
  }

  return returns;
}
