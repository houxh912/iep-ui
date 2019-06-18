import request from '@/router/axios'

const prefixUrl = '/gov'
// @/api/gms/declare
// 查看政策解读分页
export function getExplainPage (params) {
  return request({
    url: `${prefixUrl}/policy/explain/pageConsole`,
    method: 'get',
    params: params,
  })
}

// 根据id查看政策解读
export function getExplainById (id) {
  return request({
    url: `${prefixUrl}/policy/explain/infoForConsole/${id}`,
    method: 'get',
  })
}

// 删除政策解读(批量)
export function deleteExplainBatch (ids) {
    return request({
      url: `${prefixUrl}/policy/explain`,
      method: 'delete',
      data: ids,
    })
  }

/**
 * 新增并提交政策
 * @param {Object} obj 表单参数
 */
export function postExplainAndCommit (params) {
  return request({
    url: '/gov/policy/explain/createAndCommit',
    method: 'post',
    data: params,
  })
}

/**
 * 修改并提交政策
 * @param {Object} obj 表单参数
 */
export function putExplainAndCommit (params) {
  return request({
    url: '/gov/policy/explain/updateAndCommit',
    method: 'post',
    data: params,
  })
}

// 暂存(添加)
export function postExplain (params) {
  return request({
    url: '/gov/policy/explain/create',
    method: 'post',
    data: params,
  })
}

// 暂存(修改)
export function putExplain (params) {
  return request({
    url: '/gov/policy/explain/update',
    method: 'post',
    data: params,
  })
}