const path = require('path');
const fileStream = require('../file-stream')

exports.getUserInfo = async function (ctx) {
  ctx.body = `{"code":0,"msg":"success","data":{"sysUser":{"userId":1,"username":"admin","realName":"超级管理员","password":"$2a$10$QOfWxxFyAMmEEmnuw9UI/..1s4B4eF/u9PzE2ZaGO.ij9YfmcUy.u","safePassword":"","createTime":"2018-04-20 07:15:18","updateTime":"2019-03-01 17:04:09","delFlag":"0","lockFlag":"0","avatar":"files-8033f461524f4ee1b2c3d790efc64eae.JPG","phone":"18886665522","orgId":5,"deptId":16,"tenantId":1,"wxOpenid":"","qqOpenid":"","assetOrg":8},"permissions":["sys_client_edit","sys_dept_del","daemon_execution_log_del","daemon_status_trace_log_del","sys_org_del","sys_user_edit","act_task_manage","sys_dict_edit","sys_menu_del","sys_role_edit","sys_token_del","sys_dept_add","act_leavebill_add","sys_role_del","generator_syssocialdetails_edit","sys_dict_del","sys_org_add","sys_dict_add","sys_user_del","sys_role_add","sys_menu_add","sys_org_edit","generator_syssocialdetails_add","sys_client_add","sys_dept_edit","act_process_manage","act_leavebill_edit","sys_menu_edit","sys_role_perm","sys_user_add","act_leavebill_del","act_model_manage","sys_log_del","generator_syssocialdetails_del","sys_client_del"],"roles":[1,5],"orgs":[{"orgId":5,"orgName":"测试新增组织并绑定所创大部门"},{"orgId":8,"orgName":"杜照鸿的组织"}]}}`;
}

