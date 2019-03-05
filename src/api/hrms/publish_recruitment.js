import request from '@/router/axios'

const prefixUrl = '/hrms/publish_recruitment'
// @/api/hrms/publish_recruitment
export function getPublishRecruitmentPage (query) {
  return request({
    url: `${prefixUrl}/page`,
    method: 'get',
    params: query,
  })
}