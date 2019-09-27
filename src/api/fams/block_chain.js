import request from '@/router/axios'

const prefixUrl = '/fams/block_chain'
// @/api/fams/block_chain

export function getAmountByUserId (userId) {
  return request({
    url: `${prefixUrl}/account/${userId}`,
    method: 'get',
  })
}

export function getAmount () {
  return request({
    url: `${prefixUrl}/account`,
    method: 'get',
  })
}

export function getPage (query) {
  return request({
    url: `${prefixUrl}/page`,
    method: 'get',
    params: query,
  })
}

export function getMyPage (query) {
  return request({
    url: `${prefixUrl}/my/page`,
    method: 'get',
    params: query,
  })
}

export function getCoinPage (query) {
  return request({
    url: `${prefixUrl}/coin/page`,
    method: 'get',
    params: query,
  })
}

export function sendAmount (obj) {
  return request({
    url: `${prefixUrl}/send`,
    method: 'post',
    data: obj,
  })
}
export function issuedAmount (obj) {
  return request({
    url: `${prefixUrl}/coin/making`,
    method: 'post',
    data: obj,
  })
}