exports.getMenu = async function (ctx) {
  ctx.body = `{"code":0,"msg":"success","data":[{"id":4000,"parentId":-1,"children":[{"id":4100,"parentId":4000,"children":[],"icon":"icon-custom","name":"首页","spread":false,"path":"index","component":"views/wel/index/index","keepAlive":"0","type":"0","label":"首页","sort":1},{"id":4200,"parentId":4000,"children":[],"icon":"icon-shenqing","name":"我的任务","spread":false,"path":"tasks","component":"views/wel/tasks/index","keepAlive":"0","type":"0","label":"我的任务","sort":2},{"id":4300,"parentId":4000,"children":[],"icon":"icon-custom","name":"我的材料","spread":false,"path":"materials","component":"views/wel/materials/index","keepAlive":"0","type":"0","label":"我的材料","sort":3},{"id":4400,"parentId":4000,"children":[],"icon":"icon-weath1","name":"我的财富","spread":false,"path":"wealth","component":"views/wel/wealth/index","keepAlive":"0","type":"0","label":"我的财富","sort":4},{"id":4500,"parentId":4000,"children":[],"icon":"icon-shenpi","name":"我的审批","spread":false,"path":"approval","component":"views/wel/approval/index","keepAlive":"0","type":"0","label":"我的审批","sort":5},{"id":4600,"parentId":4000,"children":[],"icon":"icon-xiaoxi","name":"我的消息","spread":false,"path":"message","component":"views/wel/message/index","keepAlive":"0","type":"0","label":"我的消息","sort":6},{"id":4700,"parentId":4000,"children":[],"icon":"icon-youxiang","name":"我的邮件","spread":false,"path":"mail","component":"views/wel/mail/index","keepAlive":"0","type":"0","label":"我的邮件","sort":7},{"id":4800,"parentId":4000,"children":[],"icon":"icon-shoucang1","name":"我的收藏","spread":false,"path":"collection","component":"views/wel/collection/index","keepAlive":"0","type":"0","label":"我的收藏","sort":8},{"id":4900,"parentId":4000,"children":[],"icon":"icon-shangchuan","name":"我的分享","spread":false,"path":"share","component":"views/wel/share/index","keepAlive":"0","type":"0","label":"我的分享","sort":9}],"icon":"icon-shouye","name":"个人赋能台","spread":false,"path":"/wel","component":"Layout","keepAlive":"0","type":"0","label":"个人赋能台","sort":1},{"id":5000,"parentId":-1,"children":[{"id":5100,"parentId":5000,"children":[],"icon":"icon-renyuan","name":"员工档案","spread":false,"path":"employee_profile","component":"views/hrms/EmployeeProfile/index","keepAlive":"0","type":"0","label":"员工档案","sort":1},{"id":5200,"parentId":5000,"children":[{"id":5210,"parentId":5200,"children":[],"icon":"icon-chucunrongliangxianzhi","name":"发布招聘","spread":false,"path":"publish","component":"views/hrms/Recruitment/Publish/index","keepAlive":"0","type":"0","label":"发布招聘","sort":1},{"id":5220,"parentId":5200,"children":[],"icon":"icon-kehu","name":"人才库","spread":false,"path":"talent_pool","component":"views/hrms/Recruitment/TalentPool/index","keepAlive":"0","type":"0","label":"人才库","sort":2}],"icon":"icon-rencai","name":"人才招聘","spread":false,"path":"recruitment","component":"Layout","keepAlive":"0","type":"0","label":"人才招聘","sort":2},{"id":5300,"parentId":5000,"children":[],"icon":"icon-shenpi","name":"审批记录","spread":false,"path":"administrative_approval","component":"views/hrms/AdministrativeApproval/index","keepAlive":"0","type":"0","label":"审批记录","sort":3},{"id":5400,"parentId":5000,"children":[{"id":5410,"parentId":5400,"children":[],"icon":"icon-peixun","name":"培训记录","spread":false,"path":"training_record","component":"views/hrms/TrainingAssessment/TrainingRecord/index","keepAlive":"0","type":"0","label":"培训记录","sort":1},{"id":5420,"parentId":5400,"children":[],"icon":"icon-peixun","name":"考核管理","spread":false,"path":"assessment_management","component":"views/hrms/TrainingAssessment/AssessmentManagement/index","keepAlive":"0","type":"0","label":"考核管理","sort":2}],"icon":"icon-peixun","name":"培训考核","spread":false,"path":"training_assessment","component":"Layout","keepAlive":"0","type":"0","label":"培训考核","sort":4},{"id":5500,"parentId":5000,"children":[{"id":5510,"parentId":5500,"children":[],"icon":"icon-dangan","name":"岗位库","spread":false,"path":"post_library","component":"views/hrms/OrganizationalStructure/PostLibrary/index","keepAlive":"0","type":"0","label":"岗位库","sort":1},{"id":5520,"parentId":5500,"children":[],"icon":"icon-yunweiguanli","name":"职务职称体系","spread":false,"path":"job_title_system","component":"views/hrms/OrganizationalStructure/JobTitleSystem/index","keepAlive":"0","type":"0","label":"职务职称体系","sort":2},{"id":5530,"parentId":5500,"children":[],"icon":"icon-bumen","name":"部门管理","spread":false,"path":"department_management","component":"views/hrms/OrganizationalStructure/DepartmentManagement/index","keepAlive":"0","type":"0","label":"部门管理","sort":3}],"icon":"icon-organ","name":"组织架构","spread":false,"path":"organizational_structure","component":"Layout","keepAlive":"0","type":"0","label":"组织架构","sort":5}],"icon":"icon-renli","name":"人力","spread":false,"path":"/hrms","component":"Layout","keepAlive":"0","type":"0","label":"人力","sort":5},{"id":6000,"parentId":-1,"children":[{"id":6100,"parentId":6000,"children":[],"icon":"icon-kehu","name":"客户","spread":false,"path":"customer","component":"views/crms/Customer/index","keepAlive":"0","type":"0","label":"客户","sort":1},{"id":6200,"parentId":6000,"children":[],"icon":"icon-chengyuan","name":"联系人","spread":false,"path":"contact","component":"views/crms/contact/index","keepAlive":"0","type":"0","label":"联系人","sort":2},{"id":6300,"parentId":6000,"children":[],"icon":"icon-kehu","name":"商机","spread":false,"path":"business","component":"views/crms/business/index","keepAlive":"0","type":"0","label":"商机","sort":3},{"id":6400,"parentId":6000,"children":[],"icon":"icon-kehu","name":"合同","spread":false,"path":"contract","component":"views/crms/contract/index","keepAlive":"0","type":"0","label":"合同","sort":4},{"id":6500,"parentId":6000,"children":[],"icon":"icon-kehu","name":"客户统计","spread":false,"path":"count","component":"views/crms/count/index","keepAlive":"0","type":"0","label":"客户统计","sort":5}],"icon":"icon-kehu","name":"客户","spread":false,"path":"/crms","component":"Layout","keepAlive":"0","type":"0","label":"客户","sort":6},{"id":7000,"parentId":-1,"children":[{"id":7100,"parentId":7000,"children":[],"icon":"icon-zuzhi","name":"工作台","spread":false,"path":"work_bench","component":"views/goms/WorkBench/index","keepAlive":"0","type":"0","label":"工作台","sort":1},{"id":7200,"parentId":7000,"children":[],"icon":"icon-chengyuan","name":"成员管理","spread":false,"path":"member_management","component":"views/goms/MemberManagement/index","keepAlive":"0","type":"0","label":"成员管理","sort":2},{"id":7300,"parentId":7000,"children":[{"id":7310,"parentId":7300,"children":[],"icon":"icon-yunweiguanli","name":"组织信息","spread":false,"path":"organization_information","component":"views/goms/BasicConfiguration/OrganizationInformation/index","keepAlive":"0","type":"0","label":"组织信息","sort":1},{"id":7320,"parentId":7300,"children":[],"icon":"icon-yunweiguanli","name":"模块配置","spread":false,"path":"module_configuration","component":"views/goms/BasicConfiguration/ModuleConfiguration/index","keepAlive":"0","type":"0","label":"模块配置","sort":2},{"id":7330,"parentId":7300,"children":[],"icon":"icon-yunweiguanli","name":"角色管理","spread":false,"path":"role_management","component":"views/goms/BasicConfiguration/RoleManagement/index","keepAlive":"0","type":"0","label":"角色管理","sort":3},{"id":7340,"parentId":7300,"children":[],"icon":"icon-yunweiguanli","name":"字典管理","spread":false,"path":"dictionary_management","component":"views/goms/BasicConfiguration/DictionaryManagement/index","keepAlive":"0","type":"0","label":"字典管理","sort":4},{"id":7350,"parentId":7300,"children":[],"icon":"icon-yunweiguanli","name":"组织设置","spread":false,"path":"organization_setup","component":"views/goms/BasicConfiguration/OrganizationSetup/index","keepAlive":"0","type":"0","label":"组织设置","sort":5}],"icon":"icon-yunweiguanli","name":"基础配置","spread":false,"path":"basic_configuration","component":"Layout","keepAlive":"0","type":"0","label":"基础配置","sort":3}],"icon":"icon-zuzhi","name":"组织","spread":false,"path":"/goms","component":"Layout","keepAlive":"0","type":"0","label":"组织","sort":7},{"id":8000,"parentId":-1,"children":[{"id":8100,"parentId":8000,"children":[{"id":8110,"parentId":8100,"children":[],"name":"纪要","spread":false,"path":"summary","component":"views/mlms/material/summary/index","keepAlive":"0","type":"0","label":"纪要","sort":1},{"id":8120,"parentId":8100,"children":[],"name":"报表","spread":false,"path":"report","component":"views/mlms/material/summary/index","keepAlive":"0","type":"0","label":"报表","sort":2},{"id":8130,"parentId":8100,"children":[],"name":"资料","spread":false,"path":"datum","component":"views/mlms/material/datum/index","keepAlive":"0","type":"0","label":"资料","sort":3}],"name":"我的材料","spread":false,"path":"material","component":"Layout","keepAlive":"0","type":"0","label":"我的材料","sort":1},{"id":8200,"parentId":8000,"children":[{"id":8210,"parentId":8200,"children":[],"name":"收件箱","spread":false,"path":"inbox","component":"views/mlms/email/inbox/index","keepAlive":"0","type":"0","label":"收件箱","sort":1},{"id":8220,"parentId":8200,"children":[],"name":"新建邮件","spread":false,"path":"new","component":"views/mlms/email/new/index","keepAlive":"0","type":"0","label":"新建邮件","sort":2},{"id":8230,"parentId":8200,"children":[],"name":"星标邮件","spread":false,"path":"star","component":"views/mlms/email/star/index","keepAlive":"0","type":"0","label":"星标邮件","sort":3},{"id":8240,"parentId":8200,"children":[],"name":"已发送","spread":false,"path":"sent","component":"views/mlms/email/sent/index","keepAlive":"0","type":"0","label":"已发送","sort":4},{"id":8250,"parentId":8200,"children":[],"name":"草稿箱","spread":false,"path":"draft","component":"views/mlms/email/draft/index","keepAlive":"0","type":"0","label":"草稿箱","sort":5}],"name":"我的邮件","spread":false,"path":"email","component":"Layout","keepAlive":"0","type":"0","label":"我的邮件","sort":2},{"id":8300,"parentId":8000,"children":[{"id":8310,"parentId":8300,"children":[],"name":"领导指示","spread":false,"path":"instruction","component":"views/mlms/message/instruction/index","keepAlive":"0","type":"0","label":"领导指示","sort":1},{"id":8320,"parentId":8300,"children":[],"name":"通知公告","spread":false,"path":"announcement","component":"views/mlms/message/announcement/index","keepAlive":"0","type":"0","label":"通知公告","sort":2},{"id":8330,"parentId":8300,"children":[],"name":"系统消息","spread":false,"path":"information","component":"views/mlms/message/information/index","keepAlive":"0","type":"0","label":"系统消息","sort":3}],"name":"我的消息","spread":false,"path":"message","component":"Layout","keepAlive":"0","type":"0","label":"我的消息","sort":3},{"id":8400,"parentId":8000,"children":[],"name":"我的收藏","spread":false,"path":"collection","component":"Layout","keepAlive":"0","type":"0","label":"我的收藏","sort":4},{"id":8500,"parentId":8000,"children":[],"name":"我的分享","spread":false,"path":"share","component":"Layout","keepAlive":"0","type":"0","label":"我的分享","sort":5},{"id":8600,"parentId":8000,"children":[],"name":"频道管理","spread":false,"path":"channel","component":"Layout","keepAlive":"0","type":"0","label":"频道管理","sort":6}],"icon":"icon-wendang","name":"资源","spread":false,"path":"/mlms","component":"Layout","keepAlive":"0","type":"0","label":"资源","sort":8},{"id":9000,"parentId":-1,"children":[{"id":9100,"parentId":9000,"children":[],"name":"我的定位","spread":false,"path":"positioning","component":"views/gpms/positioning/index","keepAlive":"0","type":"0","label":"我的定位","sort":1},{"id":9200,"parentId":9000,"children":[],"name":"我的推荐","spread":false,"path":"recommendation","component":"views/gpms/recommendation/index","keepAlive":"0","type":"0","label":"我的推荐","sort":2}],"icon":"icon-xiangmu","name":"项目","spread":false,"path":"gpms","component":"Layout","keepAlive":"0","type":"0","label":"项目","sort":9},{"id":10000,"parentId":-1,"children":[{"id":11000,"parentId":10000,"children":[{"id":11100,"parentId":11000,"children":[],"icon":"icon-yunweiguanli","name":"用户管理","spread":false,"path":"user","component":"views/admin/user/index","keepAlive":"0","type":"0","label":"用户管理","sort":1},{"id":11200,"parentId":11000,"children":[],"icon":"icon-yunweiguanli","name":"菜单管理","spread":false,"path":"menu","component":"views/admin/menu/index","keepAlive":"0","type":"0","label":"菜单管理","sort":2},{"id":11300,"parentId":11000,"children":[],"icon":"icon-yunweiguanli","name":"角色管理","spread":false,"path":"role","component":"views/admin/role/index","keepAlive":"0","type":"0","label":"角色管理","sort":3},{"id":11400,"parentId":11000,"children":[],"icon":"icon-yunweiguanli","name":"部门管理","spread":false,"path":"dept","component":"views/admin/dept/index","keepAlive":"0","type":"0","label":"部门管理","sort":4},{"id":11500,"parentId":11000,"children":[],"icon":"icon-yunweiguanli","name":"组织管理","spread":false,"path":"org","component":"views/admin/org/index","keepAlive":"0","type":"0","label":"组织管理","sort":5}],"icon":"icon-yunweiguanli","name":"权限管理","spread":false,"path":"upms","component":"Layout","keepAlive":"0","type":"0","label":"权限管理","sort":0},{"id":12000,"parentId":10000,"children":[{"id":12100,"parentId":12000,"children":[],"icon":"icon-yunweiguanli","name":"日志管理","spread":false,"path":"log","component":"views/admin/log/index","keepAlive":"0","type":"0","label":"日志管理","sort":5},{"id":12200,"parentId":12000,"children":[],"icon":"icon-yunweiguanli","name":"字典管理","spread":false,"path":"dict","component":"views/admin/dict/index","keepAlive":"0","type":"0","label":"字典管理","sort":6},{"id":12300,"parentId":12000,"children":[],"icon":"icon-yunweiguanli","name":"代码生成","spread":false,"path":"gen","component":"views/gen/index","keepAlive":"0","type":"0","label":"代码生成","sort":8},{"id":12400,"parentId":12000,"children":[],"icon":"icon-yunweiguanli","name":"终端管理","spread":false,"path":"client","component":"views/admin/client/index","keepAlive":"0","type":"0","label":"终端管理","sort":9},{"id":12500,"parentId":12000,"children":[],"icon":"icon-yunweiguanli","name":"密钥管理","spread":false,"path":"social","component":"views/admin/social/index","keepAlive":"0","type":"0","label":"密钥管理","sort":10},{"id":12600,"parentId":12000,"children":[],"icon":"icon-yunweiguanli","name":"令牌管理","spread":false,"path":"token","component":"views/admin/token/index","keepAlive":"0","type":"0","label":"令牌管理","sort":11},{"id":12700,"parentId":12000,"children":[],"icon":"icon-yunweiguanli","name":"动态路由","spread":false,"path":"route","component":"views/admin/route/index","keepAlive":"0","type":"0","label":"动态路由","sort":12}],"icon":"icon-yunweiguanli","name":"系统管理","spread":false,"path":"admin","component":"Layout","keepAlive":"0","type":"0","label":"系统管理","sort":1},{"id":13000,"parentId":10000,"children":[{"id":13100,"parentId":13000,"children":[],"icon":"icon-yunweiguanli","name":"服务监控","spread":false,"path":"http://139.224.200.249:15001","keepAlive":"0","type":"0","label":"服务监控","sort":0},{"id":13200,"parentId":13000,"children":[],"icon":"icon-yunweiguanli","name":"接口文档","spread":false,"path":"http://139.224.200.249:19999/swagger-ui.html","keepAlive":"0","type":"0","label":"接口文档","sort":1},{"id":13300,"parentId":13000,"children":[],"icon":"icon-yunweiguanli","name":"事务监控","spread":false,"path":"tx","component":"views/tx/index","keepAlive":"0","type":"0","label":"事务监控","sort":5},{"id":13400,"parentId":13000,"children":[],"icon":"icon-yunweiguanli","name":"在线事务","spread":false,"path":"model","component":"views/tx/model","keepAlive":"0","type":"0","label":"在线事务","sort":6},{"id":13500,"parentId":13000,"children":[],"icon":"icon-yunweiguanli","name":"任务监控","spread":false,"path":"http://139.224.200.249:8899","keepAlive":"0","type":"0","label":"任务监控","sort":7},{"id":13600,"parentId":13000,"children":[],"icon":"icon-yunweiguanli","name":"任务轨迹","spread":false,"path":"status-trace-log","component":"views/daemon/status-trace-log/index","keepAlive":"0","type":"0","label":"任务轨迹","sort":8},{"id":13900,"parentId":13000,"children":[],"icon":"icon-yunweiguanli","name":"任务日志","spread":false,"path":"execution-log","component":"views/daemon/execution-log/index","keepAlive":"0","type":"0","label":"任务日志","sort":8},{"id":13700,"parentId":13000,"children":[],"icon":"icon-yunweiguanli","name":"调用拓扑","spread":false,"path":"http://139.224.200.249:8081","keepAlive":"0","type":"0","label":"调用拓扑","sort":10},{"id":13800,"parentId":13000,"children":[],"icon":"icon-yunweiguanli","name":"缓存状态","spread":false,"path":"http://139.224.200.249:8585","keepAlive":"0","type":"0","label":"缓存状态","sort":12}],"icon":"icon-yunweiguanli","name":"系统监控","spread":false,"path":"daemon","component":"Layout","keepAlive":"0","type":"0","label":"系统监控","sort":2},{"id":14000,"parentId":10000,"children":[{"id":14100,"parentId":14000,"children":[],"icon":"icon-yunweiguanli","name":"模型管理","spread":false,"path":"activiti","component":"views/activiti/index","keepAlive":"0","type":"0","label":"模型管理","sort":1},{"id":14200,"parentId":14000,"children":[],"icon":"icon-yunweiguanli","name":"流程管理","spread":false,"path":"process","component":"views/activiti/process","keepAlive":"0","type":"0","label":"流程管理","sort":2},{"id":14300,"parentId":14000,"children":[],"icon":"icon-yunweiguanli","name":"请假管理","spread":false,"path":"leavebill","component":"views/activiti/leave","keepAlive":"0","type":"0","label":"请假管理","sort":3},{"id":14400,"parentId":14000,"children":[],"icon":"icon-yunweiguanli","name":"待办任务","spread":false,"path":"task","component":"views/activiti/task","keepAlive":"0","type":"0","label":"待办任务","sort":4}],"icon":"icon-yunweiguanli","name":"协同管理","spread":false,"path":"activti","component":"Layout","keepAlive":"0","type":"0","label":"协同管理","sort":3}],"icon":"icon-yunweiguanli","name":"核心","spread":false,"path":"/core","component":"Layout","keepAlive":"0","type":"0","label":"核心","sort":10}]}`;
}

