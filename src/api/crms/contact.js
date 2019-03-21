import request from '@/router/axios'

const crmsUrl = '/crm/iepclientcontact'

export function fetchList (query) {
  return request({
    url: `${crmsUrl}/page`,
    method: 'get',
    params: query,
  })
}

export function createData (obj) {
  return request({
    url: `${crmsUrl}/create`,
    method: 'post',
    data: obj,
  })
}

export function updateData (obj) {
  return request({
    url: `${crmsUrl}/put`,
    method: 'post',
    data: obj,
  })
}

export function deleteDataById (id) {
  return request({
    url: `${crmsUrl}/delete/${id}`,
    method: 'post',
  })
}
export function editList (id) {
  return request({
    url: `${crmsUrl}/${id}`,
    method: 'get',
  })
}
