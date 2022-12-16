import { RewardRequestType, RewardType } from '@/reward/types';
import BaseRequestService from '@/shared/services/base.service';
import { AxiosResponse } from 'axios';

export class RewardService extends BaseRequestService {
  create(reward: RewardRequestType): Promise<AxiosResponse<RewardType>> {
    return this.request().post<RewardType>('rewards', reward);
  }

  getAll(): Promise<AxiosResponse<RewardType[]>> {
    return this.request().get<RewardType[]>('rewards');
  }

  test(id: string): Promise<AxiosResponse<any>> {
    return this.request().get(`rewards/test/${id}`);
  }
}
