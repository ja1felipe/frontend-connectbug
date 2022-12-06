import { AuthService } from '@/auth/services/auth.service';
import { AuthContextType } from '@/auth/types';
import { UserType } from '@/user/types';
import { isAxiosError } from 'axios';
import jwtDecode from 'jwt-decode';
import { createContext, useContext, useEffect, useState } from 'react';

const authContextDefaultValues: AuthContextType = {
  user: null,
  login: (email: string, password: string) =>
    new Promise<boolean>((resolve, reject) => resolve(false)),
  logout: () => null,
  isLogged: false,
};

const AuthContext = createContext<AuthContextType>(authContextDefaultValues);

export const useAuth = () => useContext(AuthContext);

const authService = new AuthService();

export const AuthContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [user, setUser] = useState<UserType>();
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const user = jwtDecode<any>(token);

      user.id = user.sub;
      delete user.sub;

      setUser(user as UserType);
    }
    setLoading(false);
  }, []);

  const login = (email: string, password: string) => {
    return new Promise<boolean>((resolve, reject) => {
      authService
        .login(email, password)
        .then((res) => {
          console.log('AQQQQQQQQ', res);
          const token = res.data.access_token;
          localStorage.setItem('token', token);
          const user = jwtDecode<any>(token);

          user.id = user.sub;
          delete user.sub;

          setUser(user as UserType);
          setLoading(false);
          resolve(true);
        })
        .catch((error) => {
          setLoading(false);
          if (isAxiosError(error)) {
            console.log('error message: ', error.message);
          } else {
            console.log('unexpected error: ', error);
          }
          reject(error);
        });
    });
  };

  const logout = () => {
    setUser(undefined);
    localStorage.removeItem('token');
  };

  console.log('context');

  return (
    <AuthContext.Provider value={{ isLogged: !!user, user, login, logout }}>
      {loading ? null : children}
    </AuthContext.Provider>
  );
};
