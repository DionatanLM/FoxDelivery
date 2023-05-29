import React from 'react';
import Container from 'react-bootstrap/Container';
import styles from './ReportPage.module.scss';
import { Col, Row } from 'react-bootstrap';
import NavBarLeft from '@/components/NavBarLeft';

const ReportPage = () => {
  return (
    <Container
      fluid
      className={styles.container}
    >
      <Row className={styles.leftNavBar}>
        <NavBarLeft />
        <Col className="p-0 m-0">
          <div
            style={{ background: 'gray', height: '100%', width: '100%' }}
          ></div>
        </Col>
      </Row>
    </Container>
  );
};

export default ReportPage;
