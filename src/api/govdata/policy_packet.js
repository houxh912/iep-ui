/**
 * 新增政策红包API请求接口
 */
import request from '@/router/axios'
const prefixUrl = '/go'


// 查看政策红包分页
export function getPacketPage (params) {
    return request({
        url: `${prefixUrl}/redEnvelope/page`,
        method: 'get',
        params: params,
        // headers: {
        //     isNoNeed: true,
        // },
    })
}

// 根据id查看政策红包
export function getPacketById (id) {
    return request({
        url: `${prefixUrl}/policy/explain/infoForConsole/${id}`,
        method: 'get',
        // headers: {
        //     isNoNeed: true,
        // },
    })
}

// 删除政策红包
export function deletePacket (ids) {
    return request({
        url: `${prefixUrl}/policy/explain`,
        method: 'delete',
        data: ids,
        // headers: {
        //     isNoNeed: true,
        // },
    })
}

/**
 * 新增并提交政策红包
 * @param {Object} obj 表单参数
 */
export function postPacket (params) {
    return request({
        url: `${prefixUrl}/policy/explain/createAndCommit`,
        method: 'post',
        data: params,
        // headers: {
        //     isNoNeed: true,
        // },
    })
}

/**
 * 修改并提交政策红包
 * @param {Object} obj 表单参数
 */
export function putPacket (params) {
    return request({
        url: `${prefixUrl}/policy/explain/updateAndCommit`,
        method: 'post',
        data: params,
        // headers: {
        //     isNoNeed: true,
        // },
    })
}