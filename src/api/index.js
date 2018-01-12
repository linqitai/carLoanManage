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
// 商户编辑列表
export const shopEdit = (params) => {
  return http.fetchPost(zsy + '/zcash/customer/updateCustomer.do', params)
}
// 商户详情
export const customerDetails = (params) => {
  return http.fetchPost(zsy + '/zcash/customer/view.do', params)
}
// 商户编辑
export const customerDetailsEdit = (params) => {
  return http.fetchPost(zsy + '/zcash/customer/updateCustomer.do', params)
}
// 审核驳回
export const auditFail = (params) => {
  return http.fetchPost(zsy + '/zcash/customer/auditFail.do', params)
}
// 审核禁用
export const auditEnabel = (params) => {
  return http.fetchPost(zsy + '/zcash/customer/auditEnabel.do', params)
}
// 网商审核
export const auditMybank = (params) => {
  return http.fetchPost(zsy + '/zcash/customer/auditMybank.do', params)
}
// 商户状态修改
export const testC = (params) => {
  return http.fetchPost(zsy + '/zcash/customer/testC.do', params)
}
// 保存审核第二步信息接口
export const updateLocalClearmode = (params) => {
  return http.fetchPost(zsy + '/zcash/customer/updateLocalClearmode.do', params)
}
// 修改商户简称
export const updateAbbreviation = (params) => {
  return http.fetchPost(zsy + '/zcash/customer/updateAbbreviation.do', params)
}
// 修改经营类型
export const updateOperatetype = (params) => {
  return http.fetchPost(zsy + '/zcash/customer/updateOperatetype.do', params)
}
// 修改经营类目
export const updateOperatecategory = (params) => {
  return http.fetchPost(zsy + '/zcash/customer/updateOperatecategory.do', params)
}
// 编辑客服电话
export const updateServicePhone = (params) => {
  return http.fetchPost(zsy + '/zcash/customer/updateServicePhone.do', params)
}
// 网商审核发送验证码
export const sendMsgCode = (params) => {
  return http.fetchPost(zsy + '/zcash/customer/sendMsgCode.do', params)
}
// 编辑禁用方式
export const updateDeniedpays = (params) => {
  return http.fetchPost(zsy + '/zcash/customer/updateDeniedpays.do', params)
}
// 编辑交易类型
export const updateTradetypes = (params) => {
  return http.fetchPost(zsy + '/zcash/customer/updateTradetypes.do', params)
}
// 编辑费率
export const updateCustomerClearmode = (params) => {
  return http.fetchPost(zsy + '/zcash/customer/updateCustomerClearmode.do', params)
}
// 编辑负责人电话
export const changePhone = (params) => {
  return http.fetchPost(zsy + '/zcash/customer/changePhone.do', params)
}
// 银行列表
export const bankList = (params) => {
  return http.fetchPost(zsy + '/common/bank/list.do', params)
}
// 编辑提现银行卡
export const updateBanknumbe = (params) => {
  return http.fetchPost(zsy + '/zcash/customer/updateBanknumbe.do', params)
}
// 支行列表
export const listBranchBank = (params) => {
  return http.fetchPost(zsy + '/common/bank/listBranchBank.do', params)
}
// 编辑图片
export const updateImg = (params) => {
  return http.fetchPost(zsy + '/zcash/customer/updateImg.do', params)
}
// 网商入住查询
export const queryMybankAuditState = (params) => {
  return http.fetchPost(zsy + '/zcash/customer/queryMybankAuditState.do', params)
}
// 七牛token
export const zsPToken = (params) => {
  return http.fetchPost(zsy + '/common/qiniu/zsPToken.do', params)
}
// 备忘保存
export const save = (params) => {
  return http.fetchPost(zsy + '/zcash/memoInfo/save.do', params)
}
// 备忘列表
export const listByCustomerId = (params) => {
  return http.fetchPost(zsy + '/zcash/memoInfo/listByCustomerId.do', params)
}
