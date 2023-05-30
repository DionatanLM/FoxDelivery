import React from 'react';
import Container from 'react-bootstrap/Container';
import styles from './HomePage.module.scss';
import { Col, Row } from 'react-bootstrap';
import NavBarLeft from '@/components/NavBarLeft';
import FormSection from './sections/FormSection';
import MapSection from './sections/MapSection';

const HomePage = () => {
  return (
    <Container
      fluid
      className={styles.container}
    >
      <Row className={styles.leftNavBar}>
        <NavBarLeft />
        <Col className="p-0 m-0">
          <FormSection />
          <MapSection />
        </Col>
      </Row>
    </Container>
  );
};

export default HomePage;