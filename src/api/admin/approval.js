import request from '@/router/axios'

const prefixUrl = '/admin/approval'
// @/api/admin/approval
// 待我审批
export function getExaminApprovalPage (query) {
  return getPage(query, 1)
}
// 我已审批
export function getAlreadyApprovalPage (query) {
  return getPage(query, 2)
}

function getPage (query, type) {
  return request({
    url: `${prefixUrl}/page`,
    method: 'get',
    params: {
      ...query,
      type,
    },
  })
}

export function postApproval (obj) {
  return request({
    url: `${prefixUrl}/create`,
    method: 'post',
    data: obj,
  })
}

export function putApproval (obj) {
  return request({
    url: `${prefixUrl}/update`,
    method: 'post',
    data: obj,
  })
}
export function postResumeBlacklist (obj) {
  return request({
    url: `${prefixUrl}/create`,
    method: 'post',
    params: {
      isBlacklist: true,
    },
    data: obj,
  })
}

export function getApprovalById (id) {
  return request({
    url: `${prefixUrl}/${id}`,
    method: 'get',
  })
}

export function postToResume (obj) {
  return request({
    url: `${prefixUrl}/to_resume`,
    method: 'post',
    data: obj,
  })
}

export function postToBlacklist (obj) {
  return request({
    url: `${prefixUrl}/to_blacklist`,
    method: 'post',
    data: obj,
  })
}
export function postToTalent (ids) {
  return request({
    url: `${prefixUrl}/to_talent`,
    method: 'post',
    data: ids,
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
export function changeApprovalStatus (ids, status) {
  return request({
    url: `${prefixUrl}/status/batch`,
    method: 'post',
    data: {
      ids,
      status,
    },
  })
}