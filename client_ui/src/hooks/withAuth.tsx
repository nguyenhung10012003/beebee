'use client';
import React, { useEffect, useState } from 'react';
import { redirect } from 'next/navigation';
import { useAuth } from '@/hooks/AuthContext';

const withAuth = <P extends object>(
  WrappedComponent: React.ComponentType<P>,
) => {
  return (props: P) => {
    const [login, setLogin] = useState(false);
    const { user } = useAuth();
    useEffect(() => {
      if (!user.token) {
        redirect('/login');
      } else setLogin(true);
    }, [user]);
    return login ? <WrappedComponent user={user} {...props} /> : <></>;
  };
};

export default withAuth;
