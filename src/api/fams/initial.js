import request from '@/router/axios'

const prefixUrl = '/fams/initial'
// @/api/fams/initial

export function getinitialList (orgId, year) {
  return request({
    url: `${prefixUrl}/list/${orgId}/${year}`,
    method: 'get',
  })
}

export function putinitial (obj) {
  return request({
    url: `${prefixUrl}/update`,
    method: 'post',
    data: obj,
  })
}