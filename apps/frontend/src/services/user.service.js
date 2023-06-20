import Axios from 'axios';
import fetch from '../configs/fetch.interceptor';

const findStoreByUserUuid = async (uuid, token) => {
  const options = {
    headers: {
      authorization: `Bearer ${token}`,
    },
  };

  const result = await Axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}/user/store/${uuid}`,
    options
  );
  return result.data;
};

const userService = {
  findStoreByUserUuid,
};

export default userService;
