import request from '@/router/axios'

const prefixUrl = '/prms/channel_project'
// @/api/prms/select

export function getProjectPage (query) {
  return request({
    url: `${prefixUrl}/project_page`,
    method: 'get',
    params: {
      projectName: query,
    },
  })
}
