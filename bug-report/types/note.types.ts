import { UserType } from '@/user/types';

export type NoteCreateRequestType = {
  note: string;
  bug_report_id: string;
};

export interface NoteType {
  id: string;
  note: string;
  bug_report_id: string;
  created_by: UserType;
  created_by_id: string;
  created_at: string;
}
