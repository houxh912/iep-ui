import request from '@/router/axios'

const prefixUrl = '/hrms/administrative_approval'
// @/api/wel/administrative_approval
function getAdministrativeApprovalPage (query, type) {
  return request({
    url: `${prefixUrl}/page`,
    method: 'get',
    params: { ...query, type },
  })
}
export function getExaminApprovalPage (query) {
  return getAdministrativeApprovalPage(query, 1)
}

export function getAlreadyApprovalPage (query) {
  return getAdministrativeApprovalPage(query, 2)
}

export function getInitiatePage (query) {
  return getAdministrativeApprovalPage(query, 3)
}

export function getCCPage (query) {
  return getAdministrativeApprovalPage(query, 4)
}

export function postApproval (obj) {
  return request({
    url: `${prefixUrl}/create`,
    method: 'post',
    data: obj,
  })
}

export function deleteApprovalById (id) {
  return request({
    url: `${prefixUrl}/delete/batch`,
    method: 'post',
    data: [id],
  })
}

export function deleteApprovalBatch (ids) {
  return request({
    url: `${prefixUrl}/delete/batch`,
    method: 'post',
    data: ids,
  })
}

export function reviewApprovalById (id, status) {
  return request({
    url: `${prefixUrl}/status/batch`,
    method: 'post',
    data: {
      ids: [id],
      status,
    },
  })
}

export function reviewApprovaBatch (ids,status) {
  return request({
    url: `${prefixUrl}/status/batch`,
    method: 'post',
    data: {
      ids: ids,
      status,
    },
  })
}

