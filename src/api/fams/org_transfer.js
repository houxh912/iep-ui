import request from '@/router/axios'

const prefixUrl = '/fams/total/org_transfer'
// @/api/fams/org_transfer

export function getOrgTransferPage (query) {
  return request({
    url: `${prefixUrl}/page`,
    method: 'get',
    params: query,
  })
}

export function postOrgTransfer (obj) {
  
  return request({
    url: `${prefixUrl}/create`,
    method: 'post',
    data: obj,
  })
}
