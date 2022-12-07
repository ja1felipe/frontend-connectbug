import { NextPageWithLayout } from '@/pages/_app';
import Link from 'next/link';
import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const Page404: NextPageWithLayout = () => {
  return (
    <Container>
      <h1>404 - Page Not Found</h1>
      <Link href='/home'>
        <a>Go back home</a>
      </Link>
    </Container>
  );
};

Page404.getLayout = (page) => page;
export default Page404;
