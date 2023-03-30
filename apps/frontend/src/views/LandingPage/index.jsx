import React from 'react';
import Container from 'react-bootstrap/Container';
import HeroSection from './sections/HeroSection';

const LandingPage = ({ plans }) => {
  return (
    <Container
      fluid
      style={{ padding: 0, backgroundColor: '#060606' }}
    >
      <HeroSection />
    </Container>
  );
};

export default LandingPage;
