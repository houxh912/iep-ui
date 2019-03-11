const Router = require('koa-router')
const codeController = require('./controller/code')
const authController = require('./controller/auth')
const adminController = require('./controller/admin')
const dictController = require('./controller/dict')
const mobileController = require('./controller/mobile')
const orgController = require('./controller/org')
const hrmsController = require('./controller/hrms')
const crmsController = require('./controller/crms')
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
router.get('/admin/file/:filename', adminController.getAvatar)
router.get('/admin/menu', adminController.getMenu)
router.get('/admin/dept/tree', adminController.getDeptTree)
router.get('/admin/user/details', adminController.getUserDetails)
router.get('/admin/role/list', adminController.getRoleList)
router.post('/admin/user', adminController.postUser)
router.delete('/admin/user', adminController.deleteUser)
router.get('/admin/menu/tree', adminController.getMenuTree)
router.get('/admin/role/page', adminController.getRolePage)
router.get('/admin/dict/type/log_type', adminController.getDictTypeLogType)
router.get('/admin/dict/all_map', adminController.getDictMap)
router.get('/admin/log/page', adminController.getLogPage)
router.get('/admin/dict/page', dictController.getDictPage)
router.get('/admin/dict/child/1', dictController.getDictChildById)
router.get('/admin/mobile/:mobile', mobileController.getMobileCode)
router.get('/admin/org/list', orgController.getOrgList)
router.get('/admin/org', orgController.getOrgPage)
router.get('/admin/org/user/page', orgController.getOrgUserPage)
router.get('/admin/org/:id', orgController.getOrgDetail)
router.post('/admin/user/set/org/:id', orgController.postSetOrg)

router.get('/hrms/employee_profile/page', hrmsController.getEmployeeProfilePage)
router.get('/hrms/employee_profile/growth_file/:id', hrmsController.getGrowthFileById)

router.get("/hrms/administrative_approval/page", hrmsController.getAdministrativeApprovalPage)

router.get("/hrms/talent_pool/page", hrmsController.getTalentPoolPage)

router.get("/hrms/publish_recruitment/page", hrmsController.getPublishRecruitmentPage)
router.get('/hrms/publish_recruitment/:id', hrmsController.getPublishRecruitmentById)
router.post('/hrms/publish_recruitment/create', hrmsController.commonPublishRecruitment)
router.post('/hrms/publish_recruitment/update', hrmsController.commonPublishRecruitment)
router.post('/hrms/publish_recruitment/status/batch', hrmsController.commonPublishRecruitment)
router.post('/hrms/publish_recruitment/remove/batch', hrmsController.commonPublishRecruitment)

router.get("/hrms/training_record/page", hrmsController.getTrainingRecordPage)
router.get("/hrms/department_management/page", hrmsController.getDepartmentManagePage)
router.get("/hrms/job_system/page", hrmsController.getJobSystemPage)
router.get("/hrms/job_title_system/page", hrmsController.getJobTitleSystemPage)
router.get("/hrms/post_library/page", hrmsController.getPostLibraryPage)
router.get("/hrms/post_type/page", hrmsController.getPostTypePage)


// crms
router.get('/crms/custom/page', crmsController.fetchList)
router.post('/crms/custom/create', crmsController.create)
router.post('/crms/custom/update', crmsController.update)
router.post('/crms/custom/delete', crmsController.delete)
router.post('/crms/custom', crmsController.fetchDetail)
router.get('/crms/custom/programme/page', crmsController.fetchProgramme)
router.get('/crms/contact/page', crmsController.fetchContartList)
router.post('/crms/contact/create', crmsController.createContact)
router.post('/crms/contact/update', crmsController.updateContact)
router.post('/crms/contact/delete', crmsController.deleteContact)

exports = module.exports = router
