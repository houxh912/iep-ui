/**
 * 新增通用政策API请求接口
 */

import request from '@/router/axios'
/**
 * 获取政策列表
 * @param {Object} params 参数
 */
export function getGeneralPage (params) {
    return request({
        url: '/gov/policy/general/pageConsole',
        method: 'get',
        params: params,
    })
}

// 移动政策
// export function movePolicy (params) {
//     return request({
//         url: '/gov/mobile/policy',
//         method: 'post',
//         params: params,
//     })
// }

// 删除政策
export function deleteGeneralBatch (id) {
    return request({
        url: '/gov/policy/general/logicDelete',
        method: 'delete',
        data: id,
    })
}

//根据id获取通用政策
export function getGeneralById (id) {
    return request({
        url: `/gov/policy/general/infoForConsole/${id}`,
        method: 'get',
    })
}

//获取层级、适用对象、主题、规模、行业
// export function findByTypeList (numberList) {
//     return request({
//         url: '/admin/dict/map',
//         method: 'get',
//         params: {numberList},
//     })
// }

// 验证通用政策
export function validGeneralTitle (params) {
    return request({
        url: '/gov/policy/general/repeat',
        method: 'get',
        params: params,
    })
}

/**
 * 新增并提交政策
 * @param {Object} obj 表单参数
 */
export function postGeneralAndCommit (params) {
    return request({
        url: '/gov/policy/general/createAndCommit',
        method: 'post',
        data: params,
    })
}

/**
 * 修改并提交政策
 * @param {Object} obj 表单参数
 */
export function putGeneralAndCommit (params) {
    return request({
        url: '/gov/policy/general/updateAndCommit',
        method: 'post',
        data: params,
    })
}

// 暂存(添加)
export function postGeneral (params) {
    return request({
        url: '/gov/policy/general/create',
        method: 'post',
        data: params,
    })
}

// 暂存(修改)
export function putGeneral (params) {
    return request({
        url: '/gov/policy/general/update',
        method: 'post',
        data: params,
    })
}