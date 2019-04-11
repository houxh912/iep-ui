export const  columnsMap = [
  {
    prop:'projectName',
    label:'项目名称',
  },
  {
    prop: 'projectManager',
    label: '项目经理',
  },
  {
    prop: 'approvalStatus',
    label: '审批状态',
  },
  {
    prop: 'applicant',
    label: '申请人',
  },
  {
    prop: 'applyTime',
    label: '申请时间',
  },
  {
    prop: 'approver',
    label: '审批人',
  },
  {
    prop: 'approvalTime',
    label: '审批时间',
  },
]

export const rules = {
  projectManagerList: [
    { required: true, message: '必填', trigger: 'change' },
  ],
  gender: [
    { required: true, message: '必填', trigger: 'change' },
  ],
  phone: [
    { required: true, message: '必填', trigger: 'blur' },
  ],
  appointStartTime: [
    { required: true, message: '必填', trigger: 'change' },
  ],
  appointEndTime: [
    { required: true, message: '必填', trigger: 'change' },
  ],
  authCompanyList: [
    { required: true, message: '必填', trigger: 'change' },
  ],
  authDate: [
    { required: true, message: '必填', trigger: 'change' },
  ],
}

export function initFormData () {
  return {
    projectManager: '', // 项目经理
    projectManagerList: {
      id: '',
      name: '',
    },
    gender: 1, // 性别
    age: '', // 年龄
    idCardNumber: '', // 身份证号码
    phone: '', // 联系电话
    zipCode: '', // 邮编
    address: '', // 通讯地址
    appointStartTime: '', // 任命开始日期
    appointEndTime: '', // 任命结束日期
    authCompany: '', // 授权单位
    authCompanyList: {},
    authDate: '', // 授权日期
    projectInfoId: 0, // 项目id
  }
}
