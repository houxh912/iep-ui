/**
 * 新增政策库政策资讯API请求接口
 */

import request from '@/router/axios'
const prefixUrl = '/gc/policy/information'
/**
 * 获取政策列表
 * @param {Object} params 参数
 */
export function getInformationPage (params) {
  return request({
      // url: '/gov/policy/information/pageConsole',
      url: `${prefixUrl}/pageConsole`,
      method: 'get',
      params: params,
      headers: {
        isNoNeed: true,
    },
  })
}

// 政策中心里的政策资讯分页
export function getInformationCenterPage (params) {
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
 * 政策中心里根据id查询政策资讯
 */ 
export function getInformationCenterById (id) {
  return request({
      url: `${prefixUrl}/${id}`,
      method: 'get',
      headers: {
          isNoNeed: true,
      },
  })
}


// 删除政策
export function deleteInformationById (id) {
    return request({
        // url: '/gov/policy/information/delete',
        url: `${prefixUrl}/delete`,
        method: 'delete',
        data: id,
        headers: {
          isNoNeed: true,
      },
    })
  }

// 验证通用政策
export function validInformationTitle (params) {
  return request({
    // url: '/gov/policy/information/repeat',
    url: `${prefixUrl}/repeat`,
    method: 'get',
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
export function postInformationAndCommit (params) {
  return request({
    // url: '/gov/policy/information/createAndCommit',
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
export function putInformationAndCommit (params) {
  return request({
    // url: '/gov/policy/information/updateAndCommit',
    url: `${prefixUrl}/updateAndCommit`,
    method: 'post',
    data: params,
    headers: {
      isNoNeed: true,
  },
  })
}

// 暂存(添加)
export function postInformation (params) {
  return request({
    // url: '/gov/policy/information/create',
    url: `${prefixUrl}/create`,
    method: 'post',
    data: params,
    headers: {
      isNoNeed: true,
  },
  })
}

// 暂存(修改)
export function putInformation (params) {
  return request({
    // url: '/gov/policy/information/update',
    url: `${prefixUrl}/update`,
    method: 'post',
    data: params,
    headers: {
      isNoNeed: true,
  },
  })
}