exports.getEmployeeProfilePage = async function (ctx) {
  const data = {
    code: 0,
    msg: 'success',
    data: {
      records: [
        {
          userId: 1,
          name: '李寅',
          sex: '女',
          部门: '国脉先锋队',
          employedDate: '2015-10-10',
          employeeStatus: 1,
          岗位: '总经理',
          身份证号码: '33090219960103761X'
        },
        {
          userId: 2,
          name: '李寅',
          sex: '女',
          部门: '国脉先锋队',
          employedDate: '2015-10-10',
          employeeStatus: 1,
          岗位: '总经理',
          身份证号码: '33090219960103761X'
        },
        {
          userId: 3,
          name: '李寅',
          sex: '女',
          部门: '国脉先锋队',
          employedDate: '2015-10-10',
          employeeStatus: 1,
          岗位: '总经理',
          身份证号码: '33090219960103761X'
        },
        {
          userId: 4,
          name: '李寅',
          sex: '女',
          部门: '国脉先锋队',
          employedDate: '2015-10-10',
          employeeStatus: 1,
          岗位: '总经理',
          身份证号码: '33090219960103761X'
        },
        {
          userId: 5,
          name: '李寅',
          sex: '女',
          部门: '国脉先锋队',
          employedDate: '2015-10-10',
          employeeStatus: 1,
          岗位: '总经理',
          身份证号码: '33090219960103761X'
        },
        {
          userId: 6,
          name: '李寅',
          sex: '女',
          部门: '国脉先锋队',
          employedDate: '2015-10-10',
          employeeStatus: 1,
          岗位: '总经理',
          身份证号码: '33090219960103761X'
        },
        {
          userId: 7,
          name: '李寅',
          sex: '女',
          部门: '国脉先锋队',
          employedDate: '2015-10-10',
          employeeStatus: 1,
          岗位: '总经理',
          身份证号码: '33090219960103761X'
        }
      ],
      total: 7,
      size: 10,
      current: 1,
      searchCount: true,
      pages: 1
    }
  }
  ctx.body = data
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