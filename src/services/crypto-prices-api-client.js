import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://cors-anywhere.herokuapp.com/https://api.coingecko.com/api/v3/",
});

class APIClient {
  constructor(endpoint) {
    this.endpoint = endpoint;
  }

  getAll = async (config) => {
    const res = await axiosInstance.get(this.endpoint, config);
    return res.data;
  };

  get = async (id) => {
    const res = await axiosInstance.get(`${this.endpoint}/${id}`);
    return res.data;
  };
}

export default APIClient;
