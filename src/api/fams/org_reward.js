import request from '@/router/axios'

const prefixUrl = '/fams/total/org_reward'
// @/api/fams/org_reward

export function getOrgRewardPage (query) {
  return request({
    url: `${prefixUrl}/page`,
    method: 'get',
    params: query,
  })
}

export function postOrgReward (obj) {
  
  return request({
    url: `${prefixUrl}/create`,
    method: 'post',
    data: obj,
  })
}
