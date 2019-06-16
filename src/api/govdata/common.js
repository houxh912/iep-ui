import request from '@/router/axios'

const prefixUrl = '/gov'

// 查看通用政策和申报政策的政策依据或政策原文
export function getBasisPage (params) {
    return request({
        url: `${prefixUrl}/policy/general/getGeneralAndDeclareList`,
        method: 'post',
        params: params,
    })
}

// 查看机构分页
export function getOrganizationPage (params) {
    return request({
      url: `${prefixUrl}/organization/page`,
      method: 'get',
      params: params,
    })
  }

  // 移动政策
export function movePolicy (params) {
  return request({
    url: '/gov/mobile/policy',
    method: 'post',
    params: params,
  })
}

//获取层级、适用对象、主题、规模、行业
export function findByTypeList (numberList) {
  return request({
      url: '/admin/dict/map',
      method: 'get',
      params: {numberList},
  })
}