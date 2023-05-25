import fetch from '../configs/fetch.interceptor';

const login = async data => {
  const result = await fetch({
    url: '/auth/login',
    method: 'post',
    headers: {
      'public-request': 'true',
    },
    data: data,
  });
  return result.data;
};
const providerLogin = async data => {
  const result = await fetch({
    url: '/auth/provider/login',
    method: 'post',
    headers: {
      'public-request': 'true',
    },
    data: data,
  });
  return result.data;
};

const register = async data => {
  const result = await fetch({
    url: '/auth/register',
    method: 'post',
    headers: {
      'public-request': 'true',
    },
    data: data,
  });

  return result.data;
};

const validateLogin = async data => {
  const result = await fetch({
    url: '/auth/check-code',
    method: 'post',
    headers: {
      'public-request': 'true',
    },
    data: data,
  });
  return result.data;
};

const validateCodeForgotPassword = async data => {
  const result = await fetch({
    url: '/auth/check-code/reset-password',
    method: 'post',
    headers: {
      'public-request': 'true',
    },
    data: data,
  });
  return result.data;
};

const forgotPassword = async data => {
  const result = await fetch({
    url: '/auth/forgot-password',
    method: 'post',
    headers: {
      'public-request': 'true',
    },
    data: data,
  });
  return result.data;
};

const resetPassword = async data => {
  const result = await fetch({
    url: '/auth/reset-password',
    method: 'post',
    headers: {
      'public-request': 'true',
    },
    data: data,
  });
  return result.data;
};

const sendValidationCode = async (username, sendingMethod) => {
  const result = await fetch({
    url: '/auth/send-code',
    method: 'post',
    headers: {
      'public-request': 'true',
    },
    data: { username, sendingMethod },
  });
  return result.data;
};

const authService = {
  login,
  register,
  validateLogin,
  providerLogin,
  forgotPassword,
  validateCodeForgotPassword,
  resetPassword,
  sendValidationCode,
};

export default authService;
