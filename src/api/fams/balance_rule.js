import request from '@/router/axios'

const prefixUrl = '/fams/balance_rule'
// @/api/fams/balance_rule

export function addBellBalanceRule () {
  return request({
    url: `${prefixUrl}/login/bell/add`,
    method: 'get',
  })
}

export function addBellBalanceRuleByNumber (number) {
  return request({
    url: `${prefixUrl}/bell/add/${number}`,
    method: 'get',
  })
}

export function getBellBalancePage (query) {
  return request({
    url: `${prefixUrl}/page`,
    method: 'get',
    params: query,
  })
}

export function getBellBalanceById (id) {
  return request({
    url: `${prefixUrl}/${id}`,
    method: 'get',
  })
}

export function putBellBalance (obj) {
  return request({
    url: `${prefixUrl}/update`,
    method: 'post',
    data: obj,
  })
}
