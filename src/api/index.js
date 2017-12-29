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
// 【臻收银模块】
export const zsy = '/zsy'
// ===商户管理模块接口===
// 用户列表(商户列表)
export const merchantList = (params) => {
  return http.fetchPost(zsy + '/zcash/customer/list.do', params)
}
// 门店管理
export const zsyStore = (params) => {
  return http.fetchPost(zsy + "/zcash/shop/list.do", params)
}
// 收款码管理
export const zsyQRcode = (params) => {
  return http.fetchPost(zsy + '/zcash/collectionCode/list.do', params)
}
// 操作员管理
export const zsyOper = (params) => {
  return http.fetchPost(zsy + '/zcash/userShop/list.do', params)
}
// 臻e贷管理 
export const zed = "/zed"
//信用卡申请
export const zedCredit = (params) => {
	return http.fetchPost(zed + '/trade/creditAction/list.do',params)
}
//查询地区
export const zedArea = (params) => {
	return http.fetchPost(zed + '/common/district/list.do',params)
}
