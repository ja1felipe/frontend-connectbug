import { UserType } from '@/user/types';

export interface AuthContextType {
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  user: UserType | undefined;
  isLogged: boolean;
}
