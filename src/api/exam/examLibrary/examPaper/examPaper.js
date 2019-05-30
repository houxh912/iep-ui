/**
 * 新增考卷管理API请求接口
 */

import request from '@/router/axios'
/**
 * 获取考卷管理列表页
 * @param {Object} params 参数
 */
export function getExamPaperList (params) {
    return request({
        url: 'exms',
        method: 'get',
        params: params,
    })
}

/**
 * 收卷
 */
export function RollingTestById (params) {
    return request({
      url: 'exms',
      method: 'post',
      data: params,
    })
}

/**
 * 设为可考
 */
export function setTestById (params) {
    return request({
      url: 'exms',
      method: 'post',
      data: params,
    })
}


/**
 * 删除
 */
export function deleteById (id) {
    return request({
      url: 'exms',
      method: 'post',
      data: id,
    })
  }
  
  /**
  * 批量删除
  */
  export function deleteIdAll (ids) {
    return request({
      url: 'exms',
      method: 'post',
      data: ids,
    })
  }
  