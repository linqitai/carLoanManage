// import axios from 'axios';
// import qs from 'qs';
// import { Message } from 'element-ui';
// axios.defaults.timeout = 5000;
// axios.defaults.headers.post['Content-Type'] =
//   'application/x-www-form-urlencoded;charset=UTF-8';
// // axios.defaults.baseURL = 'http://192.168.18.170:8061';
// // POST传参序列化
// axios.interceptors.request.use(
//   config => {
//     if (config.method === 'post') {
//       config.data = qs.stringify(config.data);
//     }
//     return config;
//   },
//   error => {
//     Message('错误的传参')
//     return Promise.reject(error);
//   }
// );
// // code状态码0判断
// axios.interceptors.response.use(
//   res => {
//     if (res.data.code !== 0) {
//       Message(res.data.error)
//       return Promise.reject(res);
//     }
//     return res;
//   },
//   error => {
//     Message('网络异常')
//     return Promise.reject(error);
//   }
// );
// export default axios;
