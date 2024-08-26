import axios from "axios";
const server = axios.create({
  baseURL: "http://127.0.0.1:8888/api/",
  timeout: 3000,
});
// 请求拦截器
server.interceptors.request.use(
  function (config) {
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);
// 响应拦截器
server.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    return Promise.reject(error);
  }
);
export default server;
