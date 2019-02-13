const path = require('path');
const fileStream = require('../file-stream')

exports.getUserInfo = async function (ctx) {
  ctx.body = `{"code":0,"msg":"success","data":{"sysUser":{"userId":1,"username":"admin","password":"$2a$10$QOfWxxFyAMmEEmnuw9UI/..1s4B4eF/u9PzE2ZaGO.ij9YfmcUy.u","createTime":"2018-04-20 07:15:18","updateTime":"2019-01-05 17:11:20","delFlag":"0","lockFlag":"0","phone":"17034642888","avatar":"lengleng-oxjkuoy361p6x5snlogo.png","deptId":1,"tenantId":1,"wxOpenid":"o_0FT0uyg_H1vVy2H0JpSwlVGhWQ","qqOpenid":null},"permissions":["sys_client_edit","sys_dept_del","daemon_status_trace_log_del","sys_user_edit","act_task_manage","sys_menu_del","sys_dict_edit","sys_role_edit","sys_token_del","sys_dept_add","act_leavebill_add","sys_role_del","generator_syssocialdetails_edit","sys_dict_del","sys_dict_add","sys_user_del","sys_role_add","sys_menu_add","generator_syssocialdetails_add","sys_client_add","sys_dept_edit","act_process_manage","act_leavebill_edit","sys_menu_edit","sys_role_perm","sys_user_add","act_leavebill_del","act_model_manage","sys_log_del","generator_syssocialdetails_del","sys_client_del"],"roles":[1]}}`;
}

