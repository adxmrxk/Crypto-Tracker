import axios from 'axios';



const axiosInstance = axios.create({
  baseURL: 'https://data-api.coindesk.com',
  params: {
    key: 'b5b0f76ed9fc2dd6563cf3703d5361fe2202be3ab697157de36e7f7af642f90f'
  },
});

class APIClient {
  endpoint;

  constructor(endpoint) {
    this.endpoint = endpoint;
  }

  getAll = (config) => {
    return axiosInstance
      .get(this.endpoint, config)
      .then((res) => res.data);
  };

  get = (id) => {
    return axiosInstance
      .get<T>(this.endpoint + '/' + id)
      .then((res) => res.data);
  };
}

export default APIClient;