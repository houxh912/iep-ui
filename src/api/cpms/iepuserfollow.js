import request from '@/router/axios'
const prefixUrl = '/cpms/iepuserfollow'

// 关注用户
export function followById (id) {
  return request({
    url: `${prefixUrl}/follow/${id}`,
    method: 'post',
  })
}

// 取关用户
export function unfollowById (id) {
  return request({
    url: `${prefixUrl}/unfollow/${id}`,
    method: 'post',
  })
}
