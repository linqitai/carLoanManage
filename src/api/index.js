import http from './public'
// 登录接口
export const userLogin = (params) => {
  return http.fetchPost('/zyd/login.json', params)
}
// 分期审核列表获取接口
export const checkView = (params) => {
  return http.fetchPost('/zyd/apply/checkView.json', params)
}