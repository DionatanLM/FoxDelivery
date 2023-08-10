export const ORDER_STATUS = {
  CREATED: 'Criado',
  RECEIVED: 'Recebido',
  READY: 'Pronto',
  IN_DELIVERY: 'Em entrega',
  DELIVERED: 'Entregue',
  FINISHED: 'Finalizado',
  CANCELED_DELIVERYMAN: 'Cancelado',
  CANCELED_STORE: 'Cancelado',
};

export const ORDER_STATUS_STYLES = {
  Criado: {
    background: '#FFEEE5',
    border: '1px solid #E2D1C8',
  },
  Recebido: {
    background: '#FFFCDE',
    border: '1px solid #FFE589',
  },
  Pronto: {
    background: '#FFECDC',
    border: '1px solid #FFCAA0',
  },
  'Em entrega': {
    background: '#E8FFE4',
    border: '1px solid #BFE1C3',
  },
  Finalizado: {
    background: '#E5F3FF',
    border: '1px solid #8ACEFF',
  },
  Cancelado: {
    background: '#FFF2F2',
    border: '1px solid #FF8787',
  },
};
