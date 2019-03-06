exports.getEmployeeProfilePage = async function (ctx) {
  ctx.body = `{"code":0,"msg":"success","data":{"records":[{"userId":1,"orgId":8,"gender":1,"idCard":"330903198511263222","employedDate":"2019-02-27 09:08:43","positionId":1,"employeeStatus":1,"iepUserCert":[],"iepHrPosition":{"positionId":1,"orgId":0,"positionClsId":1,"positionName":"产品","priority":0,"createTime":"2019-02-27 10:35:52","updateTime":"2019-02-27 10:35:52","delFlag":0,"positionDuty":"string","positionRqmt":"string"},"sex":"男","position":"产品","name":"超级管理员","workExperience":[],"eduSituation":[],"trainingSituation":[],"laborContract":[],"employeeWelfare":[],"employeeTansfer":[],"dimissionInfo":[]},{"userId":4,"orgId":0,"gender":2,"idCard":"33090319861122","employedDate":"2019-02-27 09:08:45","positionId":2,"employeeStatus":2,"iepUserCert":[{"personalCertId":3,"certNo":"","certName":"","atch":"","issueOrg":""},{"personalCertId":6,"certNo":"","certName":"","atch":"","issueOrg":""},{"personalCertId":7,"certNo":"","certName":"","atch":"","issueOrg":""}],"iepHrPosition":{"positionId":2,"orgId":0,"positionClsId":2,"positionName":"研发","priority":0,"createTime":"2019-02-27 10:36:04","updateTime":"2019-02-27 10:36:04","delFlag":0,"positionDuty":"string","positionRqmt":"string"},"sex":"女","position":"研发","name":"string","workExperience":[{"id":1,"company":"awda","position":"wadawdw","startEndTime":"2019-02-23 16:26:57","workSpecification":"wadadw","leaveReasons":"wdwdwd"},{"id":2,"company":"microsoft","position":"string","startEndTime":"string","workSpecification":"string","leaveReasons":"string"},{"id":3,"company":"","position":"","startEndTime":"","workSpecification":"","leaveReasons":""}],"eduSituation":[{"id":5,"educational":"","startEndTime":"","learning":""},{"id":4,"educational":"","startEndTime":"","learning":""},{"id":2,"educational":"string","startEndTime":"string","learning":"string"}],"trainingSituation":[{"id":7,"startEndTime":"","Name":"","Unit":"","Mode":3},{"id":1,"startEndTime":"2002-09-09","Name":"ser","Unit":"ssa","Mode":0},{"id":8,"startEndTime":"","Name":"","Unit":"","Mode":3}],"laborContract":[{"laborContractId":1,"orgId":0,"userId":4,"signTime":"2019-02-27 22:05:59","expireTime":"2019-02-27 22:05:59","contractAtch":"struihjg","createTime":"2019-02-27 22:05:59","updateTime":"2019-02-28 21:52:18","operatorId":0,"delFlag":0,"contractType":0,"belongCompany":1},{"laborContractId":2,"orgId":0,"userId":4,"signTime":"2019-02-27 22:05:59","expireTime":"2019-02-27 22:05:59","contractAtch":"string","createTime":"2019-02-27 22:05:59","updateTime":"2019-02-28 21:52:23","operatorId":0,"delFlag":0,"contractType":0,"belongCompany":2}],"employeeWelfare":[{"id":1,"orgId":0,"userId":4,"welfareType":0,"signTime":"2019-02-28 11:18:01","expireTime":"2019-02-28 11:18:01","remark":"staasang","createTime":"2019-02-28 11:18:01","updateTime":"2019-02-28 11:18:01","delFlag":0},{"id":2,"orgId":0,"userId":4,"welfareType":0,"signTime":"2019-02-27 22:05:59","expireTime":"2019-02-27 22:05:59","remark":"ssssssssssssssssssssng","createTime":"2019-02-27 22:05:59","updateTime":"2019-02-27 22:05:59","delFlag":0,"belongCompany":0}],"employeeTansfer":[{"id":1,"userId":4,"orgId":1,"transferType":2,"changeContent":"","createTime":"2019-02-28 15:42:19","updateTime":"2019-03-04 09:58:31","operatorId":0,"delFlag":0,"transferTime":"2019-02-28 15:42:28"},{"id":2,"userId":4,"orgId":1,"transferType":0,"changeContent":"string","createTime":"2019-02-28 15:42:19","updateTime":"2019-03-04 09:58:29","operatorId":0,"delFlag":0,"transferTime":"2019-02-28 15:42:19"},{"id":3,"userId":4,"orgId":1,"transferType":0,"changeContent":"wwwwwwww","createTime":"2019-02-28 15:42:19","updateTime":"2019-02-28 15:42:19","operatorId":0,"delFlag":0,"transferTime":"2019-02-28 15:42:19"}],"dimissionInfo":[{"id":1,"userId":4,"orgId":0,"leaveTime":"2019-02-27 22:09:56","leaveReason":"string","createTime":"2019-02-27 22:09:56","updateTime":"2019-02-27 22:09:56","operatorId":0,"delFlag":0},{"id":2,"userId":4,"orgId":0,"leaveTime":"2019-02-24 21:36:59","leaveReason":"stwwwwwwring","createTime":"2019-02-24 21:36:59","updateTime":"2019-02-24 21:36:59","operatorId":0,"delFlag":0}]}],"total":2,"size":10,"current":1,"searchCount":true,"pages":1}}`
}

