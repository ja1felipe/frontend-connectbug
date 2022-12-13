import BaseRequestService from '@/shared/services/base.service';
import { UserType } from '@/user/types';
import { AxiosResponse } from 'axios';

export class UserService extends BaseRequestService {
  getAll(): Promise<AxiosResponse<UserType[]>> {
    return this.request().get<UserType[]>('users');
  }
}
