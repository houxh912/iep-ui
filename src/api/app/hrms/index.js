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

export const getRecruitDetail = (id) => {
  return request({
    url: `${prefixUrl}/training/${id}`,
    method: 'get',
  })
}

// 国脉人
export const getRecruitDetailPage = (obj) => {
  return request({
    url: `${prefixUrl}/hr_detail/page`,
    method: 'get',
    params: obj,
  })
}

// 频道页国脉人统计
export const getRecruitCount = () => {
  return request({
    url: `${prefixUrl}/count`,
    method: 'get',
  })
}

// 今日寿星
export const getRecruitBirthday = () => {
  return request({
    url: `${prefixUrl}/birthday`,
    method: 'get',
  })
}
