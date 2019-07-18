import request from '@/router/axios'
const prefixUrl = '/prms/iepProjectInformation'

export function getTableData (obj) {
  return request({
    url: `${prefixUrl}/page`,
    method: 'get',
    params: obj,
  })
}

// 供给邮件关联使用，与上面的链接一模一样
export function getProjectList (obj) {
  return request({
    url: `${prefixUrl}/page`,
    method: 'get',
    params: obj,
  })
}

export function createData (obj) {
  return request({
    url: `${prefixUrl}`,
    method: 'post',
    data: obj,
  })
}

// 编辑 -- 立项申请、审批
export function updateData (obj) {
  return request({
    url: `${prefixUrl}/edit`,
    method: 'post',
    data: obj,
  })
}

// 详情
export function getDataDetail (id) {
  return request({
    url: `${prefixUrl}/${id}`,
    method: 'get',
  })
}

export function deleteData (id) {
  let ids = typeof id === 'object' ? id : [id]
  return request({
    url: `${prefixUrl}/delete/batch`,
    method: 'post',
    data: ids,
  })
}

// 审批列表
export function getApprovalList (obj) {
  return request({
    url: `${prefixUrl}/projectApproval`,
    method: 'get',
    params: obj,
  })
}
// 推荐项目名字
export function getRecommendedProjectList (obj) {
  return request({
    url: `${prefixUrl}/recommendProjectName`,
    method: 'post',
    data: obj,
  })
}
// 推荐项目经理
export function getRecommendedHandlesList (obj) {
  return request({
    url: `${prefixUrl}/recommendManagerByTag`,
    method: 'post',
    data: obj,
  })
}
// 推荐市场经理
export function getRecommendedMktManagerList (obj) {
  return request({
    url: `${prefixUrl}/recommendMarketByTag`,
    method: 'post',
    data: obj,
  })
}
// //变更
export function transferManagerList (obj) {
  return request({
    url: `${prefixUrl}/change/handle`,
    method: 'post',
    data: obj,
  })
}
//审核
export function approvalById (obj) {
  return request({
    url: `${prefixUrl}/updateApproval`,
    method: 'post',
    data: obj,
  })
}
//撤回
export function withdrawById (obj) {
  return request({
    url: `${prefixUrl}/batch/withdrawal`,
    method: 'post',
    data: obj,
  })
}
//统计页面
export function getMyPosition (obj) {
  return request({
    url: 'prms/iep-project-myposition/getDetail',
    method: 'get',
    params: obj,
  })
}
//自动生成项目名称
export function generationProject (obj) {
  return request({
    url: `${prefixUrl}/generationProject`,
    method: 'post',
    data: obj,
  })
}