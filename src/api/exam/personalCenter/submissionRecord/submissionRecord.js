/**
 * 新增出题记录API请求接口
 */

import request from '@/router/axios'
/**
 * 获取出题列表页
 * @param {Object} params 参数
 */
export function getSubmissionRecordList (params) {
    return request({
        url: '/exms/iepitembank/page',
        method: 'get',
        params: params,
    })
}