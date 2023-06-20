import axios from 'axios';
import { getSession } from 'next-auth/react';
import { AUTH_TOKEN } from '../constants/auth.constants';

const service = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  timeout: 60000,
});

const ENTRY_ROUTE = '/auth/login';
const TOKEN_PAYLOAD_KEY = 'authorization';
const PUBLIC_REQUEST_KEY = 'public-request';

service.interceptors.request.use(
  async config => {
    let jwtToken = null;

    if (!config.headers[PUBLIC_REQUEST_KEY]) {
      const session = await getSession();
      if (session) {
        jwtToken = session.accessToken;
      }
      if (jwtToken) {
        config.headers[TOKEN_PAYLOAD_KEY] = `Bearer ${jwtToken}`;
      }

      if (!jwtToken && !config.headers[PUBLIC_REQUEST_KEY]) {
        // history.push(ENTRY_ROUTE);
        window.location.reload();
      }
    }
    return config;
  },
  error => {
    Promise.reject(error);
  }
);

service.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    // if (error?.response?.data?.message) {
    //   return error.response.data.message;
    // }
    return Promise.reject(error);
  }
);

export default service;
