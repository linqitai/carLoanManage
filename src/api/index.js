import http from './public'
// 登录接口
export const userLogin = (params) => {
  return http.fetchPost('/cdd/login.json', params)
}
// 分期审核列表获取接口
export const cheCredit = (params) => {
  return http.fetchPost('/cdd/filter/cheCredit/queryCheCreditList.json', params)
}