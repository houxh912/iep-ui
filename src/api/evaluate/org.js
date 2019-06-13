import request from '@/router/axios'
// @/api/evaluate/org
export function getOrgList () {
  return request({
    url: '/admin/org/all/list',
    method: 'get',
  })
}