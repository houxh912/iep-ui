// 配置编译环境和线上环境之间的切换

const env = process.env

const baseUrl = ''

// const codeUrl = '/api/code'
const actUrl = `${window.location.origin}/act/modeler.html?modelId=`
const wsUrl = '/api/ims/ws'

export { baseUrl, actUrl, env, wsUrl }
