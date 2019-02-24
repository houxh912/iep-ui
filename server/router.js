const Router = require('koa-router')
const codeController = require('./controller/code')
const authController = require('./controller/auth')
const adminController = require('./controller/admin')
const dictController = require('./controller/dict')
const mobileController = require('./controller/mobile')
const orgController = require('./controller/org')
const hrmsController = require('./controller/hrms')
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
router.delete('/auth/token/logout', authController.getTokenLogout)
router.post('/auth/mobile/token/sms', authController.postMobileToken)

router.get('/admin/user/info', adminController.getUserInfo)
router.get('/admin/dept/user-tree', adminController.getDeptUserTree)
router.get('/admin/user/page', adminController.getUserPage)
router.get('/admin/file/image-cde6b6e3b38e4526b24f2bee00e7c15b.jpg', adminController.getAvatar)
router.get('/admin/menu', adminController.getMenu)
router.get('/admin/dept/tree', adminController.getDeptTree)
router.get('/admin/user/details', adminController.getUserDetails)
router.get('/admin/role/list', adminController.getRoleList)
router.post('/admin/user', adminController.postUser)
router.delete('/admin/user', adminController.deleteUser)
router.get('/admin/menu/tree', adminController.getMenuTree)
router.get('/admin/role/page', adminController.getRolePage)
router.get('/admin/dict/type/log_type', adminController.getDictTypeLogType)
router.get('/admin/log/page', adminController.getLogPage)
router.get('/admin/dict/page', dictController.getDictPage)
router.get('/admin/dict/child/1', dictController.getDictChildById)
router.get('/admin/mobile/:mobile', mobileController.getMobileCode)
router.get('/admin/org/list', orgController.getOrgList)
router.get('/admin/org/page', orgController.getOrgPage)

router.get('/hrms/employee_profile/page', hrmsController.getEmployeeProfilePage)

exports = module.exports = router
