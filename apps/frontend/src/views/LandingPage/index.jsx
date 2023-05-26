import React from 'react';
import Container from 'react-bootstrap/Container';
import HeroSection from './sections/HeroSection';

const LandingPage = () => {
  return (
    <Container
      fluid
      style={{ padding: 0, backgroundColor: '#ffffff' }}
    >
      <HeroSection />
    </Container>
  );
};

export default LandingPage;
