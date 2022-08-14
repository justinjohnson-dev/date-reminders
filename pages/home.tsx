import React, { FC } from 'react';
import Layout from '../components/layout';

interface HomeProps {}

const Home: FC<HomeProps> = ({}) => {
  return (
    <>
      <Layout>
        <h1>home</h1>
      </Layout>
    </>
  );
};

export default Home;
