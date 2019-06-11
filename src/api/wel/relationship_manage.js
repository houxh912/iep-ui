import request from '@/router/axios'


const prefixUrl = '/admin'
// @/api/admin/contactscustom
export function getRelationshipManagePage (query) {
  return request({
    url: `${prefixUrl}/contacts/custom/contacts/page`,
    method: 'get',
    params: query,
  })
}

export function getRelationshipList () {
  return request({
    url: `${prefixUrl}/contacts/custom/contacts/list`,
    method: 'get',
  })
}

export function getTypeCountMap (query) {
  return request({
    url: `${prefixUrl}/contacts/custom/page`,
    method: 'get',
    params: query,
  })
}

export function getRelationshipManageById (id) {
  return request({
    url: `${prefixUrl}/contacts/custom/${id}`,
    method: 'get',
  })
}

export function readRelationshipManageBatch (ids) {
  return request({
    url: `${prefixUrl}/contacts/custom/read_or_set/batch`,
    method: 'post',
    data: ids,
    params: {
      type: 8,
    },
  })
}

export function joinRelationship (obj) {
  return request({
    url: `${prefixUrl}/contacts/custom/create`,
    method: 'post',
    data: obj,
  })
}

export function putRelationshipList (obj) {
  return request({
    url: `${prefixUrl}/contacts/custom/update`,
    method: 'post',
    data: obj,
  })
}

export function deleteRelationshipList (id) {
  return request({
    url: `${prefixUrl}/contacts/custom/delete/${id}`,
    method: 'post',
    data: [id],
  })
}

export function joinGroup (obj) {
  return request({
    url: `${prefixUrl}/custom/relation/create`,
    method: 'post',
    data: obj,
  })
}

export function removeRelationshipById (customId,useId) {
  return request({
    url: `${prefixUrl}/custom/relation/delete/batch`,
    method: 'post',
    data: { 
      userId:useId,
      customId:customId,
    },
  })
}
export function removeRelationshipBatch (ids) {
  return request({
    url: `${prefixUrl}/custom/relation/delete/batch`,
    method: 'post',
    data: ids,
  })
}