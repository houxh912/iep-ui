const Router = require('koa-router')
const codeController = require('./controller/code')
const authController = require('./controller/auth')
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
router.post('/auth/oauth/token', authController.getOauthToken)
router.get('/admin/user/info', adminController.getUserInfo)
router.get('/admin/menu', adminController.getMenu)

exports = module.exports = router
