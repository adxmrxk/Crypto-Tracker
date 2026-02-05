import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const fetchCryptoNews = async () => {
  // Using CryptoCompare's free news API
  const response = await axios.get(
    "https://min-api.cryptocompare.com/data/v2/news/?lang=EN&sortOrder=popular"
  );
  return response.data.Data || [];
};

const useCryptoNews = () => {
  return useQuery({
    queryKey: ["cryptoNews"],
    queryFn: fetchCryptoNews,
    staleTime: 5 * 60 * 1000, // 5 minutes
    refetchInterval: 5 * 60 * 1000, // Refetch every 5 minutes
    retry: 2,
  });
};

export default useCryptoNews;
