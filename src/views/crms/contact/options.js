const columnsMap = [
  {
    prop: 'contactPosition',
    label: '联系人职务',
  },
]

const initForm = () => {
  return {
    contactName: '', //联系人姓名
    contactPosition: '', //联系人职务
    telephoneNo: '', //电话
    clientIds: [], //对接客户
    cellphone: '', //手机
    fax: '', //传真
    qq: '', //qq
    wechat: '', //微信
    email: '', //邮箱
    address: '', //地址
    clientConcern: '', //客户关注
    other: '', //其他
    clientInfos: [],
    clientContactId: '',
  }
}
const initSearchForm = () => {
  return {
    contactName: '',
    clientName: '',
  }
}
const telPhone = (rules, value, callback) => {
  if (value === '') {
    callback(new Error('电话不可为空'))
  } else {
    if (value !== '') {
      var reg = /(^1[0-9]{10}$)|(^0\d{2,3}-?\d{7,8}$)/
      if (!reg.test(value)) {
        callback(new Error('请输入有效的电话号码'))
      }
    }
    callback()
  }
}
const rules = {
  contactName: [
    { required: true, message: '请输入联系人姓名', trigger: 'blur' },
    { min: 2, max: 10, message: '长度在 2 到 10 个字符', trigger: 'blur' },
  ],
  contactPosition: [
    { required: true, message: '请输入联系人职务', trigger: 'blur' },
    { max: 50, message: '长度不可超过50个字符', trigger: 'blur' },
  ],
  telephoneNo: [
    {
      required: true,
      validator: telPhone,
      trigger: 'blur',
    },
  ],
  address: [{ required: true, message: '请填写地址', trigger: 'blur' }],
  clientInfos: [{ required: true, message: '请选择对应客户', trigger: 'blur' }],
}
export { columnsMap, initForm, rules, initSearchForm }
