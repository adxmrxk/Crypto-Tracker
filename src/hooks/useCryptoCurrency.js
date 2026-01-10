import { useQuery, keepPreviousData } from "@tanstack/react-query";
import APIClient from "../services/crypto-prices-api-client";

const apiClient = new APIClient("/coins/markets");

const useCryptoCurrency = (ids = []) => {
  const perPage = ids.length > 0 ? ids.length : 200;

  return useQuery({
    queryKey: ["cryptocurrencies", perPage, ids.slice().sort().join(",")],
    queryFn: () =>
      apiClient.getAll({
        params: {
          vs_currency: "usd",
          order: "market_cap_desc",
          per_page: perPage,
          price_change_percentage: "1h,24h,7d",
          ...(ids.length > 0 ? { ids: ids.join(",") } : {}),
        },
      }),
    refetchInterval: 60000,
    staleTime: 30000,
    placeholderData: keepPreviousData, // Keep old data visible while fetching new data
  });
};

export default useCryptoCurrency;
