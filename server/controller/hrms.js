exports.getEmployeeProfilePage = async function (ctx) {
  ctx.body = `{"code":0,"msg":"success","data":{"records":[{"id":"1","name":"张超","userName":"zhangchao","roleName":"管理员","staffId":"GM23123","position":"程序人员","externalTitle":"内部人员","job":"不知道","title":"不知道","entryTime":"","positiveTime":"","transferTime":"","status":1,"dept":"开发","birthday":"","sex":"男","nationality":"汉族","politicalStatus":"群众","maritalStatus":"未婚","fertilityStatus":"无","language":"汉语","education":"大学","graduatedSchool":"北大","profession":"电子","graduationTime":"","referrer":"张绍","certifications":"无","accountTypes":"舟山定海","accountLocation":"舟山定海","residenceAddress":"舟山定海","currentAddress":"舟山定海","IDCard":"30303030303030303","phone":"1303030303","weChat":"lanseria","qq":"564265135","email":"123123@qq.com","emergencyName":"公元","emergencyPhone":"12321312","signingTime":"","expirationTime":"","benefitsStartTime":"","benefitsStopTime":"","separationTime":""},{"id":"1","name":"张超","userName":"zhangchao","roleName":"管理员","staffId":"GM23123","position":"程序人员","externalTitle":"内部人员","job":"不知道","title":"不知道","entryTime":"","positiveTime":"","transferTime":"","status":1,"dept":"开发","birthday":"","sex":"男","nationality":"汉族","politicalStatus":"群众","maritalStatus":"未婚","fertilityStatus":"无","language":"汉语","education":"大学","graduatedSchool":"北大","profession":"电子","graduationTime":"","referrer":"张绍","certifications":"无","accountTypes":"舟山定海","accountLocation":"舟山定海","residenceAddress":"舟山定海","currentAddress":"舟山定海","IDCard":"30303030303030303","phone":"1303030303","weChat":"lanseria","qq":"564265135","email":"123123@qq.com","emergencyName":"公元","emergencyPhone":"12321312","signingTime":"","expirationTime":"","benefitsStartTime":"","benefitsStopTime":"","separationTime":""}],"total":2,"size":10,"current":1,"searchCount":true,"pages":1}}`
}

