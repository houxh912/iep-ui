import request from '@/router/axios'
const schemeUrl = '/crm/program'
//方案列表
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
//编辑
export function getSchemeById (id) {
  return request({
    url: `${schemeUrl}/${id}`,
    method: 'get',
  })
}
// 方案-保存大材料库
export function saveScheme (obj) {
  return request({
    url: `${schemeUrl}/save`,
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
