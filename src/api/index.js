import http from './public'
// 登录接口
let cdd = '/rz'
export const userLogin = (params) => {
  return http.fetchPost(cdd + '/login.json', params)
}
// 登出接口
export const userLoginOut = (params) => {
  return http.fetchPost(cdd + '/loginOut.json', params)
}
// 分期审核列表获取接口
export const cheCredit = (params) => {
  return http.fetchPost(cdd + '/filter/cheCredit/queryCheCreditList.json', params)
}
// 测试跨域问题
export const testKY = (params) => {
  return http.fetchPost('/zyd/employee/securityCompanyView.json', params)
}