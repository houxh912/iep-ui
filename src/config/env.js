// 配置编译环境和线上环境之间的切换

const env = process.env
let baseUrl = ''
// 图表库为avue和pig2套地址
let iconfontVersion = ['1036949_le2wzld0w2b']
let iconfontUrl = '//at.alicdn.com/t/font_$key.css'
let codeUrl = '/api/code'
let actUrl = `${window.location.origin}/act/modeler.html?modelId=`
export { baseUrl, actUrl, iconfontUrl, iconfontVersion, codeUrl, env }
