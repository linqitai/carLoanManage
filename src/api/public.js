import axios from 'axios'
import qs from 'qs'
import router from '../router/index'
axios.defaults.timeout = 5000
// axios.defaults.headers.post['Content-Type'] = 'application/x-www=form-urlencoded'

// // POST传参序列化
// axios.interceptors.request.use((config) => {
//   console.log(config)
//   if (config.method === 'post') {
//     config.data = qs.stringify(config.data)
//   }
//   return config
// }, (error) => {
//   // _.toast("错误的传参", 'fail');
//   return Promise.reject(error)
// })
// 返回状态判断
// 添加一个响应拦截器
axios.interceptors.response.use(function (res) {
  // 在这里对返回的数据进行处理
  console.log(res)
  if (res.status === 200) {
    if (res.data.code === 1001) {
      router.replace({
        path: '/login'
      })
    }
  }
  return res;
}, function (err) {
  // Do something with response error
  return Promise.reject(err);
})

export default {
  fetchGet(url, params) {
    return new Promise((resolve, reject) => {
      axios.get(url, params).then(res => {
        resolve(res.data)
      }).catch(error => {
        reject(error)
      })
    })
  },
  fetchPost(url, data = {}) {
    return new Promise((resolve, reject) => {
      axios.post(url, qs.stringify(data)).then(res => {
        resolve(res.data)
      }).catch(error => {
        reject(error)
      })
    })
  }
}