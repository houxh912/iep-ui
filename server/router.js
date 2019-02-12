const Router = require('koa-router')
const codeController = require('./controller/code')
const adminController = require('./controller/admin')
const router = new Router()
/**
 * 获取验证码
 *
 * 暂时无其他参数
 */
router.get('/', (ctx) => {
  ctx.body = 'Hello World'
})
router.get('/code', codeController.getCode)
router.get('/admin/user/info', adminController.getUserInfo)

exports = module.exports = router
