export function calculatePortfolioVolatility(assets) {
  const days = assets[0].returns.length;

  const portfolioReturns = [];

  for (let i = 0; i < days; i++) {
    let dailyReturn = 0;

    for (const asset of assets) {
      dailyReturn += asset.weight * asset.returns[i];
    }

    portfolioReturns.push(dailyReturn);
  }

  const mean =
    portfolioReturns.reduce((a, b) => a + b, 0) / portfolioReturns.length;

  const variance =
    portfolioReturns.reduce((sum, r) => sum + (r - mean) ** 2, 0) /
    portfolioReturns.length;

  const dailyVol = Math.sqrt(variance);

  return dailyVol * Math.sqrt(252); // annualized
}
