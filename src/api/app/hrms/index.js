import request from '@/router/axios'
const prefixUrl = '/hrms/channel_recruit'

export const getPostList = (params) => {
  return request({
    url: `${prefixUrl}/list`,
    method: 'get',
    params: params,
  })
}

export const getNewestList = (params) => {
  return request({
    url: `${prefixUrl}/training_newest`,
    method: 'get',
    params: params,
  })
}

export const getNoticeList = (params) => {
  return request({
    url: `${prefixUrl}/training_notice`,
    method: 'get',
    params: params,
  })
}

export const getPastList = (params) => {
  return request({
    url: `${prefixUrl}/training_past`,
    method: 'get',
    params: params,
  })
}

export const getRecruitPage = (params) => {
  return request({
    url: `${prefixUrl}/training_page`,
    method: 'get',
    params: params,
  })
}
