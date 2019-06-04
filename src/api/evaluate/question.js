import request from '@/views/wenjuan/router/request'
const queryUrl = '/question/dna_questionnaire'

export function createData (data) {
  return request({
    url: `${queryUrl}/create`,
    method: 'post',
    data: data,
  })
}
//更新问卷
export function updateData (data) {
  return request({
    url: `${queryUrl}/update`,
    method: 'post',
    data: data,
  })
}
//获取列表页面
export function getList (params) {
  return request({
    url: `${queryUrl}/page`,
    method: 'get',
    params: params,
  })
}
//删除
export function deleteData (id) {
  return request({
    url: `${queryUrl}/delete/${id}`,
    method: 'post',
  })
}
//查看详情
export function getDetail (id) {
  return request({
    url: `${queryUrl}/${id}`,
    method: 'get',
  })
}

//发布
export function release (data) {
  return request({
    url: `${queryUrl}/update_status`,
    method: 'post',
    data: data,
  })
}
//答案详情
export function getDetailAnswer (params) {
  return request({
    url: '/question/dna_answer/page',
    method: 'get',
    params: params,
  })
}
//回答问卷
export function answerQuestion (data) {
  return request({
    url: '/question/dna_answer/create',
    method: 'post',
    data: data,
  })
}

//获取当前用户id所回答过的问卷
export function getQuestionnaireIdList () {
  return request({
    url: '/question/dna_answer/getQuestionnaireIdList',
    method: 'get',
  })
}

//获取项目列表
export function getProject () {
  return request({
    url: '/evaluate/evaluateproject/getAll',
    method: 'get',
  })
}
//根据项目id获取参评单位
export function getGroupDept (id) {
  return request({
    url: `/evaluate/evaluategrouping/select?projectId=${id}`,
    method: 'get',
  })
}
//获取一道题的统计
export function getStatistic (id) {
  return request({
    url: `/question/statistic/${id}`,
    method: 'get',
  })
}
//   /statistic/getRePercent/{questionId}
export function getRePercent (id) {
  return request({
    url: `/question/statistic/getRePercent/${id}`,
    method: 'get',
  })
}

//根据指标id获取指标信息
export function getIndexById (id) {
  return request({
    url: `/evaluate/evaluateindexsystemrelation/${id}`,
    method: 'get',
  })
}

//根据项目Id获取指标体系列表 getIndexList
export function getIndexList (params) {
  return request({
    url: '/evaluate/evaluateindexsystem/listForIndexSystem',
    method: 'get',
    params: params,
  })
}

// 保存时候新增删除
export function automaticGrading (data) {
  return request({
    url: '/evaluate/evaluateindexsystemrelation/autoGradingStatus',
    method: 'post',
    data: data,
  })
}
