import request from '@/router/axios'
const prefixUrl = '/mlms/contract'

export function getTableData (params) {
  return request({
    url: `${prefixUrl}/page`,
    method: 'get',
    params: params,
  })
}

export function getTableDataOnlyMe (obj) {
  return request({
    url: `${prefixUrl}/page/personal`,
    method: 'get',
    params: obj,
  })
}

export function createData (obj) {
  return request({
    url: `${prefixUrl}/create`,
    method: 'post',
    data: obj,
  })
}

export function updateData (obj) {
  return request({
    url: `${prefixUrl}/update`,
    method: 'post',
    data: obj,
  })
}

export function deleteData (id) {
  let ids = typeof id === 'object' ? id : [id]
  return request({
    url: `${prefixUrl}/delete/batch`,
    method: 'post',
    data: ids,
  })
}

export function getDataById (id) {
  return request({
    url: `${prefixUrl}/${id}`,
    method: 'get',
  })
}

// 根据客户id查询市场经理
export function getManeger (obj) {
  return request({
    url: `${prefixUrl}/getManeger`,
    method: 'get',
    params: obj,
  })
}

export function getContractListByName (query) {
  return request({
    url: `${prefixUrl}/all/contract/name/list`,
    method: 'get',
    params: query,
  })
}

// 项目中关联的合同，联盟下的合同
export function getContractPageAll (query) {
  return request({
    url: `${prefixUrl}/page_all`,
    method: 'get',
    params: query,
  })
}

// 复核
export function contractReview (obj) {
  return request({
    url: `${prefixUrl}/review`,
    method: 'post',
    data: obj,
  })
}

// 移交
export function contractTransfer (obj) {
  return request({
    url: `${prefixUrl}/transfer`,
    method: 'post',
    data: obj.contractIds,
    params: { userId: obj.userId },
  })
}
