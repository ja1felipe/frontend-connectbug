import BaseRequestService from '@/shared/services/base.service';
import axios from 'axios';

export type LoginResponseType = {
  access_token: string;
};

export class AuthService extends BaseRequestService {
  login(email: string, password: string) {
    return this.request().post<LoginResponseType>('login', {
      email,
      password,
    });
  }
}
