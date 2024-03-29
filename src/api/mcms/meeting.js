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
//删除会议
export function meetingmarketingDelete (ids) {
  return request({
    url: '/mcms/meetingmarketing/delete/batch',
    method: 'post',
    data: ids,
  })
}
//根据code获取城市名字
export function getCode (query) {
  return request({
    url: '/crm/customer/code/name',
    method: 'get',
    params: query,
  })
}
//分页查询我报名的会议
export function getMymeetingPage (query) {
  return request({
    url: '/mcms/meetingmarketing/mymeeting/page',
    method: 'get',
    params: query,
  })
}
//修改报名人员会议信息
export function putMeetingsignup (query) {
  return request({
    url: '/mcms/meetingsignup/update',
    method: 'post',
    data: query,
  })
}
//查看会议列表
export function getMeetingmarketingStatus (query) {
  return request({
    url: '/mcms/meetingmarketing/status/page',
    method: 'get',
    params: query,
  })
}
//修改会议状态
export function postMeetingsignupUpdateStatus (query) {
  return request({
    url: '/mcms/meetingmarketing/update/status',
    method: 'post',
    data: query,
  })
}
//查看我报名的会议名单列表
export function getMeetingsignupUserPage (query) {
  return request({
    url: '/mcms/meetingsignup/user/page',
    method: 'get',
    params: query,
  })
}
//审核会议
export function postMeetingmarketingAudit (query) {
  return request({
    url: '/mcms/meetingmarketing/audit',
    method: 'post',
    data: query,
  })
}