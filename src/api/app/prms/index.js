import request from '@/router/axios'
const prefixUrl = '/prms/channel_project'

export const getProjectList = (id) => {
  return request({
    url: `${prefixUrl}/project_list/${id}`,
    method: 'get',
  })
}

// 频道页项目分页
export const getProjectPage = (params) => {
  return request({
    url: `${prefixUrl}/project_page`,
    method: 'get',
    params: params,
  })
}
