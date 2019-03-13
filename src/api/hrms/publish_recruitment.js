import request from '@/router/axios'

const prefixUrl = '/hrms/publish_recruitment'
// @/api/hrms/publish_recruitment
export function getPublishRecruitmentPage (query) {
  return request({
    url: `${prefixUrl}/page`,
    method: 'get',
    params: query,
  })
}

export function getPublishRecruitmentById (id) {
  return request({
    url: `${prefixUrl}/${id}`,
    method: 'get',
  })
}

export function postPublishRecruitment (obj) {
  return request({
    url: `${prefixUrl}/create`,
    method: 'post',
    data: obj,
  })
}

export function putPublishRecruitment (obj) {
  return request({
    url: `${prefixUrl}/update`,
    method: 'post',
    data: obj,
  })
}

export function deletePublishRecruitmentById (id) {
  return request({
    url: `${prefixUrl}/remove/batch`,
    method: 'post',
    data: [id],
  })
}

export function shelfPublishRecruitmentById (id) {
  return statusPublishRecruitment([id], 2)
}
export function obtainedPublishRecruitmentById (id) {
  return statusPublishRecruitment([id], 3)
}
export function shelfPublishRecruitmentBatch (ids) {
  return statusPublishRecruitment(ids, 2)
}
export function obtainedPublishRecruitmentBatch (ids) {
  return statusPublishRecruitment(ids, 3)
}

function statusPublishRecruitment (ids, status) {
  return request({
    url: `${prefixUrl}/status/batch`,
    method: 'post',
    data: {
      ids: ids,
      status: status,
    },
  })
}