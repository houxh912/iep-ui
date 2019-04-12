import request from '@/router/axios'
const prefixUrl = '/cpms/series'
//合同列表
export function getSeriesPage (params) {
  return request({
    url: `${prefixUrl}/page`,
    method: 'get',
    params: params,
  })
}