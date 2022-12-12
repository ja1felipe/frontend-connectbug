import { NoteCreateRequestType, NoteType } from '@/bug-report/types/note.types';
import BaseRequestService from '@/shared/services/base.service';
import { AxiosResponse } from 'axios';

export class NotesService extends BaseRequestService {
  create(note: NoteCreateRequestType): Promise<AxiosResponse<NoteType>> {
    return this.request().post<NoteType>('notes', note);
  }

  getAll(bug_report_id: string): Promise<AxiosResponse<NoteType[]>> {
    return this.request().get<NoteType[]>(`notes/${bug_report_id}`);
  }
}
