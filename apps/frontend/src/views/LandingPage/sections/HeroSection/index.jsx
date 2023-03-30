import React from 'react';
import Container from 'react-bootstrap/Container';
import NavBarTop from '../../../../components/NavBarTop';

import styles from '../../LandingPage.module.scss';

const HeroSection = () => {
  return (
    <Container
      fluid
      style={{ padding: 0 }}
    >
      <NavBarTop />
    </Container>
  );
};

export default HeroSection;
