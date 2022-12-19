import { UserJwtType } from '@/user/types';

export interface AuthContextType {
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  user: UserJwtType | undefined;
  isLogged: boolean;
}

export type LoginResponseType = {
  access_token: string;
};
