import request from '@/router/axios'

const crmsUrl = '/crm//business'

export function businessList (query) {
  return request({
    url: `${crmsUrl}/page`,
    method: 'get',
    params: query,
  })
}

// 我的发布
export function myBusinessList (query) {
  return request({
    url: `${crmsUrl}/page/publish`,
    method: 'get',
    params: query,
  })
}

// 我的认领
export function myReceiveList (query) {
  return request({
    url: `${crmsUrl}/page/receive`,
    method: 'get',
    params: query,
  })
}
// 新增商机
export function createData (obj) {
  return request({
    url: `${crmsUrl}/create`,
    method: 'post',
    data: obj,
  })
}
// 通过id查询商机
export function businessById (id) {
  return request({
    url: `${crmsUrl}/${id}`,
    method: 'get',
  })
}

// 修改商机
export function updateData (obj) {
  return request({
    url: `${crmsUrl}/update`,
    method: 'post',
    data: obj,
  })
}
// 删除
export function deleteDataById (id) {
  return request({
    url: `${crmsUrl}/delete/batch/${id}`,
    method: 'post',
    data: [id],
  })
}

export function deleteData (ids) {
  return request({
    url: `${crmsUrl}/delete/batch/${ids}`,
    method: 'post',
    data: ids,
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
    url: `${crmsUrl}/update/cancelReceive`,
    method: 'post',
    data: obj,
  })
}
