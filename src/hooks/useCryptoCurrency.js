import { useQuery } from "@tanstack/react-query";
import APIClient from "../services/crypto-prices-api-client";



const apiClient = new APIClient("/coins/markets?vs_currency=usd");

const useCryptoCurrency = () => {
  return useQuery({
    queryKey: ["cryptocurrencies"],
    queryFn: () =>
      apiClient.getAll({
        params: {
          vs_currency: "usd",
          order: "market_cap_desc",
          per_page: 10,
        },
      }),

    refetchInterval: 5 * 60 * 1000, // 5 minutes in milliseconds
  });
};

export default useCryptoCurrency;
