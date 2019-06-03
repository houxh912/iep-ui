import request from '@/wenjuan/router/request'
const queryUrl = '/evaluate/evaluateintegratedreview'

//获取指标体系内容
export function getIndexSydtems (query) {
  return request({
    url: `${queryUrl}/getIndexSydtems`,
    method: 'get',
    params: query,
  })
}

//获取参评单位  /evaluategrouping/select
export function getGroups (query) {
  return request({
    url: '/evaluate/evaluategrouping/select',
    method: 'get',
    params: query,
  })
}
//根据项目id和部门id和指标id获取单条工单内容
export function getInfo (query) {
  return request({
    url: `${queryUrl}/getInfo`,
    method: 'get',
    params: query,
  })
}


//更新审核流转
export function updateReviewFlow (data) {
  return request({
    url: `${queryUrl}/update`,
    method: 'post',
    data: data,
  })
}

//获取同级/evaluateintegratedreview/statistical
export function statistical (query) {
  return request({
    url: `${queryUrl}/statistical`,
    method: 'get',
    params: query,
  })
}

//获取项目成员
export function getMembers (id) {
  return request({
    url: `/evaluate/evaluateproject/member/${id}`,
    method: 'get',
  })
}

//获取工单汇总
export function getSummary (query) {
  return request({
    url: '/evaluate/evaluatedailyreview/statistic',
    method: 'get',
    params: query,
  })
}

//获取工单汇总 根据参评单位
export function getSummaryByDept (query) {
  return request({
    url: '/evaluate/evaluatedailyreview/pageByEligibleUnitsId',
    method: 'get',
    params: query,
  })
}

//待我审核
export function getPageByUser (query) {
  return request({
    url: '/evaluate/evaluatedailyreview/pageByUser',
    method: 'get',
    params: query,
  })
}

//根据工单id单条查看
export function getWorkById (id) {
  return request({
    url: `/evaluate/evaluatedailyreview/${id}`,
    method: 'get',
  })
}

//根据项目id获取指标体系
export function getSystemIndex (params) {
  return request({
    url: '/evaluate/evaluatedailyreview/getIndexSydtems',
    method: 'get',
    params: params,
  })
}

//新建工单
export function saveWork (data) {
  return request({
    url: '/evaluate/evaluatedailyreview/save',
    method: 'post',
    data: data,
  })
}

//修改工单
export function updateWork (data) {
  return request({
    url: '/evaluate/evaluatedailyreview/update',
    method: 'post',
    data: data,
  })
}


//获取日常评测列表
export function getDailyList (params) {
  return request({
    url: '/evaluate/evaluatedailyreview/particularsByProject',
    method: 'get',
    params: params,
  })
}

// 获取综合评测列表
export function getComList (params) {
  return request({
    url: '/evaluate/evaluateintegratedreview/particularsByProject',
    method: 'get',
    params: params,
  })
}
