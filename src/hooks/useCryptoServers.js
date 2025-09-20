import { useQuery } from "@tanstack/react-query";
import APIClient from "../services/crypto-prices-api-client";



const apiClient = new APIClient("/coins/markets?vs_currency=usd");

const useCryptoServers = (ids = []) => {
  return useQuery({
    queryKey: ["cryptocurrencies", ids],
    queryFn: () =>
      apiClient.getAll({
        params: {
          vs_currency: "usd",
          order: "market_cap_desc", 
          ...(ids.length > 0 ? { ids: ids.join(",") } : {}),
        },
      }),
    refetchInterval: 60000
  });
};

export default useCryptoServers;
