import request from '@/router/axios'

const prefixUrl = '/admin/wel'
// @/api/wel/index
export function getAside () {
  return request({
    url: `${prefixUrl}/aside`,
    method: 'get',
  })
}

export function getIndex () {
  return request({
    url: `${prefixUrl}/index`,
    method: 'get',
  })
}

export function getMaterials () {
  return request({
    url: '/mlms/material/wel/list',
    method: 'get',
  })
}