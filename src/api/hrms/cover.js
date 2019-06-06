import request from '@/router/axios'

const prefixUrl = '/hrms/cover'
const detailsUrl = '/hrms/details'
const kpiUrl = '/hrms/kpi'

export function getAssessmentPage (params) {
  return request({
    url: `${prefixUrl}/page`,
    method: 'get',
    params: params,
  })
}

export function createEvaluatio (obj) {
  return request({
    url: `${detailsUrl}/create`,
    method: 'post',
    data: obj,
  })
}

export function deleteEvaluation (obj) {
  return request({
    url: `${detailsUrl}/create`,
    method: 'post',
    data: obj,
  })
}

// 查询创建考核所需内容
export function getEvaluationCreateKpi (id) {
  return request({
    url: `${prefixUrl}/create_kpi/${id}`,
    method: 'get',
  })
}

// 待考核分页
export function getEvaluationKpiPage (params) {
  return request({
    url: `${prefixUrl}/kpi_page`,
    method: 'get',
    params: params,
  })
}

// 考核
export function createKpi (obj) {
  return request({
    url: `${kpiUrl}/create`,
    method: 'post',
    data: obj,
  })
}
