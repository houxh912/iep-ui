import request from '@/router/axios'
const prefixUrl = '/ics/question'

export function getQuestionPage (query) {
  return request({
    url: `${prefixUrl}/getPage`,
    method: 'get',
    params: query,
  })
}
