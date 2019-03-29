import request from '@/router/axios'

const visitUrl = '/crm/visitingRecord'
// 拜访记录查询
export function fetchVisitList (params) {
  return request({
    url: `${visitUrl}/page`,
    method: 'get',
    params: params,
  })
}
// 拜访记录-编辑
export function updateVisit (obj) {
  return request({
    url: `${visitUrl}/update`,
    method: 'post',
    data: obj,
  })
}
// 拜访记录-新增
export function createVisit (obj) {
  return request({
    url: `${visitUrl}/create
    `,
    method: 'post',
    data: obj,
  })
}
// 拜访记录-删除
export function deleteVisit (contactId) {
  return request({
    url: `${visitUrl}/delete/batch/${contactId}`,
    method: 'post',
    data: contactId,
  })
}
//拜访记录通过id查询
export function contactById (contactId) {
  return request({
    url: `${visitUrl}/delete/batch/${contactId}`,
    method: 'post',
    data: [contactId],
  })
}
export function contactBatchById (ids) {
  return request({
    url: `${visitUrl}delete/batch/${ids}`,
    method: 'post',
    data: [ids],
  })
}