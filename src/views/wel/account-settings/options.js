const initForm = () => {
  return {
    id: 1, // 用户ID 不可编辑
    name: null, // 姓名 不可编辑
    userName: null, // 用户名 不可编辑
    orgName: null, // 组织名 不可编辑
    staffId: null, // 工号
    avatar: '', // 头像
    roleName: [], // 角色
    // orgName: '组织', // 资产所属公司 不可编辑
    position: [], // 岗位
    positionName: null, // 岗位
    externalTitle: null, // 对外头衔
    people: [], // 标签名字
    duties: null, // 岗位职责
    job: null, // 职务
    jobId: null, // 职务
    title: null, // 职称
    titleId: null, // 职称
    entryTime: null, // 入职时间
    positiveTime: null, // 转正时间
    transferTime: null, // 调动时间
    status: null, // 员工状态
    deptList: [], // 所属部门
    orgList: [], // 所属组织
    deptIds: [], // 所属部门
    birthday: null, // 出生年月
    sex: null, // 性别
    sexName: null, // 性别
    nationality: null, // 民族
    politics: null, // 政治面貌字典
    marriage: null, // 婚姻状况
    bear: null, // 生育状况
    language: null, // 外语水平
    education: '', // 最高学历
    university: null, // 毕业学校
    profession: null, // 专业
    graduationTime: null, // 毕业时间
    referrer: null, // 推荐人
    abilityTag: [], // 卓越标签
    projectTag: [], // 专业标签
    learningTag: [], // 进步标签
    workExperience: [], // 工作经历
    trainingSituation: [], // 培训情况
    eduSituation: [], // 学习情况
    userCert: [], // 资质证书
    accountTypes: null, // 户口类别
    accountLocation: null, // 户口所在地
    residenceCities: [],
    residenceAddress: null, // 户籍地址
    currentCities: [],
    currentAddress: null, // 现住地址
    IDCard: null, // 身份证
    phone: null, // 联系手机
    wechat: null, // 微信
    qq: null, // QQ
    email: null, // 邮箱
    emergencyName: null, // 应急联系人
    emergencyPhone: null, // 应急联系方式
    signingTime: null, // 劳动合同签订时间
    benefitsStartTime: null, // 社保福利起缴时间
    benefitsStopTime: null, // 社保福利停缴时间
    separationTime: null, // 离职时间
    careerPlanning: null,//职业规划
    laborContract: [],//劳动合同
    socialContract: [],//社保福利
    transferContract: [],//调动情况
    quitContract: [],//离职信息
  }
}

const initPasswordForm = () => {
  return {
    password: '',
    newpassword1: '',
    newpassword2: '',
  }
}

export { initForm, initPasswordForm }