import request from '@/router/axios'
export const prefixUrl = '/cpms/iepcommoncharacterrelations'

export function addMasterWorker (obj) {
  return request({
    url: `${prefixUrl}/addMasterWorker`,
    method: 'post',
    data: obj,
  })
}

export function getPageRecommend (params) {
  return request({
    url: `${prefixUrl}/pageRecommend`,
    method: 'get',
    params: params,
  })
}

// 根据拜师消息id查询土地info
export function getApprenticeUser (characterId) {
  return request({
    url: `${prefixUrl}/user/${characterId}`,
    method: 'get',
  })
}

// 是否确认收徒
export function characterIsDetermine (type, data) {
  return request({
    url: `${prefixUrl}/isDetermine`,
    method: 'post',
    params: type,
    data: data,
  })
}

