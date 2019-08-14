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

// 项目统计
export const getProjectCount = () => {
  return request({
    url: `${prefixUrl}/count`,
    method: 'get',
  })
}

// 项目频道页统计
export const getProjectChannelCount = () => {
  return request({
    url: `${prefixUrl}/channel_count`,
    method: 'get',
  })
}

// 重点推荐项目
export const getProjectRecProjects = () => {
  return request({
    url: `${prefixUrl}/project/importance`,
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

// 项目承接能力排行
export const getUndertakeranking = () => {
  return request({
    url: `${prefixUrl}/project/undertakeranking`,
    method: 'get',
  })
}

// 项目频道页执行项目
export const getPerform = () => {
  return request({
    url: `${prefixUrl}/perform`,
    method: 'get',
  })
}

// 项目频道页待建项目
export const getIntention = () => {
  return request({
    url: `${prefixUrl}/intention`,
    method: 'get',
  })
}

// 项目频道页完结项目
export const getProjectend = () => {
  return request({
    url: `${prefixUrl}/projectend`,
    method: 'get',
  })
}

// 项目经理或项目督导查询
export const getProjectEmployee = (obj) => {
  return request({
    url: `${prefixUrl}/project/employee`,
    method: 'get',
    params: obj,
  })
}

// 项目经理或项目督导担任的项目名称查询
export const getProjectByemployee = (obj) => {
  return request({
    url: `${prefixUrl}/project/byemployee`,
    method: 'get',
    params: obj,
  })
}

// 优秀项目经理或督导达人查询
export const getProjectExcellentemployee = (obj) => {
  return request({
    url: `${prefixUrl}/project/excellentemployee`,
    method: 'get',
    params: obj,
  })
}

// 项目频道页客户资源
export const getClient = () => {
  return request({
    url: `${prefixUrl}/client`,
    method: 'get',
  })
}

// 项目频道页市场机会
export const getOpportunity = () => {
  return request({
    url: `${prefixUrl}/opportunity`,
    method: 'get',
  })
}

// 项目频道页项目资源
export const getProjectResources = () => {
  return request({
    url: `${prefixUrl}/projectResources`,
    method: 'get',
  })
}

// 项目频道页制度文件
export const getSystemFile = () => {
  return request({
    url: `${prefixUrl}/systemFile`,
    method: 'get',
  })
}

// 项目频道页经验培训
export const getExperienceInTraining = () => {
  return request({
    url: `${prefixUrl}/experienceInTraining`,
    method: 'get',
  })
}

// 项目标签查询
export const getProjectTag = (params) => {
  return request({
    url: `${prefixUrl}/project/tag`,
    method: 'get',
    params: params,
  })
}
