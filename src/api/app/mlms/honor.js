import request from '@/router/axios'
const prefixUrl = '/mlms/channel_material/honor'
const honorListUrl = '/mlms/channel_material/honor_list'

// 获得资质库总数
export const getHonorCount = (params) => {
  return request({
    url: `${prefixUrl}/count`,
    method: 'get',
    params: params,
  })
}

// 获得选项卡
export const getHonorSign = (params) => {
  return request({
    url: `${prefixUrl}/getSign`,
    method: 'get',
    params: params,
  })
}

// 获得资质库分页（包含模糊搜索）
export const getHonorPage = (params) => {
  return request({
    url: `${prefixUrl}/page`,
    method: 'get',
    params: params,
  })
}
export function getHonorPage1 (size) {
  return request({
    url: `${prefixUrl}/page`,
    method: 'get',
    params: {
      size,
    },
  })
}
// 组织详情资质集合 
export const getHonorList = (id) => {
  return request({
    url: `${honorListUrl}/${id}`,
    method: 'get',
  })
}
