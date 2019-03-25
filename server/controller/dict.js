exports.getDictPage = async function (ctx) {
  const json = {
    code: 0,
    msg: 'success',
    data: {
      "total": 6, "size": 20, "current": 1, "searchCount": true, "pages": 1,
      records: [
        { "id": 1, "code": "IS_LOAD", "name": "是否登录", "system": "DIPS", "createTime": "2018-07-09 06:16:14", "updateTime": "2018-11-24 07:25:11" },
        { "id": 2, "code": "DATA_TYPE", "name": "数据类型", "system": "DIPS", "createTime": "2018-07-09 06:16:14", "updateTime": "2018-11-24 07:25:11" }
      ]
    }
  }
  ctx.body = json
}

exports.getDictChildById = async function (ctx) {
  const json = {
    code: 0,
    msg: 'success',
    data: [
      {
        "id": 1, "value": "IS_LOAD", "label": "是否登录", "sort": 1, children: [
          { "id": 3, "value": "DATA_TYPE", "label": "数据类型", "sort": 1 }
        ]
      },
      { "id": 2, "value": "DATA_TYPE", "label": "数据类型", "sort": 2 }
    ]
  }
  ctx.body = json
}
exports.getDictMap = async function (ctx) {
  ctx.body = `{"hrms_birth_status":[{"id":43,"value":"2","label":"已育","createTime":"2019-03-14 15:02:30","updateTime":"2019-03-14 15:02:30","sort":1,"children":[]},{"id":42,"value":"1","label":"未育","createTime":"2019-03-14 15:02:22","updateTime":"2019-03-14 15:02:22","sort":1,"children":[]}],"fams_account_type":[{"id":146,"value":"3","label":"个人账户","createTime":"2019-03-23 15:09:26","updateTime":"2019-03-23 15:09:26","sort":1,"children":[]},{"id":145,"value":"2","label":"组织账户","createTime":"2019-03-23 15:09:18","updateTime":"2019-03-23 15:09:18","sort":1,"children":[]},{"id":144,"value":"1","label":"集团总账户","createTime":"2019-03-23 15:09:09","updateTime":"2019-03-23 15:09:09","sort":1,"children":[]}],"hrms_app_way":[{"id":41,"value":"9","label":"本地人才网","createTime":"2019-03-09 14:30:38","updateTime":"2019-03-09 14:30:38","sort":1,"children":[]},{"id":40,"value":"8","label":"其他","createTime":"2019-03-09 14:30:30","updateTime":"2019-03-09 14:30:30","sort":1,"children":[]},{"id":39,"value":"7","label":"官网","createTime":"2019-03-09 14:30:21","updateTime":"2019-03-09 14:30:21","sort":1,"children":[]},{"id":38,"value":"6","label":"校招","createTime":"2019-03-09 14:30:09","updateTime":"2019-03-09 14:30:09","sort":1,"children":[]},{"id":37,"value":"5","label":"内部推荐","createTime":"2019-03-09 14:29:59","updateTime":"2019-03-09 14:29:59","sort":1,"children":[]},{"id":36,"value":"4","label":"老员工回归","createTime":"2019-03-09 14:29:51","updateTime":"2019-03-09 14:29:51","sort":1,"children":[]},{"id":35,"value":"3","label":"专家推荐","createTime":"2019-03-09 14:29:24","updateTime":"2019-03-09 14:29:24","sort":1,"children":[]},{"id":34,"value":"2","label":"51JOB","createTime":"2019-03-09 14:29:18","updateTime":"2019-03-09 14:29:18","sort":1,"children":[]},{"id":33,"value":"1","label":"智联","createTime":"2019-03-09 14:29:11","updateTime":"2019-03-09 14:29:11","sort":1,"children":[]}],"hrms_resume_source":[{"id":20,"value":"4","label":"自主提交","createTime":"2019-03-08 09:33:33","updateTime":"2019-03-08 09:33:33","sort":1,"children":[]},{"id":19,"value":"3","label":"专家推荐","createTime":"2019-03-08 09:33:19","updateTime":"2019-03-08 09:33:19","sort":1,"children":[]},{"id":18,"value":"2","label":"老员工回归","createTime":"2019-03-08 09:33:09","updateTime":"2019-03-08 09:33:09","sort":1,"children":[]},{"id":17,"value":"1","label":"新员工推荐","createTime":"2019-03-08 09:33:00","updateTime":"2019-03-08 09:33:00","sort":1,"children":[]}],"ims_msg_type":[{"id":138,"value":"0","label":"全部","createTime":"2019-03-22 13:43:42","updateTime":"2019-03-22 13:43:42","sort":1,"children":[]},{"id":137,"value":"7","label":"星标","createTime":"2019-03-22 13:43:11","updateTime":"2019-03-22 13:43:11","sort":1,"children":[]},{"id":7,"value":"6","label":"其他","createTime":"2019-03-06 19:05:45","updateTime":"2019-03-06 19:05:45","sort":1,"children":[]},{"id":6,"value":"5","label":"提醒","createTime":"2019-03-06 19:05:43","updateTime":"2019-03-06 19:05:43","sort":1,"children":[]},{"id":5,"value":"4","label":"审批","createTime":"2019-03-06 19:05:32","updateTime":"2019-03-06 19:05:32","sort":1,"children":[]},{"id":4,"value":"3","label":"财富","createTime":"2019-03-06 16:56:14","updateTime":"2019-03-06 16:56:14","sort":1,"children":[]},{"id":3,"value":"2","label":"任务","createTime":"2019-03-06 16:56:13","updateTime":"2019-03-06 16:56:13","sort":1,"children":[]},{"id":2,"value":"1","label":"纪要","createTime":"2019-03-06 16:56:12","updateTime":"2019-03-06 16:56:12","sort":1,"children":[]}],"hrms_politics_face":[{"id":28,"value":"5","label":"无党派人士","createTime":"2019-03-09 14:26:31","updateTime":"2019-03-09 14:26:31","sort":1,"children":[]},{"id":27,"value":"4","label":"民族党派","createTime":"2019-03-09 14:26:24","updateTime":"2019-03-09 14:26:24","sort":1,"children":[]},{"id":26,"value":"3","label":"中共党员","createTime":"2019-03-09 14:26:16","updateTime":"2019-03-09 14:26:16","sort":1,"children":[]},{"id":25,"value":"2","label":"共青团员","createTime":"2019-03-09 14:26:08","updateTime":"2019-03-09 14:26:08","sort":1,"children":[]},{"id":24,"value":"1","label":"群众","createTime":"2019-03-09 14:26:00","updateTime":"2019-03-09 14:26:00","sort":1,"children":[]}],"hrms_work_type":[{"id":16,"value":"4","label":"全职/兼职","createTime":"2019-03-06 17:25:07","updateTime":"2019-03-06 17:25:07","sort":1,"children":[]},{"id":15,"value":"3","label":"实习","createTime":"2019-03-06 17:25:02","updateTime":"2019-03-06 17:25:02","sort":1,"children":[]},{"id":14,"value":"2","label":"兼职","createTime":"2019-03-06 17:24:56","updateTime":"2019-03-06 17:24:56","sort":1,"children":[]},{"id":13,"value":"1","label":"全职","createTime":"2019-03-06 17:24:49","updateTime":"2019-03-06 17:24:49","sort":1,"children":[]}],"mlms_contract_status":[{"id":130,"value":"4","label":"意外终止","createTime":"2019-03-20 14:22:16","updateTime":"2019-03-20 14:22:16","sort":1,"children":[]},{"id":129,"value":"3","label":"结束","createTime":"2019-03-20 14:22:06","updateTime":"2019-03-20 14:22:06","sort":1,"children":[]},{"id":128,"value":"2","label":"延迟","createTime":"2019-03-20 14:21:57","updateTime":"2019-03-20 14:21:57","sort":1,"children":[]},{"id":127,"value":"1","label":"执行中","createTime":"2019-03-20 14:21:48","updateTime":"2019-03-20 14:21:48","sort":1,"children":[]}],"hrms_levae_type":[{"id":73,"value":"9","label":"其它","createTime":"2019-03-18 11:57:06","updateTime":"2019-03-18 11:57:06","sort":1,"children":[]},{"id":72,"value":"8","label":"哺乳假","createTime":"2019-03-18 11:56:56","updateTime":"2019-03-18 11:56:56","sort":1,"children":[]},{"id":71,"value":"7","label":"丧假","createTime":"2019-03-18 11:56:39","updateTime":"2019-03-18 11:56:39","sort":1,"children":[]},{"id":70,"value":"6","label":"产假","createTime":"2019-03-18 11:56:09","updateTime":"2019-03-18 11:56:09","sort":1,"children":[]},{"id":69,"value":"5","label":"婚假","createTime":"2019-03-18 11:55:58","updateTime":"2019-03-18 11:55:58","sort":1,"children":[]},{"id":68,"value":"4","label":"调休","createTime":"2019-03-18 11:55:47","updateTime":"2019-03-18 11:55:47","sort":1,"children":[]},{"id":67,"value":"3","label":"年假","createTime":"2019-03-18 11:55:38","updateTime":"2019-03-18 11:55:38","sort":1,"children":[]},{"id":66,"value":"2","label":"病假","createTime":"2019-03-18 11:55:29","updateTime":"2019-03-18 11:55:29","sort":1,"children":[]},{"id":65,"value":"1","label":"事假","createTime":"2019-03-18 11:55:20","updateTime":"2019-03-18 11:55:20","sort":1,"children":[]}],"mlms_business_type":[{"id":115,"value":"7","label":"其他","createTime":"2019-03-20 10:27:59","updateTime":"2019-03-20 10:27:59","sort":1,"children":[]},{"id":114,"value":"6","label":"技术服务","createTime":"2019-03-20 10:27:47","updateTime":"2019-03-20 10:27:47","sort":1,"children":[]},{"id":113,"value":"5","label":"会议培训","createTime":"2019-03-20 10:24:46","updateTime":"2019-03-20 10:24:46","sort":1,"children":[]},{"id":112,"value":"4","label":"外包","createTime":"2019-03-20 10:24:34","updateTime":"2019-03-20 10:24:34","sort":1,"children":[]},{"id":111,"value":"3","label":"数据","createTime":"2019-03-20 10:24:22","updateTime":"2019-03-20 10:24:22","sort":1,"children":[]},{"id":110,"value":"2","label":"产品","createTime":"2019-03-20 10:24:15","updateTime":"2019-03-20 10:24:15","sort":1,"children":[]},{"id":109,"value":"1","label":"咨询","createTime":"2019-03-20 10:24:07","updateTime":"2019-03-20 10:24:07","sort":1,"children":[]}],"log_type":[{"id":1,"value":"1","label":"正常","createTime":"2019-03-06 14:44:29","updateTime":"2019-03-06 14:44:29","sort":1,"children":[]}],"hrms_applic_type":[{"id":64,"value":"7","label":"招聘申请","createTime":"2019-03-18 11:54:33","updateTime":"2019-03-18 11:54:33","sort":1,"children":[]},{"id":63,"value":"6","label":"调岗申请","createTime":"2019-03-18 11:54:19","updateTime":"2019-03-18 11:54:19","sort":1,"children":[]},{"id":62,"value":"5","label":"离职申请","createTime":"2019-03-18 11:54:09","updateTime":"2019-03-18 11:54:09","sort":1,"children":[]},{"id":61,"value":"4","label":"转正申请","createTime":"2019-03-18 11:53:57","updateTime":"2019-03-18 11:53:57","sort":1,"children":[]},{"id":60,"value":"3","label":"加班申请","createTime":"2019-03-18 11:53:44","updateTime":"2019-03-18 11:53:44","sort":1,"children":[]},{"id":59,"value":"2","label":"出差申请","createTime":"2019-03-18 11:53:31","updateTime":"2019-03-18 11:53:31","sort":1,"children":[]},{"id":58,"value":"1","label":"请假申请","createTime":"2019-03-18 11:53:21","updateTime":"2019-03-18 11:53:21","sort":1,"children":[]}],"ims_notify_type":[{"id":143,"value":"5","label":"其他通知","createTime":"2019-03-21 18:02:02","updateTime":"2019-03-21 18:02:02","sort":1,"children":[]},{"id":142,"value":"4","label":"人事调动","createTime":"2019-03-21 18:01:46","updateTime":"2019-03-21 18:01:46","sort":1,"children":[]},{"id":141,"value":"3","label":"培训通知","createTime":"2019-03-21 18:00:28","updateTime":"2019-03-21 18:00:28","sort":1,"children":[]},{"id":140,"value":"2","label":"公司制度","createTime":"2019-03-21 18:00:20","updateTime":"2019-03-21 18:00:20","sort":1,"children":[]},{"id":139,"value":"1","label":"日常公告","createTime":"2019-03-21 18:01:53","updateTime":"2019-03-21 18:01:53","sort":1,"children":[]}],"mlms_meeting_type":[{"id":104,"value":"7","label":"其他","createTime":"2019-03-20 10:03:31","updateTime":"2019-03-20 10:03:31","sort":1,"children":[]},{"id":103,"value":"6","label":"拜访纪要","createTime":"2019-03-20 10:03:22","updateTime":"2019-03-20 10:03:22","sort":1,"children":[]},{"id":102,"value":"5","label":"日常例会","createTime":"2019-03-20 10:03:13","updateTime":"2019-03-20 10:03:13","sort":1,"children":[]},{"id":101,"value":"4","label":"培训会议","createTime":"2019-03-20 10:02:47","updateTime":"2019-03-20 10:02:47","sort":1,"children":[]},{"id":100,"value":"3","label":"产品会议","createTime":"2019-03-20 10:02:36","updateTime":"2019-03-20 10:02:36","sort":1,"children":[]},{"id":99,"value":"2","label":"项目会议","createTime":"2019-03-20 10:02:26","updateTime":"2019-03-20 10:02:26","sort":1,"children":[]},{"id":98,"value":"1","label":"市场会议","createTime":"2019-03-20 10:02:17","updateTime":"2019-03-20 10:02:17","sort":1,"children":[]},{"id":97,"value":"0","label":"管理会议","createTime":"2019-03-20 10:02:08","updateTime":"2019-03-20 10:02:08","sort":1,"children":[]}],"mlms_material_type":[],"crms_client_opportunity":[{"id":91,"value":"4","label":"数据","createTime":"2019-03-19 09:37:58","updateTime":"2019-03-19 09:37:58","sort":1,"children":[]},{"id":90,"value":"3","label":"软件","createTime":"2019-03-19 09:37:54","updateTime":"2019-03-19 09:37:54","sort":1,"children":[]},{"id":89,"value":"2","label":"平台","createTime":"2019-03-19 09:37:49","updateTime":"2019-03-19 09:37:49","sort":1,"children":[]},{"id":88,"value":"1","label":"事项","createTime":"2019-03-19 09:37:44","updateTime":"2019-03-19 09:37:44","sort":1,"children":[]},{"id":87,"value":"0","label":"咨询","createTime":"2019-03-19 09:37:41","updateTime":"2019-03-19 09:37:41","sort":1,"children":[]}],"hrms_training_mode":[{"id":57,"value":"5","label":"其他","createTime":"2019-03-14 21:57:22","updateTime":"2019-03-14 21:57:22","sort":1,"children":[]},{"id":56,"value":"4","label":"视频教学","createTime":"2019-03-14 21:57:09","updateTime":"2019-03-14 21:57:09","sort":1,"children":[]},{"id":55,"value":"3","label":"线下会议","createTime":"2019-03-14 21:57:00","updateTime":"2019-03-14 21:57:00","sort":1,"children":[]},{"id":54,"value":"2","label":"线上QQ","createTime":"2019-03-14 21:56:49","updateTime":"2019-03-14 21:56:49","sort":1,"children":[]},{"id":53,"value":"1","label":"线上微信","createTime":"2019-03-14 21:56:39","updateTime":"2019-03-14 21:56:39","sort":1,"children":[]}],"crms_client_relation":[{"id":81,"value":"4","label":"其他客户","createTime":"2019-03-19 13:37:07","updateTime":"2019-03-19 13:37:07","sort":1,"children":[]},{"id":80,"value":"3","label":"潜在客户","createTime":"2019-03-19 13:37:02","updateTime":"2019-03-19 13:37:02","sort":1,"children":[]},{"id":79,"value":"2","label":"一般客户","createTime":"2019-03-19 13:37:00","updateTime":"2019-03-19 13:37:00","sort":1,"children":[]},{"id":78,"value":"1","label":"重要客户","createTime":"2019-03-19 13:36:58","updateTime":"2019-03-19 13:36:58","sort":1,"children":[]},{"id":77,"value":"0","label":"核心客户","createTime":"2019-03-19 13:36:52","updateTime":"2019-03-19 13:36:52","sort":1,"children":[]}],"mlms_contract_level":[{"id":126,"value":"4","label":"二十万以下项目","createTime":"2019-03-20 14:21:05","updateTime":"2019-03-20 14:21:05","sort":1,"children":[]},{"id":125,"value":"3","label":"二十万及以上项目","createTime":"2019-03-20 14:20:47","updateTime":"2019-03-20 14:20:47","sort":1,"children":[]},{"id":124,"value":"2","label":"五十万以上项目","createTime":"2019-03-20 14:20:27","updateTime":"2019-03-20 14:20:27","sort":1,"children":[]},{"id":123,"value":"1","label":"百万级项目","createTime":"2019-03-20 14:20:13","updateTime":"2019-03-20 14:20:13","sort":1,"children":[]}],"hrms_highest_educational":[{"id":12,"value":"5","label":"博士及以上","createTime":"2019-03-06 17:23:41","updateTime":"2019-03-06 17:23:41","sort":1,"children":[]},{"id":11,"value":"4","label":"硕士","createTime":"2019-03-06 17:23:32","updateTime":"2019-03-06 17:23:32","sort":1,"children":[]},{"id":10,"value":"3","label":"本科","createTime":"2019-03-06 17:23:25","updateTime":"2019-03-06 17:23:25","sort":1,"children":[]},{"id":9,"value":"2","label":"大专","createTime":"2019-03-06 17:23:18","updateTime":"2019-03-06 17:23:18","sort":1,"children":[]},{"id":8,"value":"1","label":"高中及以下","createTime":"2019-03-06 17:23:10","updateTime":"2019-03-06 17:23:10","sort":1,"children":[]}],"hrms_approval_status":[{"id":134,"value":"3","label":"转交","createTime":"2019-03-20 16:13:00","updateTime":"2019-03-20 16:13:00","sort":1,"children":[]},{"id":133,"value":"2","label":"拒绝","createTime":"2019-03-20 16:12:50","updateTime":"2019-03-20 16:12:50","sort":1,"children":[]},{"id":132,"value":"1","label":"同意","createTime":"2019-03-20 16:12:42","updateTime":"2019-03-20 16:12:42","sort":1,"children":[]},{"id":131,"value":"0","label":"未审核","createTime":"2019-03-20 16:12:31","updateTime":"2019-03-20 16:12:31","sort":1,"children":[]}],"hrms_marriage_status":[{"id":32,"value":"4","label":"丧偶","createTime":"2019-03-09 14:28:05","updateTime":"2019-03-09 14:28:05","sort":1,"children":[]},{"id":31,"value":"3","label":"离异","createTime":"2019-03-09 14:27:55","updateTime":"2019-03-09 14:27:55","sort":1,"children":[]},{"id":30,"value":"2","label":"已婚","createTime":"2019-03-09 14:27:47","updateTime":"2019-03-09 14:27:47","sort":1,"children":[]},{"id":29,"value":"1","label":"未婚","createTime":"2019-03-09 14:27:39","updateTime":"2019-03-09 14:27:39","sort":1,"children":[]}],"hrms_arrive_time":[{"id":23,"value":"3","label":"一个月以上","createTime":"2019-03-09 14:24:29","updateTime":"2019-03-09 14:24:29","sort":1,"children":[]},{"id":22,"value":"2","label":"一个月内","createTime":"2019-03-09 14:24:17","updateTime":"2019-03-09 14:24:17","sort":1,"children":[]},{"id":21,"value":"1","label":"一周内","createTime":"2019-03-09 14:24:06","updateTime":"2019-03-09 14:24:06","sort":1,"children":[]}],"mlms_honor_qual_type":[{"id":122,"value":"4","label":"证书","createTime":"2019-03-20 10:38:16","updateTime":"2019-03-20 10:38:16","sort":1,"children":[]},{"id":121,"value":"3","label":"商标","createTime":"2019-03-20 10:38:10","updateTime":"2019-03-20 10:38:10","sort":1,"children":[]},{"id":120,"value":"2","label":"软件著作权","createTime":"2019-03-20 10:38:01","updateTime":"2019-03-20 10:38:01","sort":1,"children":[]},{"id":119,"value":"1","label":"软件专利","createTime":"2019-03-20 10:37:42","updateTime":"2019-03-20 10:37:42","sort":1,"children":[]}],"crms_business_type":[{"id":86,"value":"3","label":"事项","createTime":"2019-03-19 09:37:07","updateTime":"2019-03-19 09:37:07","sort":1,"children":[]},{"id":85,"value":"2","label":"数据","createTime":"2019-03-19 09:37:03","updateTime":"2019-03-19 09:37:03","sort":1,"children":[]},{"id":84,"value":"1","label":"咨询","createTime":"2019-03-19 09:36:02","updateTime":"2019-03-19 09:36:02","sort":1,"children":[]},{"id":83,"value":"5","label":"软件","createTime":"2019-03-19 09:34:41","updateTime":"2019-03-19 09:34:41","sort":1,"children":[]},{"id":82,"value":"4","label":"平台","createTime":"2019-03-19 09:34:36","updateTime":"2019-03-19 09:34:36","sort":1,"children":[]}],"crms_district_type":[{"id":76,"value":"2","label":"区级","createTime":"2019-03-19 13:44:08","updateTime":"2019-03-19 13:44:08","sort":1,"children":[]},{"id":75,"value":"1","label":"市级","createTime":"2019-03-19 13:44:06","updateTime":"2019-03-19 13:44:06","sort":1,"children":[]},{"id":74,"value":"0","label":"省级","createTime":"2019-03-19 13:44:04","updateTime":"2019-03-19 13:44:04","sort":1,"children":[]}],"crms_client_opportunity_status":[{"id":136,"value":"1","label":"已认领","createTime":"2019-03-22 13:41:57","updateTime":"2019-03-22 13:41:57","sort":1,"children":[]},{"id":135,"value":"0","label":"未认领","createTime":"2019-03-20 18:10:53","updateTime":"2019-03-20 18:10:53","sort":1,"children":[]}],"hrms_training_type":[{"id":52,"value":"9","label":"其他","createTime":"2019-03-14 21:55:14","updateTime":"2019-03-14 21:55:14","sort":1,"children":[]},{"id":51,"value":"8","label":"制度类","createTime":"2019-03-14 21:55:00","updateTime":"2019-03-14 21:55:00","sort":1,"children":[]},{"id":50,"value":"7","label":"项目类","createTime":"2019-03-14 21:54:45","updateTime":"2019-03-14 21:54:45","sort":1,"children":[]},{"id":49,"value":"6","label":"市场类","createTime":"2019-03-14 21:54:33","updateTime":"2019-03-14 21:54:33","sort":1,"children":[]},{"id":48,"value":"5","label":"平台类","createTime":"2019-03-14 21:54:19","updateTime":"2019-03-14 21:54:19","sort":1,"children":[]},{"id":47,"value":"4","label":"品牌类","createTime":"2019-03-14 21:54:06","updateTime":"2019-03-14 21:54:06","sort":1,"children":[]},{"id":46,"value":"3","label":"文化类","createTime":"2019-03-14 21:53:57","updateTime":"2019-03-14 21:53:57","sort":1,"children":[]},{"id":45,"value":"2","label":"技能类","createTime":"2019-03-14 21:53:47","updateTime":"2019-03-14 21:53:47","sort":1,"children":[]},{"id":44,"value":"1","label":"业务类","createTime":"2019-03-14 21:53:42","updateTime":"2019-03-14 21:53:42","sort":1,"children":[]}],"crms_follow_up_status":[{"id":96,"value":"2","label":"未合作","createTime":"2019-03-19 13:43:43","updateTime":"2019-03-19 13:43:43","sort":1,"children":[]},{"id":95,"value":"1","label":"待合作","createTime":"2019-03-19 13:43:37","updateTime":"2019-03-19 13:43:37","sort":1,"children":[]},{"id":94,"value":"0","label":"已合作","createTime":"2019-03-19 13:43:50","updateTime":"2019-03-19 13:43:50","sort":1,"children":[]}],"crms_client_intention_level":[{"id":118,"value":"0","label":"低","createTime":"2019-03-20 10:36:14","updateTime":"2019-03-20 10:36:14","sort":1,"children":[]},{"id":117,"value":"1","label":"中","createTime":"2019-03-20 10:33:21","updateTime":"2019-03-20 10:33:21","sort":1,"children":[]},{"id":116,"value":"2","label":"高","createTime":"2019-03-20 10:36:12","updateTime":"2019-03-20 10:36:12","sort":1,"children":[]}],"crms_client_type":[{"id":93,"value":"1","label":"客户","createTime":"2019-03-19 13:42:41","updateTime":"2019-03-19 13:42:41","sort":1,"children":[]},{"id":92,"value":"0","label":"战略合作伙伴","createTime":"2019-03-19 13:42:37","updateTime":"2019-03-19 13:42:37","sort":1,"children":[]}],"mlms_visit_type":[{"id":108,"value":"4","label":"其他","createTime":"2019-03-20 10:22:12","updateTime":"2019-03-20 10:22:12","sort":1,"children":[]},{"id":107,"value":"3","label":"聊天软件拜访","createTime":"2019-03-20 10:22:06","updateTime":"2019-03-20 10:22:06","sort":1,"children":[]},{"id":106,"value":"2","label":"电话拜访","createTime":"2019-03-20 10:21:54","updateTime":"2019-03-20 10:21:54","sort":1,"children":[]},{"id":105,"value":"1","label":"当面拜访","createTime":"2019-03-20 10:21:40","updateTime":"2019-03-20 10:21:40","sort":1,"children":[]}]}`
}