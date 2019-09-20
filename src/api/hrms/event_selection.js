import request from '@/router/axios'

const prefixUrl = '/hrms/iephrsplendormanage'
// @/api/hrms/iephrsplendormanage
export function getGloriousPeoplePage (query) {
  return request({
    url: `${prefixUrl}/page`,
    method: 'get',
    params: query,
  })
}
export function postGloriousPeopleCreate (obj) {
  return request({
    url: `${prefixUrl}/create`,
    method: 'post',
    data: obj,
  })
}
export function deleteGloriousPeople (id) {
  return request({
    url: `${prefixUrl}/delete/${id}`,
    method: 'post',
  })
}
export function updateGloriousPeople (obj) {
  return request({
    url: `${prefixUrl}/update`,
    method: 'post',
    data: obj,
  })
}

export function getGloriousById (id) {
  return request({
    url: `${prefixUrl}/${id}`,
    method: 'get',
  })
}
//指标list
export function getTargetlist (query) {
  return request({
    url: '/hrms/iephrsplendortarget/list',
    method: 'get',
    params: query,
  })
}
//排行榜

export function getRankinglist (query) {
  return request({
    url: '/hrms/iephrsplendortarget/getRankinglist',
    method: 'get',
    params: query,
  })
}