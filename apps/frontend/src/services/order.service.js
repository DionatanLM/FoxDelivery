import fetch from '../configs/fetch.interceptor';

const createOrderByUserStore = async data => {
  console.log('createOrderByUserStore', data);
  const result = await fetch({
    url: `/order/store`,
    method: 'post',
    data,
  });
  console.log(result);
  return result.data;
};

const orderService = {
  createOrderByUserStore,
};

export default orderService;
