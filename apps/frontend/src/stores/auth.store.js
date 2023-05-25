import authService from '../services/auth.service';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { AUTH_TOKEN } from '../constants/auth.constants';
import { useEffect, useState } from 'react';
import { signIn, signOut } from 'next-auth/react';
import {
  TOAST_MESSAGE_RESEND_CODE,
  TOAST_MESSAGE_RESET_PASSWORD,
} from '../constants/messages.constants';

const emptyState = (set, get) => ({
  loading: false,
  message: '',
  showMessage: false,
  redirect: '/',
  token: null,
  username: '',
  usernameAsterisk: '',
  cellphoneAsterisk: '',
  toastMessage: TOAST_MESSAGE_RESET_PASSWORD.success,
  showToastMessage: false,
  _hasHydrated: false,

  setHasHydrated: state => {
    set({
      _hasHydrated: state,
    });
  },
  showAuthMessage: message => {
    set({ message, showMessage: true, loading: false });
  },
  showLoading: () => {
    set({ loading: true });
  },
  hideLoading: () => {
    set({ loading: false });
  },
  hideAuthMessage: () => {
    set({ message: '', showMessage: false });
  },
  authenticated: token => {
    set({ loading: false, redirect: '/', token: token });
  },
  setMessage: msg => {
    set({ message: msg, showMessage: true });
  },
  getUsername: async () => {
    return await get().username;
  },
  logout: async () => {
    window.localStorage.removeItem(AUTH_TOKEN);
    set({ token: null, redirect: '/login', username: '' });
    await signOut({ callbackUrl: '/' });
  },
  login: async body => {
    set({
      loading: true,
      showMessage: false,
      username: body.username,
    });
    try {
      const response = await signIn('foxdelivery', {
        username: body.username,
        password: body.password,
        redirect: false,
      });

      if (response?.error) {
        set({ message: response.error, showMessage: true });
      }
      return response;
    } catch (e) {
      set({ message: e.message, showMessage: true });
    } finally {
      set({
        loading: false,
      });
    }
  },
  register: async body => {
    set({ loading: true });

    const { username, password, cpf, cellphone, name } = body;

    try {
      const response = await signIn('foxdelivery', {
        username,
        password,
        cpf,
        cellphone,
        name,
        redirect: false,
      });

      if (response?.error) {
        set({ message: response.error, showMessage: true });
      }
    } catch (e) {
      set({ message: e.message, showMessage: true });
    } finally {
      set({
        loading: false,
      });
    }
  },
  validateLogin: async (username, code) => {
    set({ loading: true });

    try {
      const response = await signIn('foxdelivery', {
        username: username,
        checkCode: code,
        redirect: false,
      });
      if (response?.error) {
        set({ message: response.error, showMessage: true, redirect: '/' });
      }
    } catch (e) {
      set({ message: e.message, showMessage: true });
    } finally {
      set({
        loading: false,
      });
    }
  },
  forgotPassword: async body => {
    set({ loading: true });
    try {
      const res = await authService.forgotPassword(body);

      set({
        cellphoneAsterisk: res.cellphoneAsterisk,
        usernameAsterisk: res.usernameAsterisk,
        username: res.username,
      });
      if (res?.error) {
        set({ message: res.error.message, showMessage: true });
      } else {
        return true;
      }
    } catch (e) {
      set({ message: e.message, showMessage: true });
    } finally {
      set({
        loading: false,
      });
    }
  },
  validateCodeForgotPassword: async (username, code) => {
    set({ loading: true });
    try {
      const res = await authService.validateCodeForgotPassword({
        username,
        code: Number(code),
      });

      if (res.error) {
        throw new Error(res.error.message);
      }
      return res;
    } catch (e) {
      set({ message: e.message, showMessage: true });
    } finally {
      set({
        loading: false,
      });
    }
  },
  resetPassword: async (newPassword, code, username, currentPassword) => {
    set({ loading: true });
    try {
      const res = await authService.resetPassword({
        password: newPassword,
        code: Number(code),
        username,
        currentPassword,
      });

      set({
        toastMessage: TOAST_MESSAGE_RESET_PASSWORD.success,
        showToastMessage: true,
      });

      return res;
    } catch (e) {
      set({
        message: e?.message,
        toastMessage: { message: e?.response?.data?.message, bg: 'danger' },
        showToastMessage: true,
      });
    } finally {
      set({
        loading: false,
      });
    }
  },
  hideToastMessage: () => {
    set({ showToastMessage: false });
  },
});

const usePersistedStore = create(
  persist(emptyState, {
    name: 'auth',
    onRehydrateStorage: () => state => {
      state.setHasHydrated(true);
    },
  })
);

const emptyStore = create(emptyState);

export const useAuth = () => {
  const store = usePersistedStore();
  const [isHydrated, setHydrated] = useState(false);
  useEffect(() => setHydrated(true), []);
  return isHydrated ? store : emptyStore;
};
