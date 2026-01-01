export function volatilityToRiskScore(annualVol) {
  const MAX_VOL = 0.4; // 40% = very risky crypto portfolio

  const score = (annualVol / MAX_VOL) * 10;

  return Math.min(+score.toFixed(1), 10);
}
