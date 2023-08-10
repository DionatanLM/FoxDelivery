import React from 'react';
import Container from 'react-bootstrap/Container';
import styles from './HomePage.module.scss';
import { Col, Row } from 'react-bootstrap';
import NavBarLeft from '@/components/NavBarLeft';
import FormSection from './sections/FormSection';
import MapSection from './sections/MapSection';
import { useSession } from 'next-auth/react';
import OrderSection from './sections/OrderSection';

const HomePage = ({ userStore }) => {
  const session = useSession();
  const { data } = session;

  return (
    <Container
      fluid
      className={styles.container}
    >
      <Row className={styles.leftNavBar}>
        <NavBarLeft />
        <Col className="p-0 m-0">
          <FormSection userStore={userStore} />
          <MapSection userStore={userStore} />
          <OrderSection userStore={userStore} />
        </Col>
      </Row>
    </Container>
  );
};

export default HomePage;
