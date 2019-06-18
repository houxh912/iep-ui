/**
 * 新增政策资讯API请求接口
 */

import request from '@/router/axios'
/**
 * 获取政策列表
 * @param {Object} params 参数
 */
export function getInformationPage (params) {
  return request({
      url: '/gov/policy/information/pageConsole',
      method: 'get',
      params: params,
  })
}

// 移动政策
// export function movePolicy (params) {
//     return request({
//       url: '/gov/mobile/policy',
//       method: 'post',
//       params: params,
//     })
//   }

// 删除政策
export function deleteInformationById (id) {
    return request({
        url: '/gov/policy/information/delete',
        method: 'delete',
        data: id,
    })
  }

// 验证通用政策
export function validInformationTitle (params) {
  return request({
    url: '/gov/policy/information/repeat',
    method: 'get',
    params: params,
  })
}

// // 验证通用政策
// export function validInformationTitle (title) {
//   return request({
//     url: '/gov/policy/information/repeat',
//     method: 'post',
//     data: { title },
//   })
// }

/**
 * 新增并提交政策
 * @param {Object} obj 表单参数
 */
export function postInformationAndCommit (params) {
  return request({
    url: '/gov/policy/information/createAndCommit',
    method: 'post',
    data: params,
  })
}

/**
 * 修改并提交政策
 * @param {Object} obj 表单参数
 */
export function putInformationAndCommit (params) {
  return request({
    url: '/gov/policy/information/updateAndCommit',
    method: 'post',
    data: params,
  })
}

// 暂存(添加)
export function postInformation (params) {
  return request({
    url: '/gov/policy/information/create',
    method: 'post',
    data: params,
  })
}

// 暂存(修改)
export function putInformation (params) {
  return request({
    url: '/gov/policy/information/update',
    method: 'post',
    data: params,
  })
}