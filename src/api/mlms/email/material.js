import request from '@/router/axios'

// 材料
export function getReceiverList (params) {
  return request({
    url: '/mlms/material/page',
    method: 'get',
    params: params,
  })
}