exports.getAvatar = async function (ctx) {
  const realPath = path.resolve(__dirname, `../resource/${ctx.params.filename}`)
  const res = await fileStream.readFile(realPath);
  // res 为 Buffer流
  if (res) {
    ctx.type = "jpg";
    ctx.body = res;
  }
}

exports.getDeptUserTree = async function (ctx) {
  ctx.body = `{"code":0,"msg":"success","data":[{"id":1,"parentId":0,"children":[{"id":3,"parentId":1,"children":[{"id":4,"parentId":3,"children":[{"id":5,"parentId":4,"children":[],"name":"院校农信"}],"name":"高新农信"}],"name":"潍坊农信"}],"name":"山东农信"}]}`
}

exports.getUserPage = async function (ctx) {
  ctx.body = `{"code":0,"msg":"success","data":{"records":[{"userId":1,"username":"admin","password":"$2a$10$QOfWxxFyAMmEEmnuw9UI/..1s4B4eF/u9PzE2ZaGO.ij9YfmcUy.u","salt":null,"wxOpenid":"o_0FT0uyg_H1vVy2H0JpSwlVGhWQ","qqOpenid":null,"createTime":"2018-04-20 07:15:18","updateTime":"2019-01-05 17:11:20","delFlag":"0","lockFlag":"0","phone":"17034642888","avatar":"lengleng-oxjkuoy361p6x5snlogo.png","deptId":1,"tenantId":1,"deptName":null,"roleList":[{"roleId":1,"roleName":"管理员","roleCode":"ROLE_ADMIN","roleDesc":"管理员","dsType":2,"dsScope":"2","createTime":"2017-10-29 15:45:51","updateTime":"2018-12-26 14:09:11","delFlag":"0"}]}],"total":1,"size":20,"current":1,"searchCount":true,"pages":1}}`
}

