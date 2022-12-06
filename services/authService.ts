import axios from 'axios';

export type LoginResponseType = {
  access_token: string;
};

export class AuthService {
  login(email: string, password: string) {
    return axios.post<LoginResponseType>(process.env.BASE_URL!, {
      email,
      password,
    });
  }
}
