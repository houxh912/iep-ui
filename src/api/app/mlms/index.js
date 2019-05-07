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
    url: '/mlms/material/page',
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

// 贡献帮
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
