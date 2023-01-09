import { NoteType } from '@/bug-report/types/note.types';
import { UserType } from '@/user/types';

export enum StatusEnum {
  PENDING = 'PENDING',
  ACCEPT = 'ACCEPT',
  DENIED = 'DENIED',
  CLOSED = 'CLOSED',
}

export const statusTranslated = {
  [StatusEnum.PENDING]: 'Pendente',
  [StatusEnum.ACCEPT]: 'Aceito',
  [StatusEnum.DENIED]: 'Negado',
  [StatusEnum.CLOSED]: 'Concluído',
};

export type BugReportCreateRequestType = {
  title: string;
  description: string;
  steps: [
    {
      description: string;
    }
  ];
  screenshots: [
    {
      url: string;
    }
  ];
  external_id?: string;
};

export type BugReportUpdateRequestType = {
  status?: StatusEnum;
  assigned_to_id?: string;
};

export type BugReportConcludeRequestType = {
  reward_id?: string;
};

type DeviceInfos = {
  [index: string]: any;
};

export interface BugReportType {
  id: string;
  title: string;
  description: string;
  steps: [
    {
      id: string;
      description: string;
    }
  ];
  screenshots: [
    {
      id: string;
      url: string;
    }
  ];
  notes: NoteType[];
  reward?: {
    id: string;
    name: string;
    url: string;
    notification_active: true;
    notification_title: string;
    notification_text: string;
    created_at: string;
    updated_at: string;
  };
  deviceInfos: DeviceInfos | null;
  created_by_id: string;
  assigned_to?: Pick<UserType, 'id' | 'email' | 'name'>;
  assigned_to_id?: string;
  external_id?: string;
  reward_id?: string;
  status: StatusEnum;
  created_at: string;
  updated_at: string;
}
