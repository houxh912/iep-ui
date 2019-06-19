import request from '@/router/axios'
const prefixUrl = '/admin/org_evaluate'

// 组织评价列表
export function getOrgevaluatePage (params) {
  return request({
    url: `${prefixUrl}/page`,
    method: 'get',
    params: params,
  })
}
