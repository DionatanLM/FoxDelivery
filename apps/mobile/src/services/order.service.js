import axios from "axios";
import { API_URL } from "@env";

const getOrderByDeliveryManUuid = async (uuid) => {
  try {
    const response = await axios.get(`${API_URL}/order/deliveryman/${uuid}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

const orderService = {
  getOrderByDeliveryManUuid,
};

export default orderService;
