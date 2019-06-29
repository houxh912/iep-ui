import request from '@/router/axios'

const prefixUrl = '/fams/block_chain'
// @/api/fams/block_chain

export function getAmountByUserId (userId) {
  return request({
    url: `${prefixUrl}/account/${userId}`,
    method: 'get',
  })
}
export function sendAmount (obj) {
  return request({
    url: `${prefixUrl}/send`,
    method: 'post',
    data: obj,
  })
}