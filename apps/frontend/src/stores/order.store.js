import orderService from '@/services/order.service';
import { create } from 'zustand';

export const useOrder = create((set, get) => ({
  loading: false,
  orders: [],
  order: null,
  error: null,

  findOrderByUserStore: async uuidStore => {
    set({ loading: true });
    try {
      const userByUuidResult = await orderService.findOrderByUserStore(
        uuidStore
      );
      set({
        orders: userByUuidResult,
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
