// import { mergeByFirst } from '@/util/util'

const dictsMap = {
  status: {
    0: '待提交',
    1: '待确认',
    2: '已确认',
    3: '驳回',
  },
  invoicingType: {
    1: '增值税专用发票',
    2: '增值税普通发票',
    3: '其他',
  },
}

const columnsMap = [
  {
    prop: 'buyerName',
    label: '购买方',
  },
  {
    prop: 'companyName',
    label: '销售方',
  },
  {
    prop: 'amount',
    label: '开票金额',
    width: '80',
  },
  {
    prop: 'createTime',
    label: '申请日期',
  },
  {
    prop: 'status',
    label: '状态',
    type: 'dict',
    width: '80',
  },
  {
    prop: 'auditorName',
    label: '核准人',
    width: '80',
  },
  {
    prop: 'auditingTime',
    label: '核准日期',
  },
]

const initForm = () => {
  return {
    id: 0, //开票id

    buyerName: '', //购买方名称
    buyerNumber: '', //纳税人识别号
    buyerAddress: '', //地址
    buyerPhone: '', //电话号码
    buyerAccount: '',//开户行及账户
    buyerMail: '',//发票邮寄地址
    firstSubject: '',//一级科目 字典fams_tax_subject
    secondSubject: '',//二级科目
    rate: '',//税率
    unit: '',//单位
    amount: '', //开票金额
    invoicingType: 1,//开票种类
    projectId: '',//关联项目
    projectName: '',//关联项目
    orgId: '', //销售方组织ID
    companyId: '', //销售方公司ID
    remarks: '',//备注

    status: '',//状态
    content: '',//理由
  }
}

const rules = {
  buyerName: [
    { required: true, message: '请输入名称', trigger: 'blur' },
  ],
  buyerNumber: [
    { required: true, message: '请输入纳税人号码', trigger: 'blur' },
  ],
  buyerAddress: [
    { required: true, message: '请输入地址', trigger: 'blur' },
  ],
  buyerPhone: [
    { required: true, message: '请输入电话号码', trigger: 'blur' },
  ],
  buyerAccount: [
    { required: true, message: '请输入开户行及账户', trigger: 'blur' },
  ],
  buyerMail: [
    { required: true, message: '请输入发票邮寄地址', trigger: 'blur' },
  ],
  firstSubject: [
    { required: true, message: '请输入一级科目', trigger: 'blur' },
  ],
  secondSubject: [
    { required: true, message: '请输入二级科目', trigger: 'blur' },
  ],
  rate: [
    { required: true, message: '请输入税率', trigger: 'blur' },
  ],
  unit: [
    { required: true, message: '请输入单位', trigger: 'blur' },
  ],
  amount: [
    { required: true, message: '请输入金额', trigger: 'blur', type: 'number', min: 1 },
  ],
  invoicingType: [
    { required: true, message: '请选择开票种类', trigger: 'blur' },
  ],
  projectId: [
    { required: true, message: '请输入关联项目', trigger: 'blur' },
  ],
  companyId: [
    { required: true, message: '请输入销售方公司', trigger: 'blur' },
  ],
}

const initRule = (type) => {

  return {
    buyerName: [
      { required: true, message: '请输入名称', trigger: 'blur' },
    ],
    buyerNumber: [
      { required: true, message: '请输入纳税人号码', trigger: 'blur' },
    ],
    buyerAddress: [
      { required: type === 2 ? false : true, message: '请输入地址', trigger: 'blur' },
    ],
    buyerPhone: [
      { required: type === 2 ? false : true, message: '请输入电话号码', trigger: 'blur' },
    ],
    buyerAccount: [
      { required: type === 2 ? false : true, message: '请输入开户行及账户', trigger: 'blur' },
    ],
    buyerMail: [
      { required: type === 2 ? false : true, message: '请输入发票邮寄地址', trigger: 'blur' },
    ],
    firstSubject: [
      { required: true, message: '请输入一级科目', trigger: 'change' },
    ],
    secondSubject: [
      { required: true, message: '请输入二级科目', trigger: 'blur' },
    ],
    rate: [
      { required: true, message: '请输入税率', trigger: 'change' },
    ],
    unit: [
      { required: true, message: '请输入单位', trigger: 'blur' },
    ],
    amount: [
      { required: true, message: '请输入金额', trigger: 'blur', type: 'number', min: 1 },
    ],
    invoicingType: [
      { required: true, message: '请选择开票种类', trigger: 'blur' },
    ],
    projectId: [
      { required: true, message: '请输入关联项目', trigger: 'change' },
    ],
    companyId: [
      { required: true, message: '请输入销售方公司', trigger: 'change' },
    ],
  }
}

export {
  columnsMap,
  dictsMap,
  initForm,
  rules,
  initRule,
}
