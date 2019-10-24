import request from '@/router/axios'
const prefixUrl = '/ics/questionType'

export function getQuestionTypeTree (query) {
  return request({
    url: `${prefixUrl}/getTree`,
    method: 'get',
    params: query,
  })
}

export function postQuestionType (data) {
  return request({
    url: `${prefixUrl}/saveOrUpdateOne`,
    method: 'post',
    data: data,
  })
}

export function deleteQuestionType (data) {
  return request({
    url: `${prefixUrl}/deleteOne`,
    method: 'post',
    params: data,
  })
}