exports.getDeptTree = async function (ctx) {
  ctx.body = `{"code":0,"msg":"success","data":[{"id":1,"parentId":0,"children":[{"id":3,"parentId":1,"children":[{"id":4,"parentId":3,"children":[{"id":5,"parentId":4,"children":[],"name":"院校农信"}],"name":"高新农信"}],"name":"潍坊农信"}],"name":"山东农信"},{"id":2,"parentId":0,"children":[{"id":7,"parentId":2,"children":[{"id":8,"parentId":7,"children":[{"id":11,"parentId":8,"children":[],"name":"院校沙县"}],"name":"潍坊沙县"}],"name":"山东沙县"}],"name":"沙县国际"}]}`
}

exports.getUserDetails = async function (ctx) {
  ctx.body = `{"code":0,"msg":"success","data":null}`
}

exports.getRoleList = async function (ctx) {
  ctx.body = `{"code":0,"msg":"success","data":[{"roleId":1,"roleName":"管理员","roleCode":"ROLE_ADMIN","roleDesc":"管理员","dsType":2,"dsScope":"2","createTime":"2017-10-29 15:45:51","updateTime":"2018-12-26 14:09:11","delFlag":"0"}]}`
}

exports.postUser = async function (ctx) {
  ctx.body = `{"code":0,"msg":"success","data":true}`
}

