import request from '@/router/axios'
const prefixUrl = '/ics/question'

export function getQuestionPage (query) {
  return request({
    url: `${prefixUrl}/getPage`,
    method: 'get',
    params: query,
  })
}

export function saveOrUpdateOne (data) {
  return request({
    url: `${prefixUrl}/saveOrUpdateOne`,
    method: 'post',
    data: data,
  })
}

export function getQuestionById (params) {
  return request({
    url: `${prefixUrl}/getOne`,
    method: 'get',
    params: params,
  })
}

export function deleteQuestion (data) {
  return request({
    url: `${prefixUrl}/deleteOne`,
    method: 'post',
    params: data,
  })
}
