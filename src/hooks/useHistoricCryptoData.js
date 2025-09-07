import { useQuery } from "@tanstack/react-query";
import APIClient from "../services/crypto-prices-api-client";




const useHistoricalCryptoData = (id, from_date, to_date) => {
  const apiClient = new APIClient(`coins/${id}/market_chart/range`);
  return useQuery({
    queryKey: ["cryptocurrencies", id, from_date, to_date],
    queryFn: () =>
      apiClient.getAll({
        params: {
          vs_currency: "usd",
          from: from_date,
          to: to_date
        },
      }),
    refetchInterval: false,
    staleTime: 1000 * 60 * 60 * 24, //24 hours
    cacheTime: 1000 * 60 * 60 * 24 * 2,
    refetchOnWindowFocus: false,
    
  });
};

export default useHistoricalCryptoData;
