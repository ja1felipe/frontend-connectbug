import axios, { AxiosInstance } from 'axios';

export default class BaseRequestService {
  request(): AxiosInstance {
    console.log(process.env.BASE_URL);
    return axios.create({
      baseURL: process.env.BASE_URL!,
    });
  }
}
