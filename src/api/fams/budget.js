import request from '@/router/axios'

const prefixUrl = '/fams/budget'
// @/api/fams/budget

export function getBudgetYearList () {
  return request({
    url: `${prefixUrl}/year/list`,
    method: 'get',
  })
}

export function getBudgetYearById (id) {
  return request({
    url: `${prefixUrl}/year/${id}`,
    method: 'get',
  })
}
