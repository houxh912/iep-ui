/**
 * 新增政策库申报政策API请求接口
 */
import request from '@/router/axios'
const prefixUrl = '/gc'


// 查看申报类政策分页
export function getDeclarePage (params) {
  return request({
    url: `${prefixUrl}/policy/declare/pageConsole`,
    method: 'get',
    params: params,
    headers: {
      isNoNeed: true,
    },
  })
}

// 政策中心里根据不同的条件的申报政策分页
export function getDeclareCenterPage (params) {
  return request({
    url: `${prefixUrl}/policy/declare/page`,
    method: 'get',
    params: params,
    headers: {
      isNoNeed: true,
   },
  })
}

/**
 * 政策中心里根据id查询申报政策
 */ 
export function getDeclareCenterById (id) {
  return request({
      url: `${prefixUrl}/policy/declare/${id}`,
      method: 'get',
      headers: {
          isNoNeed: true,
      },
  })
}

// 根据id查看申报类政策
export function getDeclareById (id) {
  return request({
    url: `${prefixUrl}/policy/declare/infoForConsole/${id}`,
    method: 'get',
    headers: {
      isNoNeed: true,
  },
  })
}


// 删除申报政策(批量)
export function deleteDeclareBatch (ids) {
  return request({
    url: `${prefixUrl}/policy/declare`,
    method: 'delete',
    data: ids,
    headers: {
      isNoNeed: true,
  },
  })
}

/**
 * 新增并提交政策
 * @param {Object} obj 表单参数
 */
export function postDeclareAndCommit (params) {
  return request({
    url: `${prefixUrl}/policy/declare/createAndCommit`,
    method: 'post',
    data: params,
    headers: {
      isNoNeed: true,
   },
  })
}

/**
 * 修改并提交政策
 * @param {Object} obj 表单参数
 */
export function putDeclareAndCommit (params) {
  return request({
    url: `${prefixUrl}/policy/declare/updateAndCommit`,
    method: 'post',
    data: params,
    headers: {
      isNoNeed: true,
   },
  })
}

// 暂存(添加)
export function postDeclare (params) {
  return request({
    url: `${prefixUrl}/policy/declare/create`,
    method: 'post',
    data: params,
    headers: {
      isNoNeed: true,
   },
  })
}


// 暂存(修改)
export function putDeclare (params) {
  return request({
    url: `${prefixUrl}/policy/declare/update`,
    method: 'post',
    data: params,
    headers: {
      isNoNeed: true,
   },
  })
}