import Axios from 'axios';
import fetch from '../configs/fetch.interceptor';

const createOrderByUserStore = async data => {
  const result = await fetch({
    url: `/order/store`,
    method: 'post',
    data,
  });
  return result.data;
};

const findOrderByUserStore = async uuidStore => {
  const result = await Axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}/order/store/${uuidStore}`
  );

  return result.data;
};

const orderService = {
  createOrderByUserStore,
  findOrderByUserStore,
};

export default orderService;
