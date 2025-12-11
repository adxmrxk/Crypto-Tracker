import { useQuery } from "@tanstack/react-query";
import APIClient from "../services/crypto-prices-api-client";

const useMultiHistorical = (ids, from_date, to_date) => {
  return useQuery({
    queryKey: ["multi-crypto", ids, from_date, to_date],
    queryFn: async () => {
      return Promise.all(
        ids.map((id) =>
          new APIClient(`coins/${id}/market_chart/range`).getAll({
            params: { vs_currency: "usd", from: from_date, to: to_date },
          })
        )
      );
    },
  });
};

export default useMultiHistorical;
