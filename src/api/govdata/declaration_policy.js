import request from '@/router/axios'

const prefixUrl = '/gov'
// @/api/gms/declare
// 查看申报类政策分页
export function getDeclarePage (params) {
  return request({
    url: `${prefixUrl}/policy/declare/pageConsole`,
    method: 'get',
    params: params,
  })
}

// 根据id查看申报类政策
export function getDeclareById (id) {
  return request({
    url: `${prefixUrl}/policy/declare/infoForConsole/${id}`,
    method: 'get',
  })
}


// 删除申报政策(批量)
export function deleteDeclareBatch (ids) {
  return request({
    url: `${prefixUrl}/policy/declare`,
    method: 'delete',
    data: ids,
  })
}