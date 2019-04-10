import { checkName } from '@/api/crms/customer'
const initForm = () => {
  return {
    clientId: '',
    clientName: '', //客户名称
    clientTypeKey: [], //客户类型
    districtType: '', // 区域类型
    businessTypeKey: [], // 业务类型
    specificBusinessType: '', //具体业务类型
    clientRela: '', //客户关系
    followUpStatus: '', // 跟进状态
    marketManager: '', // 市场经理
    lastTime: '', // 距离上次拜访已有(全部客户没有但依然存着)
    iepClientRespDept: {
      id: '',
      name: '',
    }, //负责部门
    companyUrl: '', //单位网址
    companyFunction: '', //单位职能
    contractAddress: '', //单位地址
    otherDesc: '', //其他说明
    tags: [],
    collaborations: [],
  }
}
// 全部客户搜索
const allSearchForm = () => {
  return {
    clientName: '',
    districtType: '',
    clientRela: '',
    followUpStatus: '',
    businessTypeKey: [],
    marketManager: '',
  }
}
// 我的客户/协作客户搜索
const initSearchForm = () => {
  return {
    clientName: '',
    districtType: '',
    clientRela: '',
    followUpStatus: '',
    businessTypeKey: [],
    lastTime: '',
  }
}
var validateFun = (rule, value, callback) => {
  let val = value.replace(/(^\s*)|(\s*$)/g, '')
  if (!val) {
    return callback(new Error('客户名称不能为空'))
  }
  checkName({ clientName: val }).then(res => {
    if (!res.data) {
      callback(new Error('您输入的客户名称已存在，请重新输入！'))
    } else {
      callback()
    }
  })
}
const rules = {
  clientName: [
    { required: true, validator: validateFun, trigger: 'blur' },
    { min: 6, max: 50, message: '至少6个字', trigger: 'blur' },
  ],
  phoneNumber: [
    { required: true, message: '请输入手机号码', trigger: 'blur' },
    { min: 11, max: 11, message: '手机位数为11位', trigger: 'blur' },
  ],
  districtType: [
    { required: true, message: '请选择区域类型', trigger: 'blur' },
  ],
  marketManager: [
    { required: true, message: '请填写市场经理', trigger: 'blur' },
  ],
  iepClientRespDept: [{ required: true, message: '请选择负责部门', trigger: 'blur' }],
  companyUrl: [{ required: true, message: '请填写单位网址', trigger: 'blur' }],
  companyFunction: [
    { required: true, message: '请填写单位职能', trigger: 'blur' },
  ],
  contractAddress: [
    { required: true, message: '请填写单位地址', trigger: 'blur' },
  ],
  otherDesc: [{ required: true, message: '请填写其他说明', trigger: 'blur' }],
  clientTypeKey: [
    { required: true, message: '请选择客户类型', trigger: 'blur' },
  ],
  businessTypeKey: [
    { required: true, message: '请选择业务类型', trigger: 'blur' },
  ],
  specificBusinessType: [
    { required: true, message: '请填写具体业务类型', trigger: 'blur' },
  ],
  clientRela: [{ required: true, message: '请选择客户关系', trigger: 'blur' }],
  tags: [{ required: true, message: '请添加商机标签', trigger: 'blur' }],
  followUpStatus: [
    { required: true, message: '请选择跟进状态', trigger: 'blur' },
  ],
}

export { initSearchForm, allSearchForm, rules, initForm }
