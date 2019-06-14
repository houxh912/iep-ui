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

// 删除政策
export function deleteInformationById (params) {
    return request({
        url: '/gov/policy/information/delete',
        method: 'delete',
        data: params,
    })
  }