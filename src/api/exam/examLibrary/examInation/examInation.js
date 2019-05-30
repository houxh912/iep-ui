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

/**
* post考试禁用状态
*/
export function postExamForbidById (params) {
  return request({
    url: 'exms/iepexamination/prohibit',
    method: 'post',
    params: params,
  })
}

/**
* post考试启用状态
*/
export function postExamPassById (params) {
  return request({
    url: 'exms/iepexamination/enable',
    method: 'post',
    params: params,
  })
}