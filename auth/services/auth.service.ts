import { LoginResponseType } from '@/auth/types';
import BaseRequestService from '@/shared/services/base.service';

export class AuthService extends BaseRequestService {
  login(email: string, password: string) {
    return this.request().post<LoginResponseType>('login', {
      email,
      password,
    });
  }
}
