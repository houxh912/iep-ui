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
//查看会议名单列表
export function geTmeetingsignup (query) {
  return request({
    url: '/mcms/meetingsignup/page',
    method: 'get',
    params: query,
  })
}
//修改报名会议名单人员状态
export function postMeetingsignupStatus (obj) {
  return request({
    url: '/mcms/meetingsignup/update/status',
    method: 'post',
    data: obj,
  })
}
//报名会议人员名单删除
export function deleteMeetingsignup (id) {
  return request({
    url: '/mcms/meetingsignup/delete/batch',
    method: 'post',
    data: id,
  })
}
//查询一级标签
export function getMeetingtagAlltag (query) {
  return request({
    url: '/admin/dict/getDictValue',
    method: 'get',
    params: query,
  })
}
//查询二级标签
export function getMeetingtagSontag (obj) {
  return request({
    url: '/mcms/meetingtag/sontag',
    method: 'post',
    data: obj,
  })
}
//根据code获取城市名称
export function getCodeName (query) {
  return request({
    url: '/crm/customer/code/namelist',
    method: 'post',
    data: query,
  })
}

export function getdic (obj) {
  return request({
    url: '/crm/customer/dictvo',
    method: 'post',
    data: obj,
  })
}
//修改会议
export function putMeetingmarketing (query) {
  return request({
    url: '/mcms/meetingmarketing/update',
    method: 'post',
    data: query,
  })
}