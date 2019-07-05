import request from '@/router/axios'

const prefixUrl = '/fams/fund'
// @/api/fams/fund

export function getFundPage (query) {
  return request({
    url: `${prefixUrl}/page`,
    method: 'get',
    params: query,
  })
}

export function getFundRankList () {
  return request({
    url: `${prefixUrl}/rank/page`,
    method: 'get',
  })
}
export function getMyFund () {
  return request({
    url: `${prefixUrl}/my`,
    method: 'get',
  })
}

export function postFund (obj) {
  return request({
    url: `${prefixUrl}/create`,
    method: 'post',
    data: obj,
  })
}