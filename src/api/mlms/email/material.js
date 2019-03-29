import request from '@/router/axios'
const materialUrl = '/mlms/material'

// 材料
export function getReceiverList (params) {
  return request({
    url: `${materialUrl}/page`,
    method: 'get',
    params: params,
  })
}
