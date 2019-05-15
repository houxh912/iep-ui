import request from '@/router/axios'
const prefixUrl = '/admin/channel_user'

// 组织风采
export const getRectagsOrgList = () => {
  return request({
    url: `${prefixUrl}/org_list`,
    method: 'get',
  })
}
