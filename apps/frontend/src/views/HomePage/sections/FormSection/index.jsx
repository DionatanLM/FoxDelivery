import React from 'react';
import Container from 'react-bootstrap/Container';
import styles from './FormSection.module.scss';

const FormSection = () => {
  return (
    <Container
      fluid
      className={styles.container}
    >
      <div className={styles.cardInputs}></div>
    </Container>
  );
};

export default FormSection;
