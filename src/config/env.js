// 配置编译环境和线上环境之间的切换

const env = process.env
const baseUrl = ''
// 图表库为avue和pig2套地址
const iconfontVersion = ['1036949_sdiwdbrjn6']
const iconfontUrl = '//at.alicdn.com/t/font_$key.css'
const codeUrl = '/api/code'
const imgUrl = '//cloud.govmade.com'
const actUrl = `${window.location.origin}/act/modeler.html?modelId=`
export { baseUrl, actUrl, iconfontUrl, iconfontVersion, codeUrl, env, imgUrl }
