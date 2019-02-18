import request from '@/router/axios'

export function getOrgList () {
  return request({
    url: '/admin/org/list',
    method: 'get',
  })
}