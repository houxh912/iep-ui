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

export function getGroupAssetsByDate (obj) {
  return request({
    url: `${prefixUrl}/group/assets`,
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
export function getBossBudgetList () {
  return request({
    url: `${prefixUrl}/all/budget/list`,
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
// 支出 统计 类型 1-月  2-季  3-年
export function getExpenditureList (type) {
  return function (query) {
    return request({
      url: `${prefixUrl}/org/expenditure/list`,
      method: 'post',
      data: {
        ...query,
        type,
      },
    })
  }
}
// 收入 统计 类型 1-月  2-季  3-年
export function getIncomeList (type) {
  return function (query) {
    return request({
      url: `${prefixUrl}/org/income/list`,
      method: 'post',
      data: {
        ...query,
        type,
      },
    })
  }
}

export function getProjectPage (query) {
  return request({
    url: `${prefixUrl}/project/page`,
    method: 'get',
    params: query,
  })
}

export function getProjectPageByOrgId (orgId) {
  return function (query) {
    return request({
      url: `${prefixUrl}/project/page/${orgId}`,
      method: 'get',
      params: query,
    })
  }
}
// TODO:联盟项目核算
export function getAllOrgProjectPage () {
  return request({
    url: `${prefixUrl}/all/project/page`,
    method: 'get',
  })
}

export function getContractPage (query) {
  return request({
    url: `${prefixUrl}/contract/page`,
    method: 'get',
    params: query,
  })
}

export function getProjectDetailById (id) {
  return request({
    url: `${prefixUrl}/project/detail/${id}`,
    method: 'get',
  })
}

export function getProjectDetailPageById (id, isIncome) {
  return request({
    url: `${prefixUrl}/project/detail/page/${id}`,
    method: 'get',
    params: {
      isIncome,
    },
  })
}

export function getProjectInformationById (id) {
  return request({
    url: `prms/iepProjectInformation/${id}`,
    method: 'get',
  })
}

export function getUnionProjectPage (query) {
  return request({
    url: `${prefixUrl}/business_index/page`,
    method: 'get',
    params: query,
  })
}

export function getOrgProjectPage (query) {
  return request({
    url: `${prefixUrl}/business_index/org/page`,
    method: 'get',
    params: query,
  })
}

export function putUnionProject (obj) {
  return request({
    url: `${prefixUrl}/update/business_index`,
    method: 'post',
    data: obj,
  })
}

export function createUnionProject (year) {
  return request({
    url: `${prefixUrl}/create/business_index/${year}`,
    method: 'get',
  })
}

// 组织资产
export function getAssetsList () {
  return request({
    url: `${prefixUrl}/org/assets/list`,
    method: 'get',
  })
}
export function getAssetDataById (id) {
  return request({
    url: `${prefixUrl}/org/assets/${id}`,
    method: 'get',
  })
}

// 组织资产统计排名
export const getOrgAssetsById = (id) => {
  return request({
    url: `${prefixUrl}/org/assets_ranking/${id}`,
    method: 'get',
  })
}

// 组织资产统计排名
export const getOrgProfits = (orgId, year) => {
  return request({
    url: `${prefixUrl}/org/profits/losses`,
    method: 'get',
    params: {
      orgId,
      year,
    },
  })
}