import axios, { AxiosRequestConfig } from "axios";

const instance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const customRequest = <T>(config: AxiosRequestConfig) => {
  const { headers, ...axiosConfig } = config;

  return instance.request<T>({
    ...axiosConfig,
    headers: {
      "Content-Type": "application/json", // デフォルトのContent-Type
      ...headers, // 呼び出し元が指定したヘッダーで上書き
    },
  });
};

export default instance;
