import useMultiHistoricCryptoData from "./useMultiHistoricCryptoData";
import { pricesToReturns } from "../utils/risk/pricesToReturn";
import { calculatePortfolioVolatility } from "../utils/risk/portfolioVolatility";
import { volatilityToRiskScore } from "../utils/risk/volatilityToRiskScore";

export default function usePortfolioRisk(watchList) {
  if (!watchList || watchList.length === 0) return null;

  // 1️⃣ coin ids for API
  const ids = watchList.map((c) => c.coin);

  // 2️⃣ date range (last 30 days)
  const to = Math.floor(Date.now() / 1000);
  const from = to - 60 * 60 * 24 * 30;

  // 3️⃣ fetch historical prices
  const { data, isLoading, isError } = useMultiHistoricCryptoData(
    ids,
    from,
    to
  );

  if (isLoading || isError || !data) return null;

  // 4️⃣ portfolio weights
  const totalValue = watchList.reduce((sum, c) => sum + c.amount, 0);

  const assets = data.map((res, i) => ({
    weight: watchList[i].amount / totalValue,
    returns: pricesToReturns(res.prices),
  }));

  // 5️⃣ calculations
  const annualVol = calculatePortfolioVolatility(assets);
  const riskScore = volatilityToRiskScore(annualVol);

  return {
    volatility: +(annualVol * 100).toFixed(2),
    riskScore,
  };
}
