import { create } from "zustand";
import orderService from "../services/order.service";

export const useOrder = create((set, get) => ({
  loading: false,
  orders: [],
  order: null,
  error: null,

  findOrderByDeliveryman: async (uuid) => {
    set({ loading: true });
    try {
      const result = await orderService.getOrderByDeliveryManUuid(uuid);
      set({
        orders: result,
      });
    } catch (e) {
      set({
        orders: null,
        error: e,
      });
    } finally {
      set({ loading: false });
    }
  },
}));
