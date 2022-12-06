import { AuthService } from '@/services/authService';
import { isAxiosError } from 'axios';
import jwtDecode from 'jwt-decode';
import { createContext, useContext, useState } from 'react';
const AuthContext = createContext<any>({});

export const useAuth = () => useContext(AuthContext);

const authService = new AuthService();

export const AuthContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const signup = (email: string, password: string) => {
    return;
  };

  const login = (email: string, password: string) => {
    setLoading(true);
    authService
      .login(email, password)
      .then((res) => {
        const token = res.data.access_token;
        localStorage.setItem('token', token);
        const user = jwtDecode(token);
        setUser(user);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        if (isAxiosError(error)) {
          console.log('error message: ', error.message);
        } else {
          console.log('unexpected error: ', error);
        }
      });
  };

  // const logout = async () => {
  //   setUser(null);
  //   await signOut(auth);
  // };

  // const resetPassword = async (email: string) => {
  //   console.log("reset pra:", email);
  //   return sendPasswordResetEmail(auth, email)
  //     .then((a) => {
  //       alert("Email enviado");
  //     })
  //     .catch((error) => {
  //       alert("Email não encontrado");
  //     });
  // };

  return (
    <AuthContext.Provider value={{ isLogged: !!user, user, login, signup }}>
      {loading ? null : children}
    </AuthContext.Provider>
  );
};
