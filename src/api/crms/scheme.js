import request from '@/router/axios'
const schemeUrl = '/crm/program'
//方案列表
// 方案-查询
export function getSchemePage (query) {
  return request({
    url: `${schemeUrl}/page`,
    method: 'get',
    params: query,
  })
}

// 方案-新增
export function createScheme (obj) {
  return request({
    url: `${schemeUrl}/create`,
    method: 'post',
    data: obj,
  })
}

// 方案-编辑
export function updateScheme (obj) {
  return request({
    url: `${schemeUrl}/update`,
    method: 'post',
    data: obj,
  })
}

// 方案-删除
export function deleteSchemeById (ids) {
  return request({
    url: `${schemeUrl}/delete/batch/${ids}`,
    method: 'post',
  })
}