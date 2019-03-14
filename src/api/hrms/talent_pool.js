import request from '@/router/axios'

const prefixUrl = '/hrms/talent_pool'
// @/api/hrms/talent_pool
// 人才库
export function getTalentPoolPage (query) {
  return getPage(query, 1)
}
// 简历库
export function getResumeLibraryPage (query) {
  return getPage(query, 2)
}
// 黑名单
export function getResumeBlacklistPage (query) {
  return getPage(query, 3)
}

function getPage (query, type) {
  return request({
    url: `${prefixUrl}/page`,
    method: 'get',
    params: {
      ...query,
      type,
    },
  })
}

export function postTalentPool (obj) {
  return request({
    url: `${prefixUrl}/create`,
    method: 'post',
    data: obj,
  })
}

export function putTalentPool (obj) {
  return request({
    url: `${prefixUrl}/update`,
    method: 'post',
    data: obj,
  })
}

export function getTalentPoolById (id) {
  return request({
    url: `${prefixUrl}/${id}`,
    method: 'get',
  })
}