import request from '@/router/axios'

const prefixUrl = '/fams/total/group_reward'
// @/api/fams/group_reward

//组织
export function getGroupRewardPage (query) {
  return request({
    url: `${prefixUrl}/page`,
    method: 'get',
    params: query,
  })
}
//用户
export function getGroupRewardUserPage (query) {
  return request({
    url: `${prefixUrl}/user/page`,
    method: 'get',
    params: query,
  })
}

export function postGroupReward (obj) {
  
  return request({
    url: `${prefixUrl}/create`,
    method: 'post',
    data: obj,
  })
}
export function postGroupRewardUser (obj) {
  return request({
    url: `${prefixUrl}_user/create`,
    method: 'post',
    data: obj,
  })
}
