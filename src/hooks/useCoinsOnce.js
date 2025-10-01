import { useQuery } from "@tanstack/react-query";
import APIClient from "../services/crypto-prices-api-client";



const apiClient = new APIClient("/coins/markets?vs_currency=usd");

const useCoinsOnce = () => {
  return useQuery({
    queryKey: ["coinlist"],
    queryFn: () => apiClient.getAll(),
    staleTime: Infinity,
    cacheTime: Infinity
  });
};

export default useCoinsOnce;
