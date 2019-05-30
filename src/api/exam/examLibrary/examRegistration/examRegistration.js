/**
 * 新增新试题API请求接口
 */

import request from '@/router/axios'
/**
 * 获取试题列表
 * @param {Object} params 参数
 */
export function getExamRegistrationList (params) {
    return request({
        url: '/exms/iepentryform/getIepEntryFormPage',
        method: 'get',
        params: params,
    })
}
/**
 * 通过审核
 */
export function passExamerById (params) {
    return request({
      url: '/exms/iepentryform/batchState',
      method: 'post',
      data: params,
    })
}
/**
 * 取消通过
 */
export function cancelExamerById (params) {
    return request({
      url: '/exms/iepentryform/changeStat',
      method: 'post',
      data: params,
    })
}