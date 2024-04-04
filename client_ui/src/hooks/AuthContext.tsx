'use client';
import { createContext, ReactNode, useContext, useState } from 'react';
import { LOGIN, LoginInput } from '@/types/LoginInput';
import { useMutation } from '@apollo/client';
import { User } from '@/types/User';
import { deleteCookie, getCookie } from 'cookies-next';


const AuthContext = createContext<any>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User>({
    token: getCookie('token'),
    role: getCookie('role'),
    id: getCookie('userId'),
    email: getCookie('email'),
    username: getCookie('username'),
  });
  const [signIn, { data, error }] = useMutation(LOGIN);
  const login = async (data: LoginInput) => {
    try {
      const result = await signIn({ variables: { signInInput: data } });
      document.cookie = `token=${result.data.signIn.token}; path=/; max-age=864000`;
      document.cookie = `role=${result.data.signIn.user.role}; path=/; max-age=864000`;
      document.cookie = `userId=${result.data.signIn.userId}; path=/; max-age=864000`;
      document.cookie = `email=${result.data.signIn.user.email}; path=/; max-age=864000`;
      document.cookie = `username=${result.data.signIn.user.username}; path=/; max-age=864000`;
      setUser({
        token: result.data.signIn.token,
        role: result.data.signIn.user.role,
        id: result.data.signIn.userId,
        email: result.data.signIn.user.email,
        username: result.data.signIn.user.username,
      });
      return { result, error };
    } catch (error) {
      throw error;
    }
  };

  const logout = () => {
    deleteCookie('token');
    deleteCookie('role');
    deleteCookie('userId');
  };

  return (
    <AuthContext.Provider value={{ login, logout, user }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};