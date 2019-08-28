import request from '@/router/axios'

const prefixUrl = '/gov'
// @/api/govdata/rss
// 查看主题订阅分页
export function getPolicyPage (params) {
  return request({
    url: `${prefixUrl}/webUserContact/getPolicyPage`,
    method: 'get',
    params: params,
  })
}

// 查看主题订阅列表
export function getThemeList () {
  return request({
    url: `${prefixUrl}/webUserContact/themeList`,
    method: 'get',
  })
}

// 查看行业订阅列表
export function getIndustryList () {
  return request({
    url: `${prefixUrl}/webUserContact/industryList`,
    method: 'get',
  })
}

// 查看地域订阅列表
export function getRegionList () {
  return request({
    url: `${prefixUrl}/webUserContact/regionList`,
    method: 'get',
  })
}

// 订阅主题订阅列表
export function postThemeRss (obj) {
  return request({
    url: `${prefixUrl}/webUserContact/insert`,
    method: 'post',
    data: obj,
  })
}