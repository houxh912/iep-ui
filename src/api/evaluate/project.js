import request from '@/views/wenjuan/router/request'
const queryUrl = '/evaluate/evaluateproject'

export function getPage (params) {
  return request({
    url: `${queryUrl}/page`,
    params: params,
    method: 'get',
  })
}
// 项目详情接口根据id查找
export function getPageById (id) {
  return request({
    url: `${queryUrl}/${id}`,
    method: 'get',
  })
}

// 评测项目保存,状态变为'项目筹备'
export function createData (data) {
  return request({
    url: `${queryUrl}/preparation`,
    method: 'post',
    data: data,
  })
}

export function deleteData (id) {
  return request({
    url: `${queryUrl}/delete/${id}`,
    method: 'post',
  })
}
// 项目告知单保存
export function saveNotice (params) {
  return request({
    url: `${queryUrl}/approval`,
    method: 'post',
    data: params,
  })
}

//评测项目完善,状态不变
export function evaluateProject (params) {
  return request({
    url: `${queryUrl}/perfection`,
    method: 'post',
    data: params,
  })
}

// 添加成员
export function addMember (params) {
  return request({
    url: `${queryUrl}/member`,
    method: 'post',
    data: params,
  })
}
// 项目成员查询
export function findMemberById (id) {
  return request({
    url: `${queryUrl}/member/${id}`,
    method: 'get',
  })
}

export function dowloadByProject () {
  return request({
    url: '/evaluate/evaluatefile/download',
    method: 'post',
  })
}

// 全部评测项目查询
export function getProjectAll () {
  return request({
    url: `${queryUrl}/getAll`,
    method: 'get',
  })
}
// 参评单位分组
export function getGroup (params) {
  return request({
    url: '/evaluate/evaluategrouping/select',
    method: 'get',
    params: params,
  })
}

// 为指标体系查询分组
export function getGroupForIndex (params) {
  return request({
    url: '/evaluate/evaluategrouping/infoForIndexSystem',
    method: 'get',
    params: params,
  })
}

// 状态修改,状态变为'正在执行'、'正在收尾'、' 已结项'之一
export function changeStatus (params) {
  return request({
    url: `${queryUrl}/status`,
    method: 'post',
    data: params,
  })
}

// 关注项目
export function starProject (params) {
  return request({
    url: '/evaluate/evaluateprojectattention/save',
    method: 'post',
    data: params,
  })
}

// 取消关注项目
export function unStarProject (params) {
  return request({
    url: '/evaluate/evaluateprojectattention/delete',
    method: 'post',
    data: params,
  })
}
