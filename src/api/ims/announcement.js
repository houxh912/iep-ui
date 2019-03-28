import request from '@/router/axios'

const prefixUrl = '/ims/announcement'
// @/api/ims/announcement
export function getAnnouncementPage (query) {
  return request({
    url: `${prefixUrl}/page`,
    method: 'get',
    params: query,
  })
}

export function getAnnouncementById (id) {
  return request({
    url: `${prefixUrl}/${id}`,
    method: 'get',
  })
}
