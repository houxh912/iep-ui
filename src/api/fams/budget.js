import request from '@/router/axios'

const prefixUrl = '/fams/budget'
// @/api/fams/budget

export function getBudgetYearList () {
  return request({
    url: `${prefixUrl}/year/list`,
    method: 'get',
  })
}

export function getBudgetQuarterList (yearId) {
  return request({
    url: `${prefixUrl}/quarter/${yearId}`,
    method: 'get',
  })
}

export function getBudgetYearById (id) {
  return request({
    url: `${prefixUrl}/year/${id}`,
    method: 'get',
  })
}

export function putBudgetYearRelation (obj) {
  return request({
    url: `${prefixUrl}/update/year/relation`,
    method: 'post',
    data: obj,
  })
}

export function putBudgetQuarterRelation (obj) {
  return request({
    url: `${prefixUrl}/update/quarter/relation`,
    method: 'post',
    data: obj,
  })
}
