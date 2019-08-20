import request from '@/router/axios'

const prefixUrl = '/admin'
// @/api/wel/relationship_manage
export function getRelationshipManagePage (query) {
  return request({
    url: `${prefixUrl}/contacts/custom/contacts/page`,
    method: 'get',
    params: query,
  })
}

//我关注的分页
export function getMyAttentionPage (query) {
  return request({
    url: '/cpms/iepuserfollow/address/page',
    method: 'get',
    params: query,
  })
}

export function getRelationshipList () {
  return request({
    url: `${prefixUrl}/contacts/custom/group/list`,
    method: 'get',
  })
}

export function getCustomList () {
  return request({
    url: `${prefixUrl}/contacts/custom/list`,
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

export function getMyMaster (query) {
  return request({
    url: '/cpms/iepcommoncharacterrelations/pageMyMaster',
    method: 'get',
    params: query,
  })
}

export function getMyApprentice (query) {
  return request({
    url: '/cpms/iepcommoncharacterrelations/pageMyApprentice',
    method: 'get',
    params: query,
  })
}

export function getMyMasterContactList () {
  return request({
    url: 'cpms/iepcommoncharacterrelations/listMyMasterDiy',
    method: 'get',
  })
}

export function getMyApprenticeContactList () {
  return request({
    url: 'cpms/iepcommoncharacterrelations/listMyApprenticeDiy',
    method: 'get',
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
export function removeRelationshipBatch (customId,userId) {
  return request({
    url: `${prefixUrl}/custom/relation/delete/batch`,
    method: 'post',
    data: {
      customId,
      userId,
    },
  })
}

export function deleteReleaseApprenticeById (apprenticeId) {
  return request({
    url: `/cpms/iepcommoncharacterrelations/delApprenticeRelation/${apprenticeId}`,
    method: 'post',
    data: [apprenticeId],
  })
}
export function deleteReleaseMentorById (mentorId) {
  return request({
    url: `/cpms/iepcommoncharacterrelations/delMentorRelation/${mentorId}`,
    method: 'post',
    data: [mentorId],
  })
}

export function getRelationList () {
  return request({
    url: `${prefixUrl}/contacts/custom/list`,
    method: 'get',
  })
}