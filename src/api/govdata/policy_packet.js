/**
 * 新增政策红包API请求接口
 */
import request from '@/router/axios'
const prefixUrl = '/gov'


// 查看政策红包分页
export function getPacketPage (params) {
    return request({
        url: `${prefixUrl}/redEnvelope/page`,
        method: 'get',
        params: params,
    })
}

// 根据id查看政策红包
export function getPacketById (id) {
    return request({
        url: `${prefixUrl}/redEnvelope/withRelation/${id}`,
        method: 'get',
    })
}

// 删除政策红包
export function deletePacket (ids) {
    return request({
        url: `${prefixUrl}/redEnvelope/delete`,
        method: 'post',
        data: ids,
    })
}

/**
 * 新增并提交政策红包
 * @param {Object} obj 表单参数
 */
export function postPacket (params) {
    return request({
        url: `${prefixUrl}/redEnvelope/add`,
        method: 'post',
        data: params,
    })
}

/**
 * 修改并提交政策红包
 * @param {Object} obj 表单参数
 */
export function putPacket (params) {
    return request({
        url: `${prefixUrl}/redEnvelope/update`,
        method: 'post',
        data: params,
    })
}

// 查看政策分页
export function getpolicyPage (params) {
    return request({
        url: `${prefixUrl}/redEnvelope/getPoliciesFromGc`,
        method: 'get',
        params: params,
    })
}
