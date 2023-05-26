import React from 'react';
import Button from 'react-bootstrap/Button';
import styles from './LoadingButton.module.scss';
import Spinner from 'react-bootstrap/Spinner';

const LoadingButton = ({ loading, text, loadingText, variant, type }) => {
  return (
    <Button
      disabled={loading}
      variant={variant}
      type={type}
      className={styles.button}
    >
      {loading ? (
        <>
          <Spinner
            size="sm"
            animation="border"
          />
          {loadingText}
        </>
      ) : (
        text
      )}
    </Button>
  );
};

export default LoadingButton;
