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