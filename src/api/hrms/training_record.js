import request from '@/router/axios'

const prefixUrl = '/hrms/training_record'
// @/api/hrms/training_record
export function getTrainingRecordPage (query) {
  return request({
    url: `${prefixUrl}/page`,
    method: 'get',
    params: query,
  })
}