import http from './public'
export const config = {
  headers: {
    'Content-Type': 'application/json'
  }
}
// 登录接口
export const cdd = '/rz'
export const userLogin = (params) => {
  return http.fetchPost(cdd + '/login.json', params)
}
// 登出接口
export const userLoginOut = (params) => {
  return http.fetchPost(cdd + '/loginOut.json', params)
}
// 获取用户信息
export const userInfo = (params) => {
  return http.fetchPost(cdd + '/common/userInfo.json', params)
}
// 分期审核列表获取接口
export const cheCredit = (params) => {
  return http.fetchPost(cdd + '/filter/cheCredit/queryCheCreditList.json', params)
}
// 臻商分自评后台
export const zsf = '/zsf'
// 自评记录查询接口
export const zsfQuery = (params) => {
  return http.fetchPost2(zsf + '/selfeval/query', params)
}
