/**
 * 新增新试题API请求接口
 */

import request from '@/router/axios'
/**
 * 获取试题选项
 * @param {Object} params 参数
 */
export function getTestOption (params) {
    return request({
        url: 'exms/dict/map',
        method: 'get',
        params: params,
    })
}

/**
 * 提交申请数据库选项
 * @param {Object} params 对象
 */
export function postNewTest (params) {
    return request({
        url: '/exms/iepitembank/save',
        method: 'post',
        data: params,
        headers:{
            'Content-Type':'application/json',
        },
    })
}

/**
 * 获取试题列表
 * @param {Object} params 参数
 */
export function getTestList (params) {
    return request({
        url: 'exms/iepitembank/pages',
        method: 'get',
        params: params,
    })
}

/**
 * 删除列表
 */
export function deleteApprovalById (params) {
    return request({
      url: '/exms/iepitembank/removeById',
      method: 'post',
      data: params,
    })
  }

/**
 * 审核通过
 * @param {Object} params 参数
 */
export function postExaminePass (params) {
    return request({
        url: 'exms/iepitembank/examine',
        method: 'post',
        params: params,
    })
}

/**
 * 审核不通过
 * @param {Object} params 参数
 */
export function postExamineFalse (params) {
    return request({
        headers: {
            'Content-Type': 'application/json',
        },
        url: 'exms/iepitembank/notpass',
        method: 'post',
        data: params,
    })
}

/**
 * 审核不通过
 * @param {Object} params 参数
 */
export function postModify (params) {
    return request({
        headers: {
            'Content-Type': 'application/json',
        },
        url: 'exms/iepitembank/update',
        method: 'post',
        data: params,
    })
}

