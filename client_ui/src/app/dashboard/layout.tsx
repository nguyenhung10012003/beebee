'use client';
import { ReactNode } from 'react';
import withAuth from '@/hooks/withAuth';
import Header from '@/components/layout/header';
import Sidebar from '@/components/layout/sidebar';

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <Header />
      <div className="flex min-h-screen">
        <Sidebar />
        <main className="w-full pt-20 px-8">{children}</main>
      </div>
    </>
  );
};

export default withAuth(Layout);
