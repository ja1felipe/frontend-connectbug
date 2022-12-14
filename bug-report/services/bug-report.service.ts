import {
  BugReportCreateRequestType,
  BugReportType,
  BugReportUpdateRequestType,
  StatusEnum,
} from '@/bug-report/types/bug-report.types';
import BaseRequestService from '@/shared/services/base.service';
import { AxiosResponse } from 'axios';
import { toast } from 'react-toastify';

export class BugReportService extends BaseRequestService {
  create(
    bugReport: BugReportCreateRequestType
  ): Promise<AxiosResponse<BugReportType>> {
    return this.request().post<BugReportType>('bugreport', {
      bugReport,
    });
  }

  update(
    id: string,
    bugReport: BugReportUpdateRequestType
  ): Promise<AxiosResponse<BugReportType>> | void {
    if (bugReport.status === StatusEnum.ACCEPT && !bugReport.assigned_to_id) {
      toast.warn('Você precisa atribuir o bug report para alguém resolver!');
      return;
    }
    return this.request().patch<BugReportType>(`bugreport/${id}`, bugReport);
  }

  conclude(id: string): Promise<AxiosResponse<BugReportType>> {
    return this.request().patch<BugReportType>(`bugreport/conclude/${id}`);
  }

  getAll(): Promise<AxiosResponse<BugReportType[]>> {
    return this.request().get<BugReportType[]>('bugreport');
  }
}
