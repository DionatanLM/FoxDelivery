import React from 'react';
import styles from './MarkerOrder.module.scss';

const MarkerOrder = ({ title }) => {
  return (
    <div
      className={styles.containerMarker}
      style={{
        position: 'relative',
        width: '40px',
        height: '40px',
        background: 'red',
        borderRadius: '50%',
        color: 'white',
        fontWeight: 'bold',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        cursor: 'pointer',
      }}
    >
      {title}
    </div>
  );
};

export default MarkerOrder;