exports.getGrowthFileById = async function (ctx) {
  ctx.response.type = 'json';
  ctx.body = `{"code":0,"msg":"success","data":{"userId":4,"idCard":"33090319861122","positionId":2,"employeeStatus":2,"staffNo":"GH8768","position":"研发","job":"中级产品顾问","title":"经理咨询师","name":"string","timeLineList":[{"id":2,"type":1,"msg":"职称由主力咨询师变更为初级咨询师","time":"2019-03-04 22:11:28","date":"2019-03-05"},{"id":3,"type":2,"msg":"部门由平台运维部变更为产品中心","time":"2019-03-04 22:12:14","date":"2019-03-05"},{"id":4,"type":3,"msg":"获得专业员工称号","time":"2019-03-04 22:13:47","date":"2019-03-05"},{"id":5,"type":4,"msg":"被同事评价为热情敬业","time":"2019-03-04 22:14:56","date":"2019-03-05"},{"id":6,"type":5,"msg":"string","time":"2019-03-05 11:30:44","date":"2019-03-05"},{"id":7,"type":3,"msg":"string","time":"2019-03-05 14:09:07","date":"2019-03-05"},{"id":8,"type":4,"msg":"string","time":"2019-03-05 14:22:05","date":"2019-03-05"}]}}`
}

