/**
 * 新增政策库政策解读API请求接口
 */
import request from '@/router/axios'
const prefixUrl = '/gc'


// 查看政策解读分页
export function getExplainPage (params) {
  return request({
    url: `${prefixUrl}/policy/explain/pageConsole`,
    method: 'get',
    params: params,
    headers: {
      isNoNeed: true,
   },
  })
}

// 政策中心里根据不同的条件的政策解读分页
export function getAnalysisCenterPage (params) {
  return request({
    url: `${prefixUrl}/policy/explain/page`,
    method: 'get',
    params: params,
    headers: {
      isNoNeed: true,
   },
  })
}

/**
 * 政策中心里根据id查询政策解读
 */ 
export function getAnalysisCenterById (id) {
  return request({
      url: `${prefixUrl}/policy/explain/${id}`,
      method: 'get',
      headers: {
          isNoNeed: true,
      },
  })
}


// 根据id查看政策解读
export function getExplainById (id) {
  return request({
    url: `${prefixUrl}/policy/explain/infoForConsole/${id}`,
    method: 'get',
    headers: {
      isNoNeed: true,
   },
  })
}

// 删除政策解读(批量)
export function deleteExplainBatch (ids) {
    return request({
      url: `${prefixUrl}/policy/explain`,
      method: 'delete',
      data: ids,
      headers: {
        isNoNeed: true,
     },
    })
  }

/**
 * 新增并提交政策
 * @param {Object} obj 表单参数
 */
export function postExplainAndCommit (params) {
  return request({
    url: `${prefixUrl}/policy/explain/createAndCommit`,
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
export function putExplainAndCommit (params) {
  return request({
    url: `${prefixUrl}/policy/explain/updateAndCommit`,
    method: 'post',
    data: params,
    headers: {
      isNoNeed: true,
   },
  })
}

// 暂存(添加)
export function postExplain (params) {
  return request({
    url: `${prefixUrl}/policy/explain/create`,
    method: 'post',
    data: params,
    headers: {
      isNoNeed: true,
   },
  })
}

// 暂存(修改)
export function putExplain (params) {
  return request({
    url: `${prefixUrl}/policy/explain/update`,
    method: 'post',
    data: params,
    headers: {
      isNoNeed: true,
   },
  })
}