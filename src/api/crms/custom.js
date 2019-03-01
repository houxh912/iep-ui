import request from '@/router/axios'

const crmsUrl = '/crms/custom'

export function fetchList (query) {
  return request({
    url: `${crmsUrl}/page`,
    method: 'get',
    params: query,
  })
}

export function createData (obj) {
  return request({
    url: `${crmsUrl}/create`,
    method: 'post',
    data: obj,
  })
}

export function updateData (obj) {
  return request({
    url: `${crmsUrl}/update`,
    method: 'post',
    data: obj,
  })
}

export function deleteDataById (id) {
  return request({
    url: `${crmsUrl}/delete/${id}`,
    method: 'post',
  })
}

// 客户全景查询
export function fetchDetail (id) {
  console.log(id)
  return request({
    // url: `${crmsUrl}/${id}`,
    url: `${crmsUrl}`,
    method: 'post',
  })
}

// 拜访记录-新增
export function createVisit (obj) {
  return request({
    url: `${crmsUrl}/create`,
    method: 'post',
    data: obj,
  })
}

// 拜访记录-编辑
export function updateVisit (obj) {
  return request({
    url: `${crmsUrl}/update`,
    method: 'post',
    data: obj,
  })
}

// 拜访记录-删除
export function deleteVisit (id) {
  return request({
    url: `${crmsUrl}/delete/${id}`,
    method: 'post',
  })
}

// 方案-查询
export function fetchProgramme (query) {
  return request({
    url: `${crmsUrl}/programme/page`,
    method: 'get',
    params: query,
  })
}

// 方案-新增
export function createProgramme (obj) {
  return request({
    url: `${crmsUrl}/create`,
    method: 'post',
    data: obj,
  })
}

// 拜访记录-编辑
export function updateProgramme (obj) {
  return request({
    url: `${crmsUrl}/update`,
    method: 'post',
    data: obj,
  })
}

// 拜访记录-删除
export function deleteProgramme (id) {
  return request({
    url: `${crmsUrl}/delete/${id}`,
    method: 'post',
  })
}

// 资讯-新增
export function createConsultation (obj) {
  return request({
    url: `${crmsUrl}/create`,
    method: 'post',
    data: obj,
  })
}
