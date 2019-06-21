import request from '@/router/axios'
const prefixUrl = '/cpms/channel_product'

export const getDetailsPage = (params) => {
  return request({
    url: `${prefixUrl}/details_page`,
    method: 'get',
    params: params,
  })
}

export const getModulePage = (params) => {
  return request({
    url: `${prefixUrl}/module_page`,
    method: 'get',
    params: params,
  })
}

// 组织详情产品集合
export const getDetailsList = (id) => {
  return request({
    url: `${prefixUrl}/details_list/${id}`,
    method: 'get',
  })
}

// 资源库资源统计
export const getResourceCount = () => {
  return request({
    url: `${prefixUrl}/resource_count`,
    method: 'get',
  })
}

// 频道页员工感想列表
export function getThoughtsList () {
  return request({
    url: `${prefixUrl}/thoughts_list`,
    method: 'get',
  })
}

// 频道页个人感想
export function getPersonalThoughts (id) {
  return request({
    url: `${prefixUrl}/personal_thoughts/${id}`,
    method: 'get',
  })
}

// 搜索结果统计
export function getSearchCount (params) {
  return request({
    url: `${prefixUrl}/search_count`,
    method: 'get',
    params: params,
  })
}

// 频道分页首页产品列表
export function getDetailsIndex () {
  return request({
    url: `${prefixUrl}/details_index`,
    method: 'get',
  })
}

// 频道页意见反馈
export function getProposeList () {
  return request({
    url: `${prefixUrl}/propose_list`,
    method: 'get',
  })
}

// 频道页意见反馈
export function getproductCountList () {
  return request({
    url: `${prefixUrl}/product_count`,
    method: 'get',
  })
}

// 个人风采页师徒
export function getproductMentors (id) {
  return request({
    url: `${prefixUrl}/get_mentors/${id}`,
    method: 'get',
  })
}

