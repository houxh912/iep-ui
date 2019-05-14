import request from '@/router/axios'

const prefixUrl = '/hrms/suggestion'
// @/api/hrms/suggestion
export function getSuggestionIssuePage (query) {
  return request({
    url: `${prefixUrl}/pageIssue`,
    method: 'get',
    params: query,
  })
}
export function postSuggestion (obj) {
  return request({
    url: `${prefixUrl}/create`,
    method: 'post',
    data: obj,
  })
}
export function putSuggestion (obj) {
  return request({
    url: `${prefixUrl}/update`,
    method: 'post',
    data: obj,
  })
}
export function deleteSuggestionById (id) {
  return request({
    url: `${prefixUrl}/delete/batch`,
    method: 'post',
    data: [id],
  })
}
export function deleteSuggestionBatch (ids) {
  return request({
    url: `${prefixUrl}/delete/batch`,
    method: 'post',
    data: ids,
  })
}