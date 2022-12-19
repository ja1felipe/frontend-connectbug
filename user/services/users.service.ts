import BaseRequestService from '@/shared/services/base.service';
import { CreateUserRequestType, UserType } from '@/user/types';
import { AxiosResponse } from 'axios';

export class UserService extends BaseRequestService {
  create(user: CreateUserRequestType): Promise<AxiosResponse<UserType>> {
    return this.request().post<UserType>('users', user);
  }

  getAll(): Promise<AxiosResponse<UserType[]>> {
    return this.request().get<UserType[]>('users');
  }
}
