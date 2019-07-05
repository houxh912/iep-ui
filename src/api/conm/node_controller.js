import request from '@/router/axios'

const prefixUrl = '/cms/info_node'
// @/api/conm/index
//栏目管理控制器

//添加栏目
export function addObj (obj) {
    return request({
        url: `${prefixUrl}/create`,
        method: 'post',
        data: obj,
    })
}
//栏目分页
export function getPage (params) {
    return request({
        url: `${prefixUrl}/page`,
        method: 'get',
        params: params,
    })
}
//删除
export function deleteNodeById (id) {
    return request({
        url: `${prefixUrl}/delete/${id}`,
        method: 'post',
    })
}
export function updateObj (obj) {
    return request({
        url: `${prefixUrl}/update`,
        method: 'post',
        data: obj,
    })
}