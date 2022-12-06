export interface AuthContextType {
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  user: any;
  isLogged: boolean;
}
