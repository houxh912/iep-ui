const fs = require('fs');
const path = require('path');

exports.getUserInfo = async function (ctx) {
  ctx.body = `{"code":0,"msg":"success","data":{"sysUser":{"userId":1,"username":"admin","password":"$2a$10$QOfWxxFyAMmEEmnuw9UI/..1s4B4eF/u9PzE2ZaGO.ij9YfmcUy.u","createTime":"2018-04-20 07:15:18","updateTime":"2019-01-05 17:11:20","delFlag":"0","lockFlag":"0","phone":"17034642888","avatar":"lengleng-oxjkuoy361p6x5snlogo.png","deptId":1,"tenantId":1,"wxOpenid":"o_0FT0uyg_H1vVy2H0JpSwlVGhWQ","qqOpenid":null},"permissions":["sys_client_edit","sys_dept_del","daemon_status_trace_log_del","sys_user_edit","act_task_manage","sys_menu_del","sys_dict_edit","sys_role_edit","sys_token_del","sys_dept_add","act_leavebill_add","sys_role_del","generator_syssocialdetails_edit","sys_dict_del","sys_dict_add","sys_user_del","sys_role_add","sys_menu_add","generator_syssocialdetails_add","sys_client_add","sys_dept_edit","act_process_manage","act_leavebill_edit","sys_menu_edit","sys_role_perm","sys_user_add","act_leavebill_del","act_model_manage","sys_log_del","generator_syssocialdetails_del","sys_client_del"],"roles":[1]}}`;
}
