'use client';

import { ThemeProvider } from 'next-themes';
import React from 'react';
import { ApolloProvider } from '@apollo/client';
import client from '@/config/apolloCilent';
import { AuthProvider } from '@/hooks/AuthContext';


export function Provider({ children }: {
  children: React.ReactNode;

}) {
  return (
    <ThemeProvider attribute="class">
      <ApolloProvider client={client}>
        <AuthProvider children={children}></AuthProvider>
      </ApolloProvider>
    </ThemeProvider>
  );
}