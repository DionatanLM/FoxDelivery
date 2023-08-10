import React, { useEffect, useRef, useState } from 'react';
import styles from './OrderSection.module.scss';
import { Button, Container, Form } from 'react-bootstrap';
import FastBikeIcon from '@/icons/FastBikeIcon';
import CheckIcon from '@/icons/CheckIcon';
import ClosedIcon from '@/icons/ClosedIcon';
import { ORDER_STATUS, ORDER_STATUS_STYLES } from '@/constants/order.constants';
import { useOrder } from '@/stores/order.store';
import { useSession } from 'next-auth/react';

const arrayOrder = [
  { id: '1232', status: ORDER_STATUS.CREATED },
  { id: '8347', status: ORDER_STATUS.READY },
  { id: '5254', status: ORDER_STATUS.RECEIVED },
  { id: '9123', status: ORDER_STATUS.IN_DELIVERY },
  { id: '0232', status: ORDER_STATUS.FINISHED },
  { id: '1232', status: ORDER_STATUS.CANCELED_DELIVERYMAN },
];

const OrderSection = ({ userStore }) => {
  const { orders, findOrderByUserStore } = useOrder();
  useEffect(() => {
    findOrderByUserStore(userStore?.uuid);
  }, [findOrderByUserStore]);

  return (
    <Container
      fluid
      className={styles.container}
    >
      <div className={styles.buttonGroup}>
        <Button className={styles.deliveryCallButton}>
          <FastBikeIcon />
        </Button>
        <Button className={styles.finishDeliveryButton}>
          <CheckIcon />
        </Button>
        <Button className={styles.cancelDeliveryButton}>
          <ClosedIcon />
        </Button>
      </div>
      <div className={styles.listOrderContainer}>
        {orders.map(order => {
          const status = ORDER_STATUS[order.status];
          const cardClass = ORDER_STATUS_STYLES[status] || {};
          return (
            <div
              className={styles.cardOrder}
              style={cardClass}
              key={order.uuid}
            >
              <Form.Check value={order.id} />
              <div className={styles.textOrder}>
                <span>{order.orderNumber}</span>
                <p>{status}</p>
              </div>
            </div>
          );
        })}
      </div>
    </Container>
  );
};

export default OrderSection;
