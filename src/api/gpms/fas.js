import request from '@/router/axios'
const prefixUrl = '/prms/fas'
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

export function getOrgBudgetList (query) {
  return request({
    url: '/prms/income/org',
    method: 'get',
    params: query,
  })
}

export function getProjectPaymentPlanList (id) {
  return request({
    url: `/prms/iepProjectInformation/getPaymentList/${id}`,
    method: 'get',
  })
}
export function getIssuedList (id) {
  return request({
    url: `/prms/iepProjectInformation/getAmount/${id}`,
    method: 'get',
  })
}
export function updatePayment (obj) {
  return request({
    url: '/prms/iepProjectInformation/updateAmount',
    method: 'post',
    data: obj,
  })
}
export function updateIssued (obj) {
  return request({
    url: '/prms/iepProjectInformation/updateAmount',
    method: 'post',
    data: obj,
  })
}