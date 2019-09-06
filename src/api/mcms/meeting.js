import request from '@/router/axios'

// 新增会议
export function postMeetingmarketing (obj) {
  return request({
    url: '/mcms/meetingmarketing/create',
    method: 'post',
    data: obj,
  })
}
// 报名新增
export function postMeetingsignup (obj) {
  return request({
    url: '/mcms/meetingsignup/create',
    method: 'post',
    data: obj,
  })
}
//查看会议信息
export function getmeetingmarketing (id) {
  return request({
    url: `/mcms/meetingmarketing/${id}`,
    method: 'get',
  })
}
//查看会议信息列表
export function getMeetingmarketingList (query) {
  return request({
    url: '/mcms/meetingmarketing/page',
    method: 'get',
    params: query,
  })
}