exports.getGrowthFileById = async function (ctx) {
  ctx.response.type = 'json'
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
  ctx.body = `{"code":0,"msg":"success","data":{"records":[{"id":9,"position":"产品经理","dept":"山东农信","recruitsCount":2,"jobType":"全职","applicationTime":"2019-03-07 09:58:33","status":3},{"id":5,"position":"产品总监","dept":"院校农信2","recruitsCount":17,"jobType":"全职/兼职","applicationTime":"2019-03-07 09:58:33","status":3},{"id":1,"position":"数据元专员","dept":"院校农信1","recruitsCount":14,"jobType":"全职","applicationTime":"2019-03-07 10:02:12","status":2},{"id":2,"position":"产品经理","dept":"院校农信2","recruitsCount":15,"jobType":"兼职","applicationTime":"2019-03-06 14:14:22","status":2}],"total":4,"size":10,"current":1,"searchCount":true,"pages":1}}`
}
exports.getPublishRecruitmentById = async function (ctx) {
  ctx.body = `{"code":0,"msg":"success","data":{"id":9,"positionId":2,"positionName":"产品经理","deptId":1,"deptName":"山东农信","language":"dsfdsf","recruitsCount":2,"targetCount":2,"academicId":1,"jobTypeId":1,"years":2,"profession":"sddsfsdf","place":"sdsfsdf","sex":2,"treatment":"sdfsdf","term":"2019-03-26T16:00:00.000Z","welfare":"sdfdsfds","claim":"sdfsdfdsfdsfsdfsdf","duties":"sdffsddfs"}}`
}
exports.commonPublishRecruitment = async function (ctx) {
  ctx.body = `{"code":0,"msg":"success","data":true}`
}
exports.getTalentPoolPage = async function (ctx) {
  ctx.body = `{"code":0,"msg":"success","data":{"records":[{"id":"1","name":"张超","sex":"男","education":"大学","age":"14","applyPosition":"14","receptionTime":"2019-01-01","source":"国脉官网","remarks":"驳回原因","birthday":"1985-06-04","blacklistArea":"1985-06-04","blacklistReason":"1985-06-04"},{"id":"1","name":"张超","sex":"男","education":"大学","age":"14","applyPosition":"14","receptionTime":"2019-01-01","source":"国脉官网","remarks":"驳回原因","birthday":"1985-06-04","blacklistArea":"1985-06-04","blacklistReason":"1985-06-04"}],"total":2,"size":10,"current":1,"searchCount":true,"pages":1}}`
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
          成立时间: '2019-03-01'
        },
        {
          id: 2,
          部门名称: '技术部',
          负责人: '111',
          部门人数: '1',
          成立时间: '2019-03-01'
        },
        {
          id: 3,
          部门名称: '技术部',
          负责人: '111',
          部门人数: '1',
          成立时间: '2019-03-01'
        },
        {
          id: 4,
          部门名称: '技术部',
          负责人: '111',
          部门人数: '1',
          成立时间: '2019-03-01'
        },
        {
          id: 5,
          部门名称: '技术部',
          负责人: '111',
          部门人数: '1',
          成立时间: '2019-03-01'
        },
        {
          id: 6,
          部门名称: '技术部',
          负责人: '111',
          部门人数: '1',
          成立时间: '2019-03-01'
        },
        {
          id: 7,
          部门名称: '技术部',
          负责人: '111',
          部门人数: '1',
          成立时间: '2019-03-01'
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
          优先级: '1'
        },
        {
          id: 2,
          职务名称: '专员',
          职务说明: '职务说明',
          优先级: '2'
        },
        {
          id: 3,
          职务名称: '专员',
          职务说明: '职务说明',
          优先级: '3'
        },
        {
          id: 4,
          职务名称: '专员',
          职务说明: '职务说明',
          优先级: '4'
        },
        {
          id: 5,
          职务名称: '初级主管',
          职务说明: '职务说明',
          优先级: '5'
        },
        {
          id: 6,
          职务名称: '初级主管',
          职务说明: '职务说明',
          优先级: '5'
        },
        {
          id: 7,
          职务名称: '初级主管',
          职务说明: '职务说明',
          优先级: '5'
        },
        {
          id: 8,
          职务名称: '初级主管',
          职务说明: '职务说明',
          优先级: '5'
        },
        {
          id: 9,
          职务名称: '初级主管',
          职务说明: '职务说明',
          优先级: '5'
        },
        {
          id: 10,
          职务名称: '初级主管',
          职务说明: '职务说明',
          优先级: '5'
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
          优先级: '1'
        },
        {
          id: 2,
          职称名称: '专员',
          职称说明: '职称说明',
          优先级: '2'
        },
        {
          id: 3,
          职称名称: '专员',
          职称说明: '职称说明',
          优先级: '3'
        },
        {
          id: 4,
          职称名称: '专员',
          职称说明: '职称说明',
          优先级: '4'
        },
        {
          id: 5,
          职称名称: '初级主管',
          职称说明: '职称说明',
          优先级: '5'
        },
        {
          id: 6,
          职称名称: '初级主管',
          职称说明: '职称说明',
          优先级: '5'
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
          type: '产品技术类',
          name: '产品经理',
          count: '1'
        },
        {
          id: 2,
          type: '产品技术类',
          name: '产品经理',
          count: '10'
        },
        {
          id: 3,
          type: '产品技术类',
          name: '产品经理',
          count: '100'
        },
        {
          id: 4,
          type: '产品技术类',
          name: '产品经理',
          count: '1000'
        },
        {
          id: 5,
          type: '产品技术类',
          name: '产品经理',
          count: '1'
        },
        {
          id: 6,
          type: '产品技术类',
          name: '产品经理',
          count: '1'
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
exports.getPostTypePage = async function (ctx) {
  const data = {
    code: 0,
    msg: 'success',
    data: {
      records: [
        {
          id: 1,
          name: '产品技术类',
          description: '产品技术类说明'
        },
        {
          id: 2,
          name: '产品技术类',
          description: '产品技术类说明'
        },
        {
          id: 3,
          name: '产品技术类',
          description: '产品技术类说明'
        },
        {
          id: 4,
          name: '产品技术类',
          description: '产品技术类说明'
        },
        {
          id: 5,
          name: '产品技术类',
          description: '产品技术类说明'
        },
        {
          id: 6,
          name: '产品技术类',
          description: '产品技术类说明'
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
