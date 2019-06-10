import request from '@/router/axios'


const prefixUrl = '/admin/contacts/custom'
// @/api/admin/contactscustom
export function getRelationshipManagePage (query) {
  return request({
    url: `${prefixUrl}/contacts/page`,
    method: 'get',
    params: query,
  })
}

export function getRelationshipList () {
  return request({
    url: `${prefixUrl}/contacts/list`,
    method: 'get',
  })
}

export function getTypeCountMap (query) {
  return request({
    url: `${prefixUrl}/page`,
    method: 'get',
    params: query,
  })
}

export function getRelationshipManageById (id) {
  return request({
    url: `${prefixUrl}/${id}`,
    method: 'get',
  })
}

export function readRelationshipManageBatch (ids) {
  return request({
    url: `${prefixUrl}/read_or_set/batch`,
    method: 'post',
    data: ids,
    params: {
      type: 8,
    },
  })
}

export function joinRelationship (obj) {
  return request({
    url: `${prefixUrl}/create`,
    method: 'post',
    data: obj,
  })
}

export function putRelationshipList (obj) {
  return request({
    url: `${prefixUrl}/update`,
    method: 'post',
    data: obj,
  })
}

export function deleteRelationshipList (id) {
  return request({
    url: `${prefixUrl}/delete/${id}`,
    method: 'post',
    data: [id],
  })
}