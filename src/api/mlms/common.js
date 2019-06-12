import request from '@/router/axios'
const prefixUrl = '/mlms/contract'

//@/api/mlms/common

export function getContractListByName (query) {
  return request({
    url: `${prefixUrl}/name/contract/list`,
    method: 'get',
    params: query,
  })
}

export function getProjecListByName (query) {
  return request({
    url: `${prefixUrl}/name/project/list`,
    method: 'get',
    params: query,
  })
}