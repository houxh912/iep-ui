import request from '@/router/axios'

const prefixUrl = '/fams/statistics'
// @/api/fams/statistics

export function getAssetsByDate (obj) {
  return request({
    url: `${prefixUrl}/assets`,
    method: 'post',
    data: obj,
  })
}

export function getPendingPage (query) {
  return request({
    url: `${prefixUrl}/pending/page`,
    method: 'get',
    params: query,
  })
}
// 取 3 条
export function getBudgetList () {
  return request({
    url: `${prefixUrl}/budget/list`,
    method: 'get',
  })
}
// 取 3 条
export function getOrgBudgetList (type) {
  return request({
    url: `${prefixUrl}/org/budget/list/${type}`,
    method: 'get',
  })
}
// 现金财务日记账
export function getCashDiaryList (query) {
  return request({
    url: `${prefixUrl}/org/cash/diary/list`,
    method: 'get',
    params: query,
  })
}
// 银行财务日记账
export function getBankDiaryList (query) {
  return request({
    url: `${prefixUrl}/org/bank/diary/list`,
    method: 'get',
    params: query,
  })
}