exports.deleteUser = async function (ctx) {
  ctx.body = `{"code":0,"msg":"success","data":true}`
}
exports.getMenuTree = async function (ctx) {
  ctx.body = `{"code":0,"msg":"success","data":[{"id":1000,"parentId":-1,"children":[{"id":1100,"parentId":1000,"children":[{"id":1101,"parentId":1100,"children":[],"icon":null,"name":"用户新增","spread":false,"path":null,"component":null,"authority":null,"redirect":null,"keepAlive":"0","code":"sys_user_add","type":null,"label":"用户新增","sort":null},{"id":1102,"parentId":1100,"children":[],"icon":null,"name":"用户修改","spread":false,"path":null,"component":null,"authority":null,"redirect":null,"keepAlive":"0","code":"sys_user_edit","type":null,"label":"用户修改","sort":null},{"id":1103,"parentId":1100,"children":[],"icon":null,"name":"用户删除","spread":false,"path":null,"component":null,"authority":null,"redirect":null,"keepAlive":"0","code":"sys_user_del","type":null,"label":"用户删除","sort":null}],"icon":"icon-yonghuguanli","name":"用户管理","spread":false,"path":"user","component":"views/admin/user/index","authority":null,"redirect":null,"keepAlive":"0","code":null,"type":null,"label":"用户管理","sort":null},{"id":1200,"parentId":1000,"children":[{"id":1201,"parentId":1200,"children":[],"icon":null,"name":"菜单新增","spread":false,"path":null,"component":null,"authority":null,"redirect":null,"keepAlive":"0","code":"sys_menu_add","type":null,"label":"菜单新增","sort":null},{"id":1202,"parentId":1200,"children":[],"icon":null,"name":"菜单修改","spread":false,"path":null,"component":null,"authority":null,"redirect":null,"keepAlive":"0","code":"sys_menu_edit","type":null,"label":"菜单修改","sort":null},{"id":1203,"parentId":1200,"children":[],"icon":null,"name":"菜单删除","spread":false,"path":null,"component":null,"authority":null,"redirect":null,"keepAlive":"0","code":"sys_menu_del","type":null,"label":"菜单删除","sort":null}],"icon":"icon-caidanguanli","name":"菜单管理","spread":false,"path":"menu","component":"views/admin/menu/index","authority":null,"redirect":null,"keepAlive":"0","code":null,"type":null,"label":"菜单管理","sort":null},{"id":1300,"parentId":1000,"children":[{"id":1301,"parentId":1300,"children":[],"icon":null,"name":"角色新增","spread":false,"path":null,"component":null,"authority":null,"redirect":null,"keepAlive":"0","code":"sys_role_add","type":null,"label":"角色新增","sort":null},{"id":1302,"parentId":1300,"children":[],"icon":null,"name":"角色修改","spread":false,"path":null,"component":null,"authority":null,"redirect":null,"keepAlive":"0","code":"sys_role_edit","type":null,"label":"角色修改","sort":null},{"id":1303,"parentId":1300,"children":[],"icon":null,"name":"角色删除","spread":false,"path":null,"component":null,"authority":null,"redirect":null,"keepAlive":"0","code":"sys_role_del","type":null,"label":"角色删除","sort":null},{"id":1304,"parentId":1300,"children":[],"icon":null,"name":"分配权限","spread":false,"path":null,"component":null,"authority":null,"redirect":null,"keepAlive":"0","code":"sys_role_perm","type":null,"label":"分配权限","sort":null}],"icon":"icon-jiaoseguanli","name":"角色管理","spread":false,"path":"role","component":"views/admin/role/index","authority":null,"redirect":null,"keepAlive":"0","code":null,"type":null,"label":"角色管理","sort":null},{"id":1400,"parentId":1000,"children":[{"id":1401,"parentId":1400,"children":[],"icon":null,"name":"部门新增","spread":false,"path":null,"component":null,"authority":null,"redirect":null,"keepAlive":"0","code":"sys_dept_add","type":null,"label":"部门新增","sort":null},{"id":1402,"parentId":1400,"children":[],"icon":null,"name":"部门修改","spread":false,"path":null,"component":null,"authority":null,"redirect":null,"keepAlive":"0","code":"sys_dept_edit","type":null,"label":"部门修改","sort":null},{"id":1403,"parentId":1400,"children":[],"icon":null,"name":"部门删除","spread":false,"path":null,"component":null,"authority":null,"redirect":null,"keepAlive":"0","code":"sys_dept_del","type":null,"label":"部门删除","sort":null}],"icon":"icon-web-icon-","name":"部门管理","spread":false,"path":"dept","component":"views/admin/dept/index","authority":null,"redirect":null,"keepAlive":"0","code":null,"type":null,"label":"部门管理","sort":null}],"icon":"icon-quanxianguanli","name":"权限管理","spread":false,"path":"/upms","component":"Layout","authority":null,"redirect":null,"keepAlive":"0","code":null,"type":null,"label":"权限管理","sort":null},{"id":2000,"parentId":-1,"children":[{"id":2100,"parentId":2000,"children":[{"id":2101,"parentId":2100,"children":[],"icon":null,"name":"日志删除","spread":false,"path":null,"component":null,"authority":null,"redirect":null,"keepAlive":"0","code":"sys_log_del","type":null,"label":"日志删除","sort":null}],"icon":"icon-rizhiguanli","name":"日志管理","spread":false,"path":"log","component":"views/admin/log/index","authority":null,"redirect":null,"keepAlive":"0","code":null,"type":null,"label":"日志管理","sort":null},{"id":2200,"parentId":2000,"children":[{"id":2201,"parentId":2200,"children":[],"icon":null,"name":"字典删除","spread":false,"path":null,"component":null,"authority":null,"redirect":null,"keepAlive":"0","code":"sys_dict_del","type":null,"label":"字典删除","sort":null},{"id":2202,"parentId":2200,"children":[],"icon":null,"name":"字典新增","spread":false,"path":null,"component":null,"authority":null,"redirect":null,"keepAlive":"0","code":"sys_dict_add","type":null,"label":"字典新增","sort":null},{"id":2203,"parentId":2200,"children":[],"icon":null,"name":"字典修改","spread":false,"path":null,"component":null,"authority":null,"redirect":null,"keepAlive":"0","code":"sys_dict_edit","type":null,"label":"字典修改","sort":null}],"icon":"icon-navicon-zdgl","name":"字典管理","spread":false,"path":"dict","component":"views/admin/dict/index","authority":null,"redirect":null,"keepAlive":"0","code":null,"type":null,"label":"字典管理","sort":null},{"id":2300,"parentId":2000,"children":[],"icon":"icon-weibiaoti46","name":"代码生成","spread":false,"path":"gen","component":"views/gen/index","authority":null,"redirect":null,"keepAlive":"0","code":"","type":null,"label":"代码生成","sort":null},{"id":2400,"parentId":2000,"children":[{"id":2401,"parentId":2400,"children":[],"icon":"1","name":"客户端新增","spread":false,"path":null,"component":null,"authority":null,"redirect":null,"keepAlive":"0","code":"sys_client_add","type":null,"label":"客户端新增","sort":null},{"id":2402,"parentId":2400,"children":[],"icon":null,"name":"客户端修改","spread":false,"path":null,"component":null,"authority":null,"redirect":null,"keepAlive":"0","code":"sys_client_edit","type":null,"label":"客户端修改","sort":null},{"id":2403,"parentId":2400,"children":[],"icon":null,"name":"客户端删除","spread":false,"path":null,"component":null,"authority":null,"redirect":null,"keepAlive":"0","code":"sys_client_del","type":null,"label":"客户端删除","sort":null}],"icon":"icon-shouji","name":"终端管理","spread":false,"path":"client","component":"views/admin/client/index","authority":null,"redirect":null,"keepAlive":"0","code":"","type":null,"label":"终端管理","sort":null},{"id":2500,"parentId":2000,"children":[{"id":2501,"parentId":2500,"children":[],"icon":"1","name":"密钥新增","spread":false,"path":null,"component":null,"authority":null,"redirect":null,"keepAlive":"0","code":"generator_syssocialdetails_add","type":null,"label":"密钥新增","sort":null},{"id":2502,"parentId":2500,"children":[],"icon":"1","name":"密钥修改","spread":false,"path":null,"component":null,"authority":null,"redirect":null,"keepAlive":"0","code":"generator_syssocialdetails_edit","type":null,"label":"密钥修改","sort":null},{"id":2503,"parentId":2500,"children":[],"icon":"1","name":"密钥删除","spread":false,"path":null,"component":null,"authority":null,"redirect":null,"keepAlive":"0","code":"generator_syssocialdetails_del","type":null,"label":"密钥删除","sort":null}],"icon":"icon-miyue","name":"密钥管理","spread":false,"path":"social","component":"views/admin/social/index","authority":null,"redirect":null,"keepAlive":"0","code":"","type":null,"label":"密钥管理","sort":null},{"id":2600,"parentId":2000,"children":[{"id":2601,"parentId":2600,"children":[],"icon":null,"name":"令牌删除","spread":false,"path":null,"component":null,"authority":null,"redirect":null,"keepAlive":"0","code":"sys_token_del","type":null,"label":"令牌删除","sort":null}],"icon":"icon-denglvlingpai","name":"令牌管理","spread":false,"path":"token","component":"views/admin/token/index","authority":null,"redirect":null,"keepAlive":"0","code":null,"type":null,"label":"令牌管理","sort":null},{"id":2700,"parentId":2000,"children":[],"icon":"icon-luyou","name":"动态路由","spread":false,"path":"route","component":"views/admin/route/index","authority":null,"redirect":null,"keepAlive":"0","code":null,"type":null,"label":"动态路由","sort":null}],"icon":"icon-xitongguanli","name":"系统管理","spread":false,"path":"/admin","component":"Layout","authority":null,"redirect":null,"keepAlive":"0","code":null,"type":null,"label":"系统管理","sort":null},{"id":3000,"parentId":-1,"children":[{"id":3100,"parentId":3000,"children":[],"icon":"icon-server","name":"服务监控","spread":false,"path":"http://139.224.200.249:15001","component":null,"authority":null,"redirect":null,"keepAlive":"0","code":null,"type":null,"label":"服务监控","sort":null},{"id":3200,"parentId":3000,"children":[],"icon":"icon-wendang","name":"接口文档","spread":false,"path":"http://139.224.200.249:19999/swagger-ui.html","component":null,"authority":null,"redirect":null,"keepAlive":"0","code":null,"type":null,"label":"接口文档","sort":null},{"id":3300,"parentId":3000,"children":[],"icon":"icon-gtsquanjushiwufuwuGTS","name":"事务监控","spread":false,"path":"tx","component":"views/tx/index","authority":null,"redirect":null,"keepAlive":"0","code":null,"type":null,"label":"事务监控","sort":null},{"id":3400,"parentId":3000,"children":[],"icon":"icon-online","name":"在线事务","spread":false,"path":"model","component":"views/tx/model","authority":null,"redirect":null,"keepAlive":"0","code":null,"type":null,"label":"在线事务","sort":null},{"id":3500,"parentId":3000,"children":[],"icon":"icon-msnui-supervise","name":"任务监控","spread":false,"path":"http://139.224.200.249:8899","component":null,"authority":null,"redirect":null,"keepAlive":"0","code":null,"type":null,"label":"任务监控","sort":null},{"id":3600,"parentId":3000,"children":[{"id":3601,"parentId":3600,"children":[],"icon":"1","name":"删除任务轨迹","spread":false,"path":null,"component":null,"authority":null,"redirect":null,"keepAlive":"0","code":"daemon_status_trace_log_del","type":null,"label":"删除任务轨迹","sort":null}],"icon":"icon-guiji","name":"任务轨迹","spread":false,"path":"status-trace-log","component":"views/daemon/status-trace-log/index","authority":null,"redirect":null,"keepAlive":"0","code":"","type":null,"label":"任务轨迹","sort":null},{"id":3700,"parentId":3000,"children":[],"icon":"icon-line","name":"调用拓扑","spread":false,"path":"http://139.224.200.249:8081","component":null,"authority":null,"redirect":null,"keepAlive":"0","code":null,"type":null,"label":"调用拓扑","sort":null},{"id":3800,"parentId":3000,"children":[],"icon":"icon-qingchuhuancun","name":"缓存状态","spread":false,"path":"http://139.224.200.249:8585","component":null,"authority":null,"redirect":null,"keepAlive":"0","code":null,"type":null,"label":"缓存状态","sort":null},{"id":3900,"parentId":3000,"children":[{"id":3901,"parentId":3900,"children":[],"icon":"1","name":"删除日志","spread":false,"path":null,"component":null,"authority":null,"redirect":null,"keepAlive":"0","code":"daemon_execution_log_del","type":null,"label":"删除日志","sort":null}],"icon":"icon-guiji","name":"任务日志","spread":false,"path":"execution-log","component":"views/daemon/execution-log/index","authority":null,"redirect":null,"keepAlive":"0","code":"","type":null,"label":"任务日志","sort":null}],"icon":"icon-msnui-supervise","name":"系统监控","spread":false,"path":"/daemon","component":"Layout","authority":null,"redirect":null,"keepAlive":"0","code":null,"type":null,"label":"系统监控","sort":null},{"id":4000,"parentId":-1,"children":[{"id":4100,"parentId":4000,"children":[{"id":4101,"parentId":4100,"children":[],"icon":"1","name":"模型管理","spread":false,"path":null,"component":null,"authority":null,"redirect":null,"keepAlive":"0","code":"act_model_manage","type":null,"label":"模型管理","sort":null}],"icon":"icon-weibiaoti13","name":"模型管理","spread":false,"path":"activiti","component":"views/activiti/index","authority":null,"redirect":null,"keepAlive":"0","code":null,"type":null,"label":"模型管理","sort":null},{"id":4200,"parentId":4000,"children":[{"id":4201,"parentId":4200,"children":[],"icon":"1","name":"流程管理","spread":false,"path":null,"component":null,"authority":null,"redirect":null,"keepAlive":"0","code":"act_process_manage","type":null,"label":"流程管理","sort":null}],"icon":"icon-liucheng","name":"流程管理","spread":false,"path":"process","component":"views/activiti/process","authority":null,"redirect":null,"keepAlive":"0","code":null,"type":null,"label":"流程管理","sort":null},{"id":4300,"parentId":4000,"children":[{"id":4301,"parentId":4300,"children":[],"icon":"1","name":"请假新增","spread":false,"path":null,"component":null,"authority":null,"redirect":null,"keepAlive":"0","code":"act_leavebill_add","type":null,"label":"请假新增","sort":null},{"id":4302,"parentId":4300,"children":[],"icon":"1","name":"请假修改","spread":false,"path":null,"component":null,"authority":null,"redirect":null,"keepAlive":"0","code":"act_leavebill_edit","type":null,"label":"请假修改","sort":null},{"id":4303,"parentId":4300,"children":[],"icon":"1","name":"请假删除","spread":false,"path":null,"component":null,"authority":null,"redirect":null,"keepAlive":"0","code":"act_leavebill_del","type":null,"label":"请假删除","sort":null}],"icon":"icon-qingjia","name":"请假管理","spread":false,"path":"leavebill","component":"views/activiti/leave","authority":null,"redirect":null,"keepAlive":"0","code":"","type":null,"label":"请假管理","sort":null},{"id":4400,"parentId":4000,"children":[{"id":4401,"parentId":4400,"children":[],"icon":"1","name":"流程管理","spread":false,"path":null,"component":null,"authority":null,"redirect":null,"keepAlive":"0","code":"act_task_manage","type":null,"label":"流程管理","sort":null}],"icon":"icon-renwu","name":"待办任务","spread":false,"path":"task","component":"views/activiti/task","authority":null,"redirect":null,"keepAlive":"0","code":null,"type":null,"label":"待办任务","sort":null}],"icon":"icon-kuaisugongzuoliu_o","name":"协同管理","spread":false,"path":"/activti","component":"Layout","authority":null,"redirect":null,"keepAlive":"0","code":null,"type":null,"label":"协同管理","sort":null},{"id":5000,"parentId":-1,"children":[{"id":5003,"parentId":5000,"children":[],"icon":"icon-caidanguanli","name":"一级菜单","spread":false,"path":"","component":"","authority":null,"redirect":null,"keepAlive":"0","code":null,"type":null,"label":"一级菜单","sort":null}],"icon":"icon-caidanguanli","name":"多级菜单","spread":false,"path":"/crud","component":"","authority":null,"redirect":null,"keepAlive":"0","code":null,"type":null,"label":"多级菜单","sort":null}]}`
}

