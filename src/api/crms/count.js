import request from '@/router/axios'
const myUrl = '/crm/statistical/my'
const allUrl = '/crm/statistical/all'
//我的客户区域类型
export function getMyDistrict (params) {
  return request({
    url: `${myUrl}/district`,
    method: 'get',
    params: params,
  })
}
//我的客户业务类型
export function getMyBusiness (params) {
  return request({
    url: `${myUrl}/business`,
    method: 'get',
    params: params,
  })
}
//我的客户统计
export function getMyClientNum (params) {
  return request({
    url: `${myUrl}/client`,
    method: 'get',
    params: params,
  })
}
//我的客户本周根据情况
export function getWeekList (params) {
  return request({
    url: `${myUrl}/weekprogress`,
    method: 'get',
    params: params,
  })
}
//我的客户合同概况
export function getMySituation (params) {
  return request({
    url: `${myUrl}/contractsituation`,
    method: 'get',
    params: params,
  })
}
//我的客户预警提醒
export function getMyWarning (params) {
  return request({
    url: `${myUrl}/warning`,
    method: 'get',
    params: params,
  })
}
//全部客户区域类型
export function getAllDistrict (params) {
  return request({
    url: `${allUrl}/district`,
    method: 'get',
    params: params,
  })
}
//全部客户出单分析区域类型
export function getDistrict (params) {
  return request({
    url: `${allUrl}/districtType`,
    method: 'get',
    params: params,
  })
}
//全部客户业务类型
export function getAllBusiness (params) {
  return request({
    url: `${allUrl}/business`,
    method: 'get',
    params: params,
  })
}
//全部客户出单分析业务类型
export function getBusiness (params) {
  return request({
    url: `${allUrl}/businessType`,
    method: 'get',
    params: params,
  })
}
//全部客户统计
export function getAllClientNum (params) {
  return request({
    url: `${allUrl}/client`,
    method: 'get',
    params: params,
  })
}
//全部客户联系人数量
export function getAllRejister (params) {
  return request({
    url: `${allUrl}/clientContact`,
    method: 'get',
    params: params,
  })
}
//全部客户市场经理
export function getAllManager (params) {
  return request({
    url: `${allUrl}/marketManager`,
    method: 'get',
    params: params,
  })
}
//全部客户统计部门
export function getAllDept (params) {
  return request({
    url: `${allUrl}/dept`,
    method: 'get',
    params: params,
  })
}
export function getAllRecord (params) {
  return request({
    url: `${allUrl}/single`,
    method: 'get',
    params: params,
  })
}
//全部客户增长统计
export function getAllIncrease (params) {
  return request({
    url: `${allUrl}/increase`,
    method: 'get',
    params: params,
  })
}
export function getAllContactincrease (params) {
  return request({
    url: `${allUrl}/contactincrease`,
    method: 'get',
    params: params,
  })
}
