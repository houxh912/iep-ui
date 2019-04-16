import request from '@/router/axios'
//我的客户区域类型
export function getMyDistrict (params) {
  return request({
    url: '/crm/statistical/my/district',
    method: 'get',
    params: params,
  })
}
//我的客户业务类型
export function getMyBusiness (params) {
  return request({
    url: '/crm/statistical/my/business',
    method: 'get',
    params: params,
  })
}
//我的客户统计
export function getMyClientNum (params) {
  return request({
    url: '/crm/statistical/my/client',
    method: 'get',
    params: params,
  })
}
//全部客户区域类型
export function getAllDistrict (params) {
  return request({
    url: '/crm/statistical/all/district',
    method: 'get',
    params: params,
  })
}
//全部客户业务类型
export function getAllBusiness (params) {
  return request({
    url: '/crm/statistical/all/business',
    method: 'get',
    params: params,
  })
}
//全部客户统计
export function getAllClientNum (params) {
  return request({
    url: '/crm/statistical/all/client',
    method: 'get',
    params: params,
  })
}
