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
