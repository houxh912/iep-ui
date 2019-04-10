export const  columnsMap = [
  {
    prop:'name',
    label:'项目名称',
    width:'350px',
  },
  {
    prop: 'pm',
    label: '项目经理',
  },
  {
    prop: 'status',
    label: '审批状态',
  },
  {
    prop: 'upman',
    label: '申请人',
  },
  {
    prop: 'uptime',
    label: '申请时间',
  },
  {
    prop: 'appman',
    label: '审批人',
  },
  {
    prop: 'apptime',
    label: '审批时间',
  },
]

export const pagedTable = [
  {
    id:1,
    name:'佛山市智慧城市顶层设计规划编制',
    pm:'张三',
    status:'未提交',
    upman:'殷亚增',
    uptime:'2019-02-21',
    appman:'张三',
    apptime:'2019-02-21',
    btns:[
      {
        label:'提交',
        fn:'refer',
      },
      {
        label:'详情',
        fn:'detail',
      },
      {
        label:'编辑',
        fn:'edit',
      },
      {
        label:'删除',
        fn:'deleteOne',
      },
    ],
  },
  {
    name:'佛山市智慧城市顶层设计规划编制',
    pm:'里斯',
    status:'待审批',
    upman:'殷亚增',
    uptime:'2019-02-21',
    appman:'张三',
    apptime:'2019-02-21',
    btns:[
      {
        label:'详情',
        fn:'detail',
      },
    ],
  },
]

export const rules = {
  projectManagerObj: [
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
  authCompany: [
    { required: true, message: '必填', trigger: 'change' },
  ],
  authDate: [
    { required: true, message: '必填', trigger: 'change' },
  ],
}

export function initFormData () {
  return {
    projectManager: '',
    projectManagerObj: {
      id: '',
      name: '',
    },
    gender: 1,
    age: '',
    idCardNumber: '',
    phone: '',
    zipCode: '',
    address: '',
    appointStartTime: '',
    appointEndTime: '',
    authCompany: {},
    authDate: '',
  }
}