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

// 项目库统计
export const getProjectCount = () => {
  return request({
    url: `${prefixUrl}/count`,
    method: 'get',
  })
}

// 重点推荐项目
export const getProjectRecProjects = () => {
  return request({
    url: `${prefixUrl}/rec_projects`,
    method: 'get',
  })
}

// 获得担任项目经理次数最多的10人
export const getProjectProjectManager = () => {
  return request({
    url: `${prefixUrl}/project_manager`,
    method: 'get',
  })
}

// 业绩变化
export const getPerformanceChanges = () => {
  return request({
    url: `${prefixUrl}/Performance/changes`,
    method: 'get',
  })
}

// 项目概况
export const getOverview = () => {
  return request({
    url: `${prefixUrl}/project/overview`,
    method: 'get',
  })
}

// 产品销售
export const getSales = () => {
  return request({
    url: `${prefixUrl}/product/sales`,
    method: 'get',
  })
}

// 数据-产品销售
export const getRanking = () => {
  return request({
    url: `${prefixUrl}/performance/ranking`,
    method: 'get',
  })
}
