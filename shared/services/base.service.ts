import axios, { AxiosInstance } from 'axios';

export default class BaseRequestService {
  request(): AxiosInstance {
    const instance = axios.create({
      baseURL: process.env.BASE_URL!,
    });

    instance.interceptors.request.use((config) => {
      const token = localStorage.getItem('token');
      config.headers!.Authorization = token ? `Bearer ${token}` : '';
      return config;
    });

    return instance;
  }
}
