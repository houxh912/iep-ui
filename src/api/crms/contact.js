import request from '@/router/axios'

const crmsUrl = '/crms/contact'

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
    url: `${crmsUrl}/update`,
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
