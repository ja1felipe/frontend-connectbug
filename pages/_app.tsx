import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { ReactElement, ReactNode } from 'react';
import { NextPage } from 'next';
import MainLayout from '@/components/Layout';
import { AuthContextProvider } from '@/auth/contexts/auth.context';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

function commonLayout(page: ReactElement) {
  return <MainLayout>{page}</MainLayout>;
}

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? commonLayout;

  return (
    <>
      <AuthContextProvider>
        {getLayout(<Component {...pageProps} />)}
        <ToastContainer />
      </AuthContextProvider>
    </>
  );
}

export default MyApp;