exports.getRolePage = async function (ctx) {
  ctx.body = `{"code":0,"msg":"success","data":{"records":[{"roleId":1,"roleName":"管理员","roleCode":"ROLE_ADMIN","roleDesc":"管理员","dsType":2,"dsScope":"2","createTime":"2017-10-29 15:45:51","updateTime":"2018-12-26 14:09:11","delFlag":"0"}],"total":1,"size":20,"current":1,"searchCount":true,"pages":1}}`
}

exports.getDictTypeLogType = async function (ctx) {
  ctx.body = `{"code":0,"msg":"success","data":[{"id":1,"value":"9","label":"异常","type":"log_type","description":"日志异常","sort":1,"createTime":"2018-07-09 06:16:14","updateTime":"2018-11-24 07:25:11","remarks":"日志异常","delFlag":"0"},{"id":5,"value":"0","label":"正常","type":"log_type","description":"日志类型","sort":0,"createTime":"2018-09-30 02:33:53","updateTime":"2018-11-24 07:25:20","remarks":"日志正常","delFlag":"0"}]}`
}

exports.getLogPage = async function (ctx) {
  ctx.body = `{"code":0,"msg":"success","data":{"records":[{"id":4,"type":"0","title":"删除用户信息","createBy":"admin","createTime":"2019-02-13 09:20:50","updateTime":null,"remoteAddr":"127.0.0.1","userAgent":"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/71.0.3578.98 Safari/537.36","requestUri":"/user/6","method":"DELETE","params":"","time":21,"exception":null,"serviceId":"gds","delFlag":"0"},{"id":3,"type":"0","title":"更新用户信息","createBy":"admin","createTime":"2019-02-13 09:17:20","updateTime":null,"remoteAddr":"127.0.0.1","userAgent":"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/71.0.3578.98 Safari/537.36","requestUri":"/user","method":"PUT","params":"","time":18,"exception":null,"serviceId":"gds","delFlag":"0"},{"id":2,"type":"0","title":"更新用户信息","createBy":"admin","createTime":"2019-02-13 09:12:51","updateTime":null,"remoteAddr":"127.0.0.1","userAgent":"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/71.0.3578.98 Safari/537.36","requestUri":"/user","method":"PUT","params":"","time":95,"exception":null,"serviceId":"gds","delFlag":"0"},{"id":1,"type":"0","title":"添加用户","createBy":"admin","createTime":"2019-02-13 08:55:43","updateTime":null,"remoteAddr":"127.0.0.1","userAgent":"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/71.0.3578.98 Safari/537.36","requestUri":"/user","method":"POST","params":"","time":142,"exception":null,"serviceId":"gds","delFlag":"0"}],"total":4,"size":20,"current":1,"searchCount":true,"pages":1}}`
}