exports.getAdministrativeApprovalPage = async function (ctx) {
  const data = {
    code: 0,
    msg: 'success',
    data: {
      records: [
        {
          申请类型: '出差申请',
          申请人: '李百川',
          部门: '国脉先锋队',
          申请时间: '2015-10-10',
          审批人: '王璐燕',
          状态: '通过'
        },
        {
          申请类型: '出差申请',
          申请人: '李百川',
          部门: '国脉先锋队',
          申请时间: '2015-10-10',
          审批人: '王璐燕',
          状态: '通过'
        },
        {
          申请类型: '出差申请',
          申请人: '李百川',
          部门: '国脉先锋队',
          申请时间: '2015-10-10',
          审批人: '王璐燕',
          状态: '通过'
        },
        {
          申请类型: '出差申请',
          申请人: '李百川',
          部门: '国脉先锋队',
          申请时间: '2015-10-10',
          审批人: '王璐燕',
          状态: '通过'
        },
        {
          申请类型: '出差申请',
          申请人: '李百川',
          部门: '国脉先锋队',
          申请时间: '2015-10-10',
          审批人: '王璐燕',
          状态: '通过'
        },
        {
          申请类型: '出差申请',
          申请人: '李百川',
          部门: '国脉先锋队',
          申请时间: '2015-10-10',
          审批人: '王璐燕',
          状态: '通过'
        },
        {
          申请类型: '出差申请',
          申请人: '李百川',
          部门: '国脉先锋队',
          申请时间: '2015-10-10',
          审批人: '王璐燕',
          状态: '通过'
        },
        {
          申请类型: '出差申请',
          申请人: '李百川',
          部门: '国脉先锋队',
          申请时间: '2015-10-10',
          审批人: '王璐燕',
          状态: '通过'
        },
        {
          申请类型: '出差申请',
          申请人: '李百川',
          部门: '国脉先锋队',
          申请时间: '2015-10-10',
          审批人: '王璐燕',
          状态: '通过'
        },
        {
          申请类型: '出差申请',
          申请人: '李百川',
          部门: '国脉先锋队',
          申请时间: '2015-10-10',
          审批人: '王璐燕',
          状态: '通过'
        },
        {
          申请类型: '出差申请',
          申请人: '李百川',
          部门: '国脉先锋队',
          申请时间: '2015-10-10',
          审批人: '王璐燕',
          状态: '通过'
        },
        {
          申请类型: '出差申请',
          申请人: '李百川',
          部门: '国脉先锋队',
          申请时间: '2015-10-10',
          审批人: '王璐燕',
          状态: '通过'
        }
      ],
      total: 12,
      size: 10,
      current: 1,
      searchCount: true,
      pages: 1
    }
  }
  ctx.body = data
}
exports.getPublishRecruitmentPage = async function (ctx) {
  const data = {
    code: 0,
    msg: 'success',
    data: {
      records: [
        {
          id: 1,
          岗位: 'java软件工程师',
          招聘部门: '技术中心',
          招聘人数: '3人',
          工作类型: '全职',
          招聘申请时间: '2019-01-20',
          招聘状态: '待发布'
        },
        {
          id: 2,
          岗位: 'java软件工程师',
          招聘部门: '技术中心',
          招聘人数: '3人',
          工作类型: '全职',
          招聘申请时间: '2019-01-20',
          招聘状态: '待发布'
        },
        {
          id: 3,
          岗位: 'java软件工程师',
          招聘部门: '技术中心',
          招聘人数: '3人',
          工作类型: '全职',
          招聘申请时间: '2019-01-20',
          招聘状态: '待发布'
        },
        {
          id: 4,
          岗位: 'java软件工程师',
          招聘部门: '技术中心',
          招聘人数: '3人',
          工作类型: '全职',
          招聘申请时间: '2019-01-20',
          招聘状态: '待发布'
        },
        {
          id: 5,
          岗位: 'java软件工程师',
          招聘部门: '技术中心',
          招聘人数: '3人',
          工作类型: '全职',
          招聘申请时间: '2019-01-20',
          招聘状态: '待发布'
        },
      ],
      total: 12,
      size: 10,
      current: 1,
      searchCount: true,
      pages: 1
    }
  }
  ctx.body = data
}
exports.getTalentPoolPage = async function (ctx) {
  const data = {
    code: 0,
    msg: 'success',
    data: {
      records: [
        {
          id: 1,
          姓名: '李银',
          性别: '女',
          学历: '年龄',
          应聘岗位: '网页设计',
          简历接受时间: '2019-01-20',
          来源: '官网'
        },
        {
          id: 1,
          姓名: '李银',
          性别: '女',
          学历: '年龄',
          应聘岗位: '网页设计',
          简历接受时间: '2019-01-20',
          来源: '官网'
        },
        {
          id: 1,
          姓名: '李银',
          性别: '女',
          学历: '年龄',
          应聘岗位: '网页设计',
          简历接受时间: '2019-01-20',
          来源: '官网'
        },
        {
          id: 1,
          姓名: '李银',
          性别: '女',
          学历: '年龄',
          应聘岗位: '网页设计',
          简历接受时间: '2019-01-20',
          来源: '官网'
        },
        {
          id: 1,
          姓名: '李银',
          性别: '女',
          学历: '年龄',
          应聘岗位: '网页设计',
          简历接受时间: '2019-01-20',
          来源: '官网'
        }
      ],
      total: 12,
      size: 10,
      current: 1,
      searchCount: true,
      pages: 1
    }
  }
  ctx.body = data
}
exports.getTrainingRecordPage = async function (ctx) {
  const data = {
    code: 0,
    msg: 'success',
    data: {
      records: [
        {
          id: 1,
          培训老师: '李颖',
          培训主题: '内网培训',
          培训时间: '2019-3-1 19:30至2019-3-1 20:00',
          培训类型: '业务类',
          培训方式: '微信培训'
        },
        {
          id: 2,
          培训老师: '李颖',
          培训主题: '内网培训',
          培训时间: '2019-3-1 19:30至2019-3-1 20:00',
          培训类型: '业务类',
          培训方式: '微信培训'
        },
        {
          id: 3,
          培训老师: '李颖',
          培训主题: '内网培训',
          培训时间: '2019-3-1 19:30至2019-3-1 20:00',
          培训类型: '业务类',
          培训方式: '微信培训'
        },
        {
          id: 4,
          培训老师: '李颖',
          培训主题: '内网培训',
          培训时间: '2019-3-1 19:30至2019-3-1 20:00',
          培训类型: '业务类',
          培训方式: '微信培训'
        },
        {
          id: 5,
          培训老师: '李颖',
          培训主题: '内网培训',
          培训时间: '2019-3-1 19:30至2019-3-1 20:00',
          培训类型: '业务类',
          培训方式: '微信培训'
        }
      ],
      total: 5,
      size: 10,
      current: 1,
      searchCount: true,
      pages: 1
    }
  }
  ctx.body = data
}
exports.getDepartmentManagePage = async function (ctx) {
  const data = {
    code: 0,
    msg: 'success',
    data: {
      records: [
        {
          id: 1,
          部门名称: '技术部',
          负责人: '111',
          部门人数: '1',
          成立时间: '2019-03-01',
        },
        {
          id: 2,
          部门名称: '技术部',
          负责人: '111',
          部门人数: '1',
          成立时间: '2019-03-01',
        },
        {
          id: 3,
          部门名称: '技术部',
          负责人: '111',
          部门人数: '1',
          成立时间: '2019-03-01',
        },
        {
          id: 4,
          部门名称: '技术部',
          负责人: '111',
          部门人数: '1',
          成立时间: '2019-03-01',
        },
        {
          id: 5,
          部门名称: '技术部',
          负责人: '111',
          部门人数: '1',
          成立时间: '2019-03-01',
        },
        {
          id: 6,
          部门名称: '技术部',
          负责人: '111',
          部门人数: '1',
          成立时间: '2019-03-01',
        },
        {
          id: 7,
          部门名称: '技术部',
          负责人: '111',
          部门人数: '1',
          成立时间: '2019-03-01',
        }
      ],
      total: 6,
      size: 10,
      current: 1,
      searchCount: true,
      pages: 1
    }
  }
  ctx.body = data
}
exports.getJobSystemPage = async function (ctx) {
  const data = {
    code: 0,
    msg: 'success',
    data: {
      records: [
        {
          id: 1,
          职务名称: '专员',
          职务说明: '职务说明',
          优先级: '1',
        },
        {
          id: 2,
          职务名称: '专员',
          职务说明: '职务说明',
          优先级: '2',
        },
        {
          id: 3,
          职务名称: '专员',
          职务说明: '职务说明',
          优先级: '3',
        },
        {
          id: 4,
          职务名称: '专员',
          职务说明: '职务说明',
          优先级: '4',
        },
        {
          id: 5,
          职务名称: '初级主管',
          职务说明: '职务说明',
          优先级: '5',
        },
        {
          id: 6,
          职务名称: '初级主管',
          职务说明: '职务说明',
          优先级: '5',
        },
        {
          id: 7,
          职务名称: '初级主管',
          职务说明: '职务说明',
          优先级: '5',
        },
        {
          id: 8,
          职务名称: '初级主管',
          职务说明: '职务说明',
          优先级: '5',
        },
        {
          id: 9,
          职务名称: '初级主管',
          职务说明: '职务说明',
          优先级: '5',
        },
        {
          id: 10,
          职务名称: '初级主管',
          职务说明: '职务说明',
          优先级: '5',
        }
      ],
      total: 10,
      size: 10,
      current: 1,
      searchCount: true,
      pages: 1
    }
  }
  ctx.body = data
}
exports.getJobTitleSystemPage = async function (ctx) {
  const data = {
    code: 0,
    msg: 'success',
    data: {
      records: [
        {
          id: 1,
          职称名称: '专员',
          职称说明: '职称说明',
          优先级: '1',
        },
        {
          id: 2,
          职称名称: '专员',
          职称说明: '职称说明',
          优先级: '2',
        },
        {
          id: 3,
          职称名称: '专员',
          职称说明: '职称说明',
          优先级: '3',
        },
        {
          id: 4,
          职称名称: '专员',
          职称说明: '职称说明',
          优先级: '4',
        },
        {
          id: 5,
          职称名称: '初级主管',
          职称说明: '职称说明',
          优先级: '5',
        },
        {
          id: 6,
          职称名称: '初级主管',
          职称说明: '职称说明',
          优先级: '5',
        }
      ],
      total: 6,
      size: 10,
      current: 1,
      searchCount: true,
      pages: 1
    }
  }
  ctx.body = data
}
exports.getPostLibraryPage = async function (ctx) {
  const data = {
    code: 0,
    msg: 'success',
    data: {
      records: [
        {
          id: 1,
          岗位分类: '产品技术类',
          岗位名称: '产品经理',
          在职人数: '1',
        },
        {
          id: 2,
          岗位分类: '产品技术类',
          岗位名称: '产品经理',
          在职人数: '10',
        },
        {
          id: 3,
          岗位分类: '产品技术类',
          岗位名称: '产品经理',
          在职人数: '100',
        },
        {
          id: 4,
          岗位分类: '产品技术类',
          岗位名称: '产品经理',
          在职人数: '1000',
        },
        {
          id: 5,
          岗位分类: '产品技术类',
          岗位名称: '产品经理',
          在职人数: '1',
        },
        {
          id: 6,
          岗位分类: '产品技术类',
          岗位名称: '产品经理',
          在职人数: '1',
        }
      ],
      total: 6,
      size: 10,
      current: 1,
      searchCount: true,
      pages: 1
    }
  }
  ctx.body = data
}
exports.getPostLibrary1Page = async function (ctx) {
  const data = {
    code: 0,
    msg: 'success',
    data: {
      records: [
        {
          id: 1,
          岗位分类名称: '产品技术类',
          分类说明: '产品技术类说明',
        },
        {
          id: 2,
          岗位分类名称: '产品技术类',
          分类说明: '产品技术类说明',
        },
        {
          id: 3,
          岗位分类名称: '产品技术类',
          分类说明: '产品技术类说明',
        },
        {
          id: 4,
          岗位分类名称: '产品技术类',
          分类说明: '产品技术类说明',
        },
        {
          id: 5,
          岗位分类名称: '产品技术类',
          分类说明: '产品技术类说明',
        },
        {
          id: 6,
          岗位分类名称: '产品技术类',
          分类说明: '产品技术类说明',
        }
      ],
      total: 6,
      size: 10,
      current: 1,
      searchCount: true,
      pages: 1
    }
  }
  ctx.body = data
}