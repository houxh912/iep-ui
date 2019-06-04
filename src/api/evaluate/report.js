import request from '@/views/wenjuan/router/request'

//获取评测说明
export function getEvaluatingDescription (query) {
  return request({
    url: '/evaluate/evaluateintegratedchart/selectReportShows',
    method: 'get',
    params: query,
  })
}


//保存评测说明
export function saveEvaluatingDescription (data) {
  return request({
    url: '/evaluate/evaluateintegratedchart/saveReportShows',
    method: 'post',
    data: data,
  })
}

//问题属性分布情况
export function getProblemProperties (query) {
  return request({
    url: '/evaluate/evaluateintegratedchart/problemProperties',
    method: 'get',
    params: query,
  })
}

//查看得分情况
export function getScores (query) {
  return request({
    url: '/evaluate/evaluateintegratedchart/scores',
    method: 'get',
    params: query,
  })
}

//查看综合评测的评测说明
export function getReportShows (query) {
  return request({
    url: '/evaluate/evaluateintegratedchart/instructions',
    method: 'get',
    params: query,
  })
}

//查看得分表
export function getScoreTable (query) {
  return request({
    url: '/evaluate/evaluateintegratedchart/scoreTable',
    method: 'get',
    params: query,
  })
}


//日常评测  工单出具情况
export function getWorkOrderIssue (query) {
  return request({
    url: '/evaluate/evaluatedailychart/workOrderIssue',
    method: 'get',
    params: query,
  })
}

//日常评测  工单整改情况分析
export function getRectificationAnalysis (query) {
  return request({
    url: '/evaluate/evaluatedailychart/rectificationAnalysis',
    method: 'get',
    params: query,
  })
}

//日常评测  问题属性分布
export function getDailyProblemProperties (query) {
  return request({
    url: '/evaluate/evaluatedailychart/problemProperties',
    method: 'get',
    params: query,
  })
}

//查看综合评测的评测说明
export function getDailyReportShows (query) {
  return request({
    url: '/evaluate/evaluatedailychart/instructions',
    method: 'get',
    params: query,
  })
}

//根据项目id获取，并按参评单位分类  综合
export function evaluateintegratedchart (query) {
  return request({
    url: '/evaluate/evaluateintegratedchart/particularsByProject',
    method: 'get',
    params: query,
  })
}


//根据项目id获取，并按参评单位分类   日常
export function evaluatedailychart (query) {
  return request({
    url: '/evaluate/evaluatedailychart/particularsByProject',
    method: 'get',
    params: query,
  })
}
