import request from '@/router/axios'

const crmsUrl = '/crm/business'

export function businessList (query) {
  return request({
    url: `${crmsUrl}/page`,
    method: 'get',
    params: query,
  })
}
// 新增商机
export function postBusiness (obj) {
  return request({
    url: `${crmsUrl}/create`,
    method: 'post',
    data: obj,
  })
}

// 修改商机
export function putBusiness (obj) {
  return request({
    url: `${crmsUrl}/update`,
    method: 'post',
    data: obj,
  })
}
// 通过id查询商机
export function getBusinessById (id) {
  return request({
    url: `${crmsUrl}/${id}`,
    method: 'get',
  })
}
// 删除
export function deleteBusinessById (id) {
  return request({
    url: `${crmsUrl}/delete/batch/${id}`,
    method: 'post',
    data: [id],
  })
}

// 认领
export function claimById (obj) {
  return request({
    url: `${crmsUrl}/update/receive`,
    method: 'post',
    data: obj,
  })
}

// 拒绝认领
export function refuseClaim (id) {
  return request({
    url: `${crmsUrl}/claim/${id}`,
    method: 'post',
  })
}

// 取消认领
export function cancelClaim (obj) {
  return request({
    url: `${crmsUrl}/update/NoReceive`,
    method: 'post',
    data: obj,
  })
}
