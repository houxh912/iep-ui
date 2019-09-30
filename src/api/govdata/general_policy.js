/**
 * 新增政策库通用政策API请求接口
 */

import request from '@/router/axios'
const prefixUrl = '/gc/policy/general'
/**
 * 获取政策列表
 * @param {Object} params 参数
 */
export function getGeneralPage (params) {
    return request({
        url: `${prefixUrl}/pageConsole`,
        method: 'get',
        params: params,
        headers: {
            isNoNeed: true,
        },
    })
}

// 政策中心里根据不同的条件的通用政策分页
export function getGeneralCenterPage (params) {
    return request({
      url: `${prefixUrl}/page`,
      method: 'get',
      params: params,
      headers: {
        isNoNeed: true,
     },
    })
  }

/**
 * 政策中心里根据id查询通用政策
 */ 
export function getGeneralCenterById (id) {
    return request({
        url: `${prefixUrl}/${id}`,
        method: 'get',
        headers: {
            isNoNeed: true,
        },
    })
}

/**
 * 根据id查询通用政策
 */ 
export function getGeneralById (id) {
    return request({
        url: `${prefixUrl}/infoForConsole/${id}`,
        method: 'get',
        headers: {
            isNoNeed: true,
        },
    })
}

// 删除政策
export function deleteGeneralBatch (id) {
    return request({
        url: `${prefixUrl}/logicDelete`,
        method: 'delete',
        data: id,
        headers: {
            isNoNeed: true,
        },
    })
}

// 验证通用政策
export function validGeneralTitle (params) {
    return request({
        url: `${prefixUrl}/repeat`,
        method: 'post',
        params: params,
        headers: {
            isNoNeed: true,
        },
    })
}

/**
 * 新增并提交政策
 * @param {Object} obj 表单参数
 */
export function postGeneralAndCommit (params) {
    return request({
        url: `${prefixUrl}/createAndCommit`,
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
export function putGeneralAndCommit (params) {
    return request({
        url: `${prefixUrl}/updateAndCommit`,
        method: 'post',
        data: params,
        headers: {
            isNoNeed: true,
        },
    })
}

// 暂存(添加)
export function postGeneral (params) {
    return request({
        url: `${prefixUrl}/create`,
        method: 'post',
        data: params,
        headers: {
            isNoNeed: true,
        },
    })
}

// 暂存(修改)
export function putGeneral (params) {
    return request({
        url: `${prefixUrl}/update`,
        method: 'post',
        data: params,
        headers: {
            isNoNeed: true,
        },
    })
}