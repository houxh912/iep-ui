/**
 * 新增考试统计中总体统计接口
 */

import request from '@/router/axios'
/**
 * 获取考卷管理列表页
 * @param {Object} params 参数
 */
export function getPage (params) {
    return request({
        url: 'exms/statistics/selectByTotal',
        method: 'get',
        params: params,
    })
}