import { useQuery } from "@tanstack/react-query";
import APIClient from "../services/crypto-prices-api-client";



const apiClient = new APIClient("/coins/markets?vs_currency=usd");

const useCoinsOnce = () => {
  return useQuery({
    queryKey: ["coinlist"],
    queryFn: () => apiClient.getAll(),
    staleTime: 300000,
    cacheTime: Infinity,
    refetchInterval: 300000, // 5 minutes (5 * 60 * 1000)
  });
};

export default useCoinsOnce;
