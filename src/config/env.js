// 配置编译环境和线上环境之间的切换

const env = process.env

const baseUrl = ''

const iconfontVersion = ['1036949_pugslkbr1c']
const multicolorIconfontUrl = '//at.alicdn.com/t/font_1184303_5w9onear362.js'
const iconfontUrl = '//at.alicdn.com/t/font_$key.css'

const codeUrl = '/api/code'
const actUrl = `${window.location.origin}/act/modeler.html?modelId=`
const wsUrl = '/api/ims/ws'

export { baseUrl, actUrl, iconfontUrl, iconfontVersion, codeUrl, env, multicolorIconfontUrl, wsUrl }
