import axios from "axios";

const service = axios.create({
  baseURL: process.env.API_URL,
  timeout: 60000,
});

export default service;
