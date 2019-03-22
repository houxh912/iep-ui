import request from '@/router/axios'

const contactrecordUrl = '/crm/iepcontactrecord'
const clientprograminfoUrl = '/crm/iepclientprograminfo'

// 拜访记录查询
export function fetchVisitList (params) {
  return request({
    url: `${contactrecordUrl}/page`,
    method: 'get',
    params: params,
  })
}

// 拜访记录-编辑
export function updateVisit (obj) {
  return request({
    url: `${contactrecordUrl}/update`,
    method: 'post',
    data: obj,
  })
}

// 拜访记录-新增
export function createVisit (obj) {
  return request({
    url: `${contactrecordUrl}/add`,
    method: 'post',
    data: obj,
  })
}

// 拜访记录-删除
export function deleteVisit (contactId) {
  return request({
    url: `${contactrecordUrl}/remove/batch/${contactId}`,
    method: 'post',
    data: contactId,
  })
}

// 方案-查询
export function fetchProgrammeList (query) {
  return request({
    url: `${clientprograminfoUrl}/page`,
    method: 'get',
    params: query,
  })
}

// 方案-新增
export function createProgramme (obj) {
  return request({
    url: `${clientprograminfoUrl}/create`,
    method: 'post',
    data: obj,
  })
}

// 方案-编辑
export function updateProgramme (obj) {
  return request({
    url: `${clientprograminfoUrl}/put`,
    method: 'post',
    data: obj,
  })
}

// 方案-删除
export function deleteProgramme (programIds) {
  return request({
    url: `${clientprograminfoUrl}/delete/${programIds}`,
    method: 'post',
  })
}