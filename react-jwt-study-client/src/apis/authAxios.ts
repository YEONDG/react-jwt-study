import axios, { AxiosError } from 'axios';
import { getNewRefreshToken } from './refresh';

export const getAuthAxios = (token: string) => {
  const authAxios = axios.create({
    baseURL: 'http://localhost:5000',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  authAxios.interceptors.response.use(
    (response) => response,
    async (error) => {
      if (
        error instanceof AxiosError &&
        error.response?.status === 401 &&
        error.config?.headers
      ) {
        const newAccessToken = await getNewRefreshToken();
        error.config.headers['Authorization'] = `Bearer ${newAccessToken}`;
        const result = await axios.request(error.config);
        return result.data;
      }
      return Promise.reject(error);
    }
  );
  return authAxios;
};
