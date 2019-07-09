import request from '@/router/axios'
const prefixUrl = '/mlms/channel_material'

export const getMenuList = (params) => {
  return request({
    url: `${prefixUrl}/level_tree`,
    method: 'get',
    params: params,
  })
}

export const getMaterialLPage = (params) => {
  return request({
    url: `${prefixUrl}/page`,
    method: 'get',
    params: params,
  })
}

export const getTodayCount = (params) => {
  return request({
    url: `${prefixUrl}/today_count`,
    method: 'get',
    params: params,
  })
}

// 猜你想找
export const getGuessList = (params) => {
  return request({
    url: `${prefixUrl}/guess`,
    method: 'get',
    params: params,
  })
}

// 贡献榜
export const getContributeList = (params) => {
  return request({
    url: `${prefixUrl}/contribute`,
    method: 'get',
    params: params,
  })
}

// 本周最热
export const getBestList = (params) => {
  return request({
    url: `${prefixUrl}/best`,
    method: 'get',
    params: params,
  })
}

// 学习资料、制度文件
export const getMaterialList = (params) => {
  return request({
    url: `${prefixUrl}/list`,
    method: 'get',
    params: params,
  })
}

// 组织详情方案材料集合 
export const getOrgMaterialList = (id) => {
  return request({
    url: `${prefixUrl}/material_list/${id}`,
    method: 'get',
  })
}

// 分页查询合同
export const getContractPage = (params) => {
  return request({
    url: `${prefixUrl}/contract_page`,
    method: 'get',
    params: params,
  })
}

// 首页要闻集合
export const getNewsList = (params) => {
  return request({
    url: `${prefixUrl}/news_list`,
    method: 'get',
    params: params,
  })
}

// 数据-资料统计
export const getRankList = () => {
  return request({
    url: `${prefixUrl}/material/rankList`,
    method: 'get',
  })
}

// 数据-会议概况
export const getweek = () => {
  return request({
    url: `${prefixUrl}/meeting/week`,
    method: 'get',
  })
}

// 数据-客户拜访
export const getvisit = () => {
  return request({
    url: `${prefixUrl}/customer/visit`,
    method: 'get',
  })
}

// achievement
export const getAchievement = (id) => {
  return request({
    url: `${prefixUrl}/achievement/${id}`,
    method: 'get',
  })
}

// 投资达人
export const getInvestmentList = () => {
  return request({
    url: `${prefixUrl}/investment_list`,
    method: 'get',
  })
}
