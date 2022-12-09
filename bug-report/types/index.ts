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

export interface BugReportType {
  id: string;
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
  notes: [
    {
      note: string;
    }
  ];
  reward?: {
    id: string;
    name: string;
    url: string;
    notification_active: true;
    notification_title: string;
    notification_text: string;
    created_at: {};
    updated_at: {};
  };
  created_by_id: string;
  assigned_to_id?: string;
  external_id?: string;
  reward_id?: string;
  status: StatusEnum;
  created_at: string;
  updated_at: string;
}
