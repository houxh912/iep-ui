import request from '@/router/axios'

const prefixUrl = '/gov'
// @/api/govdata/rss
// 查看主题订阅分页
export function getPolicyPage (params) {
  return request({
    url: `${prefixUrl}/webUserContact/getPolicy`,
    method: 'get',
    params: params,
  })
}