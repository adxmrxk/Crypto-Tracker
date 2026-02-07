import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const fetchCryptoNews = async () => {
  // Using CryptoCompare's free news API
  // Using sortOrder=latest to get a wider range of articles over time
  // Not filtering by popularity allows for more variety in publish dates
  const response = await axios.get(
    "https://min-api.cryptocompare.com/data/v2/news/?lang=EN&sortOrder=latest"
  );
  return response.data.Data || [];
};

const useCryptoNews = () => {
  return useQuery({
    queryKey: ["cryptoNews"],
    queryFn: fetchCryptoNews,
    staleTime: 45 * 60 * 1000, // 45 minutes
    refetchInterval: 45 * 60 * 1000, // Refetch every 45 minutes
    retry: 2,
  });
};

export default useCryptoNews;
