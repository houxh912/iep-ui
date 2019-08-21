import request from '@/router/axios'
const prefixUrl = '/prms/payment'
const InformationUrl = '/prms/iepProjectInformation'
// @/api/gpms/fas
export function getPaymentPlanPage (obj) {
  return request({
    url: `${prefixUrl}/page`,
    method: 'get',
    params: obj,
  })
}
export function getOrgPaymentPlanPage (obj) {
  return request({
    url: `${prefixUrl}/org/page`,
    method: 'get',
    params: obj,
  })
}
export function getOrgPaymentPlanPageByOrgId (orgId) {
  return function (query) {
    return request({
      url: `${prefixUrl}/org/page/${orgId}`,
      method: 'get',
      params: query,
    })
  }
}

export function getUnionBudgetList (year) {
  return request({
    url: `/prms/income/group/${year}`,
    method: 'get',
  })
}

export function getOrgBudgetList (query) {
  return request({
    url: '/prms/income/org',
    method: 'get',
    params: query,
  })
}

export function getOrgMonthBudgetList (query) {
  return request({
    url: '/prms/income/org/month',
    method: 'get',
    params: query,
  })
}

export function getProjectPaymentPlanList (id) {
  return request({
    url: `${InformationUrl}/getPaymentList/${id}`,
    method: 'get',
  })
}

export function getProjectInvoiceingList (id) {
  return request({
    url: `/fams/statistics/project/invoiceing/${id}`,
    method: 'get',
  })
}
export function getIssuedList (id) {
  return request({
    url: `${InformationUrl}/getAmount/${id}`,
    method: 'get',
  })
}
export function updatePayment (obj) {
  return request({
    url: `${InformationUrl}/updateAmount`,
    method: 'post',
    data: obj,
  })
}
export function updateIssued (obj) {
  return request({
    url: `${InformationUrl}/updateAmount`,
    method: 'post',
    data: obj,
  })
}
// 项目公海
export function getProjectPage (parmas) {
  return request({
    url: `${InformationUrl}/page`,
    method: 'get',
    params: parmas,
  })
}
// 公海取消认领
export function statusCancel (list) {
  return request({
    url: `${InformationUrl}/status/cancel`,
    method: 'post',
    data: { ids: list },
  })
}
// 公海确定认领
export function statusDefine (list) {
  return request({
    url: `${InformationUrl}/status/define`,
    method: 'post',
    data: { ids: list },
  })
}