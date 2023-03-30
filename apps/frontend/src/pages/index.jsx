import React from 'react';
import HeaderSEO from '../views/HeaderSeo';
import LandingPage from '../views/LandingPage';

export default function Home({ result }) {
  return (
    <>
      <HeaderSEO
        title={'Fox Delivery'}
        description={'Fox Delivery'}
        url={'/'}
        image={'Fox Delivery'}
      />
      <LandingPage />
    </>
  );
}
