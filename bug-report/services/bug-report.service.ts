import {
  BugReportCreateRequestType,
  BugReportType,
} from '@/bug-report/types/bug-report.types';
import BaseRequestService from '@/shared/services/base.service';
import { AxiosResponse } from 'axios';

export class BugReportService extends BaseRequestService {
  create(
    bugReport: BugReportCreateRequestType
  ): Promise<AxiosResponse<BugReportType>> {
    return this.request().post<BugReportType>('bugreport', {
      bugReport,
    });
  }

  getAll(): Promise<AxiosResponse<BugReportType[]>> {
    return this.request().get<BugReportType[]>('bugreport');
  }
}
