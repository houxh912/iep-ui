import request from '@/router/axios'
export const prefixUrl = '/cpms/custom_product'

export function putCustomProdect (obj) {
  return request({
    url: `${prefixUrl}/create`,
    method: 'post',
    data: obj,
  })
}
export function getExaminePage () {
  return request({
    url: `${prefixUrl}/examine_page`,
    method: 'get',
  })
}
export function getMyPage () {
  return request({
    url: `${prefixUrl}/my_page`,
    method: 'get',
  })
}
export function deleteCustomById (id) {
  return request({
    url: `${prefixUrl}/delete/${id}`,
    method: 'post',
  })
}
export function adoptCustomById (id) {
  return request({
    url: `${prefixUrl}/adopt/${id}`,
    method: 'post',
  })
}
export function refuseCustomById (id) {
  return request({
    url: `${prefixUrl}/refuse/${id}`,
    method: 'post',
  })
}