exports.getMenu = async function (ctx) {
  ctx.body = `{"code":0,"msg":"success","data":[{"id":1000,"parentId":-1,"children":[{"id":1100,"parentId":1000,"children":[],"icon":"icon-yonghuguanli","name":"用户管理","spread":false,"path":"user","component":"views/admin/user/index","authority":null,"redirect":null,"keepAlive":"0","code":null,"type":"0","label":"用户管理","sort":1},{"id":1200,"parentId":1000,"children":[],"icon":"icon-caidanguanli","name":"菜单管理","spread":false,"path":"menu","component":"views/admin/menu/index","authority":null,"redirect":null,"keepAlive":"0","code":null,"type":"0","label":"菜单管理","sort":2},{"id":1300,"parentId":1000,"children":[],"icon":"icon-jiaoseguanli","name":"角色管理","spread":false,"path":"role","component":"views/admin/role/index","authority":null,"redirect":null,"keepAlive":"0","code":null,"type":"0","label":"角色管理","sort":3},{"id":1400,"parentId":1000,"children":[],"icon":"icon-web-icon-","name":"部门管理","spread":false,"path":"dept","component":"views/admin/dept/index","authority":null,"redirect":null,"keepAlive":"0","code":null,"type":"0","label":"部门管理","sort":4}],"icon":"icon-quanxianguanli","name":"权限管理","spread":false,"path":"/upms","component":"Layout","authority":null,"redirect":null,"keepAlive":"0","code":null,"type":"0","label":"权限管理","sort":0},{"id":2000,"parentId":-1,"children":[{"id":2100,"parentId":2000,"children":[],"icon":"icon-rizhiguanli","name":"日志管理","spread":false,"path":"log","component":"views/admin/log/index","authority":null,"redirect":null,"keepAlive":"0","code":null,"type":"0","label":"日志管理","sort":5},{"id":2200,"parentId":2000,"children":[],"icon":"icon-navicon-zdgl","name":"字典管理","spread":false,"path":"dict","component":"views/admin/dict/index","authority":null,"redirect":null,"keepAlive":"0","code":null,"type":"0","label":"字典管理","sort":6},{"id":2300,"parentId":2000,"children":[],"icon":"icon-weibiaoti46","name":"代码生成","spread":false,"path":"gen","component":"views/gen/index","authority":null,"redirect":null,"keepAlive":"0","code":null,"type":"0","label":"代码生成","sort":8},{"id":2400,"parentId":2000,"children":[],"icon":"icon-shouji","name":"终端管理","spread":false,"path":"client","component":"views/admin/client/index","authority":null,"redirect":null,"keepAlive":"0","code":null,"type":"0","label":"终端管理","sort":9},{"id":2500,"parentId":2000,"children":[],"icon":"icon-miyue","name":"密钥管理","spread":false,"path":"social","component":"views/admin/social/index","authority":null,"redirect":null,"keepAlive":"0","code":null,"type":"0","label":"密钥管理","sort":10},{"id":2600,"parentId":2000,"children":[],"icon":"icon-denglvlingpai","name":"令牌管理","spread":false,"path":"token","component":"views/admin/token/index","authority":null,"redirect":null,"keepAlive":"0","code":null,"type":"0","label":"令牌管理","sort":11},{"id":2700,"parentId":2000,"children":[],"icon":"icon-luyou","name":"动态路由","spread":false,"path":"route","component":"views/admin/route/index","authority":null,"redirect":null,"keepAlive":"0","code":null,"type":"0","label":"动态路由","sort":12}],"icon":"icon-xitongguanli","name":"系统管理","spread":false,"path":"/admin","component":"Layout","authority":null,"redirect":null,"keepAlive":"0","code":null,"type":"0","label":"系统管理","sort":1},{"id":3000,"parentId":-1,"children":[{"id":3100,"parentId":3000,"children":[],"icon":"icon-server","name":"服务监控","spread":false,"path":"http://139.224.200.249:15001","component":null,"authority":null,"redirect":null,"keepAlive":"0","code":null,"type":"0","label":"服务监控","sort":0},{"id":3200,"parentId":3000,"children":[],"icon":"icon-wendang","name":"接口文档","spread":false,"path":"http://139.224.200.249:19999/swagger-ui.html","component":null,"authority":null,"redirect":null,"keepAlive":"0","code":null,"type":"0","label":"接口文档","sort":1},{"id":3300,"parentId":3000,"children":[],"icon":"icon-gtsquanjushiwufuwuGTS","name":"事务监控","spread":false,"path":"tx","component":"views/tx/index","authority":null,"redirect":null,"keepAlive":"0","code":null,"type":"0","label":"事务监控","sort":5},{"id":3400,"parentId":3000,"children":[],"icon":"icon-online","name":"在线事务","spread":false,"path":"model","component":"views/tx/model","authority":null,"redirect":null,"keepAlive":"0","code":null,"type":"0","label":"在线事务","sort":6},{"id":3500,"parentId":3000,"children":[],"icon":"icon-msnui-supervise","name":"任务监控","spread":false,"path":"http://139.224.200.249:8899","component":null,"authority":null,"redirect":null,"keepAlive":"0","code":null,"type":"0","label":"任务监控","sort":7},{"id":3600,"parentId":3000,"children":[],"icon":"icon-guiji","name":"任务轨迹","spread":false,"path":"status-trace-log","component":"views/daemon/status-trace-log/index","authority":null,"redirect":null,"keepAlive":"0","code":null,"type":"0","label":"任务轨迹","sort":8},{"id":3700,"parentId":3000,"children":[],"icon":"icon-line","name":"调用拓扑","spread":false,"path":"http://139.224.200.249:8081","component":null,"authority":null,"redirect":null,"keepAlive":"0","code":null,"type":"0","label":"调用拓扑","sort":10},{"id":3800,"parentId":3000,"children":[],"icon":"icon-qingchuhuancun","name":"缓存状态","spread":false,"path":"http://139.224.200.249:8585","component":null,"authority":null,"redirect":null,"keepAlive":"0","code":null,"type":"0","label":"缓存状态","sort":12}],"icon":"icon-msnui-supervise","name":"系统监控","spread":false,"path":"/daemon","component":"Layout","authority":null,"redirect":null,"keepAlive":"0","code":null,"type":"0","label":"系统监控","sort":2},{"id":4000,"parentId":-1,"children":[{"id":4100,"parentId":4000,"children":[],"icon":"icon-weibiaoti13","name":"模型管理","spread":false,"path":"activiti","component":"views/activiti/index","authority":null,"redirect":null,"keepAlive":"0","code":null,"type":"0","label":"模型管理","sort":1},{"id":4200,"parentId":4000,"children":[],"icon":"icon-liucheng","name":"流程管理","spread":false,"path":"process","component":"views/activiti/process","authority":null,"redirect":null,"keepAlive":"0","code":null,"type":"0","label":"流程管理","sort":2},{"id":4300,"parentId":4000,"children":[],"icon":"icon-qingjia","name":"请假管理","spread":false,"path":"leavebill","component":"views/activiti/leave","authority":null,"redirect":null,"keepAlive":"0","code":null,"type":"0","label":"请假管理","sort":3},{"id":4400,"parentId":4000,"children":[],"icon":"icon-renwu","name":"待办任务","spread":false,"path":"task","component":"views/activiti/task","authority":null,"redirect":null,"keepAlive":"0","code":null,"type":"0","label":"待办任务","sort":4}],"icon":"icon-kuaisugongzuoliu_o","name":"协同管理","spread":false,"path":"/activti","component":"Layout","authority":null,"redirect":null,"keepAlive":"0","code":null,"type":"0","label":"协同管理","sort":3}]}`;
}

exports.getAvatar = async function (ctx) {
  const realPath = path.resolve(__dirname, '../resource/lengleng-oxjkuoy361p6x5snlogo.png')
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
