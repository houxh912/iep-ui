import request from '@/router/axios'
export const prefixUrl = '/cpms/custom_module'

export function putModuleById (moduleId) {
  return request({
    url: `${prefixUrl}/module_create/${moduleId}`,
    method: 'post',
  })
}
export function putProductById (productId) {
  return request({
    url: `${prefixUrl}/product_create/${productId}`,
    method: 'post',
  })
}
export function getCusList () {
  return request({
    url: `${prefixUrl}/list`,
    method: 'get',
  })
}
export function deleteModuleById (id) {
  return request({
    url: `${prefixUrl}/delete/${id}`,
    method: 'post',
  })
}
export function deleteBatchDelete (obj) {
  return request({
    url: `${prefixUrl}/batch_delete`,
    method: 'post',
    data: obj,
  })
}