import request from '@/router/axios'

const prefixUrl = '/fams/fee'
// @/api/fams/fee

export function getMyFeePage (query) {
  return request({
    url: `${prefixUrl}/my/page`,
    method: 'get',
    params: query,
  })
}
// 财务管理
export function getFeePage (query) {
  return request({
    url: `${prefixUrl}/financial_page`,
    method: 'get',
    params: query,
  })
}
// 个人审批发票
export function getMyFeeApprovalPage (query) {
  return request({
    url: `${prefixUrl}/primary_page`,
    method: 'get',
    params: query,
  })
}
export function getFeeById (id) {
  return request({
    url: `${prefixUrl}/${id}`,
    method: 'get',
  })
}

export function postFee (obj, isPublish = false) {
  return request({
    url: `${prefixUrl}/create`,
    method: 'post',
    data: { isPublish, ...obj },
  })
}

export function putFee (obj, isPublish = false) {
  return request({
    url: `${prefixUrl}/update`,
    method: 'post',
    data: { isPublish, ...obj },
  })
}

export function putFeeRelation (obj) {
  return request({
    url: `${prefixUrl}/update/project`,
    method: 'post',
    data: obj,
  })
}

export function referFeeById (id) {
  return request({
    url: `${prefixUrl}/refer/${id}`,
    method: 'post',
  })
}

export function withdrawFeeById (id) {
  return request({
    url: `${prefixUrl}/withdraw/${id}`,
    method: 'post',
  })
}

export function deleteFeeById (id) {
  return request({
    url: `${prefixUrl}/delete/batch`,
    method: 'post',
    data: [id],
  })
}

export function deleteFeeBatch (ids) {
  return request({
    url: `${prefixUrl}/delete/batch`,
    method: 'post',
    data: ids,
  })
}

export function rejectFee (obj) {
  return request({
    url: `${prefixUrl}/financial_refuse`,
    method: 'post',
    data: obj,
  })
}

export function passFee (obj) {
  return request({
    url: `${prefixUrl}/financial_agree`,
    method: 'post',
    data: obj,
  })
}

export function myRejectFee (obj) {
  return request({
    url: `${prefixUrl}/primary_refuse`,
    method: 'post',
    data: obj,
  })
}

export function myPassFee (obj) {
  return request({
    url: `${prefixUrl}/primary_agree`,
    method: 'post',
    data: obj,
  })
}

export function myTransFee (obj) {
  return request({
    url: `${prefixUrl}/primary_transmit`,
    method: 'post',
    data: obj,
  })
}