exports.getDictPage = async function (ctx) {
  ctx.body = `{"code":0,"msg":"success","data":{"records":[{"id":1,"value":"9","label":"异常","type":"log_type","description":"日志异常","sort":1,"createTime":"2018-07-09 06:16:14","updateTime":"2018-11-24 07:25:11","remarks":"日志异常","delFlag":"0"},{"id":5,"value":"0","label":"正常","type":"log_type","description":"日志类型","sort":0,"createTime":"2018-09-30 02:33:53","updateTime":"2018-11-24 07:25:20","remarks":"日志正常","delFlag":"0"},{"id":6,"value":"0","label":"未提交","type":"leave_status","description":"请假状态","sort":0,"createTime":"2018-09-30 02:34:45","updateTime":"2018-11-24 07:25:23","remarks":"请假状态","delFlag":"0"},{"id":7,"value":"1","label":"审批中","type":"leave_status","description":"请假状态","sort":1,"createTime":"2018-09-30 02:35:16","updateTime":"2018-11-24 07:25:25","remarks":"请假状态","delFlag":"0"},{"id":8,"value":"2","label":"完成","type":"leave_status","description":"请假状态","sort":2,"createTime":"2018-09-30 02:35:58","updateTime":"2018-11-24 07:25:28","remarks":"请假状态","delFlag":"0"},{"id":9,"value":"9","label":"驳回","type":"leave_status","description":"请假状态","sort":9,"createTime":"2018-09-30 02:36:31","updateTime":"2018-11-24 07:25:31","remarks":"请假状态","delFlag":"0"}],"total":6,"size":20,"current":1,"searchCount":true,"pages":1}}`
}
