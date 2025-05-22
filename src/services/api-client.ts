import axios, { AxiosRequestConfig } from "axios";

const axiosInstance = axios.create({
  baseURL: "https://682e10ed746f8ca4a47bc516.mockapi.io/api/v1",
});

class APIClient<T> {
  endpoint: string;

  constructor(endpoint: string) {
    this.endpoint = endpoint;
  }

  getAll = (config?: AxiosRequestConfig) =>
    axiosInstance.get<T[]>(this.endpoint, config).then((res) => res.data);

  post = <TData>(data: TData) =>
    axiosInstance.post<T>(this.endpoint, data).then((res) => res.data);

  get = (id: string) =>
    axiosInstance.get<T>(this.endpoint + "/" + id).then((res) => res.data);

  delete = (id: string) =>
    axiosInstance.delete<T>(this.endpoint + "/" + id).then((res) => res.data);

  checkExists = (field: string, value: string) =>
    axiosInstance
      .get<T[]>(`${this.endpoint}?${field}=${value}`)
      .then((res) => res.data.length > 0);
}

export default APIClient;
