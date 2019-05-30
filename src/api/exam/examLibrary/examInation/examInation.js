/**
 * 新增新试题API请求接口
 */

import request from '@/router/axios'
/**
 * 获取试题列表
 * @param {Object} params 参数
 */
export function getExamInationList (params) {
  return request({
      url: '/exms/iepexamination/page',
      method: 'get',
      params: params,
  })
}

/**
* 提交试题ID
*/
export function postExamById (params) {
  return request({
    url: '/exms/iepentryform/getIepEntryFormPage',
    method: 'get',
    data: params,
  })
}