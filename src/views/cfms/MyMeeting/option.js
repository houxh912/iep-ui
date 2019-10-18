const columns = [
  // { label: '会议海报', prop: 'huiyi' },
  { label: '会议信息', prop: 'meetingTitle', width: 200 },
  { label: '链接地址', prop: 'meetingUrl', width: 300 },
  { label: '已报名', prop: 'meetingSignupView', width: 100 },
  { label: '发布人', prop: 'createName' },
  { label: '发布时间', prop: 'createTime', width: 150 },
  { label: '状态', prop: 'meetingFlagName' },
]
const columnsName = [
  { label: '名称', prop: 'name' },
  { label: '手机', prop: 'phoneNumber' },
  { label: '组织', prop: 'companyName' },
  { label: '职务', prop: 'position' },
  { label: '邮箱', prop: 'email', width: 200 },
  { label: '备注', prop: 'note' },
  { label: '状态', prop: 'signupFlagName' },
  // { label: '备注', prop: 'meetingFlagName' },
]
const initSearchForm = () => {
  return {
    inName: '',
    inPhone: '',
    inEmail: '',
    signupFlag: '',
  }
}
var checkPhone = (rule, value, callback) => {
  if (!value) {
    return callback(new Error('手机号不能为空'))
  } else {
    const reg = /^1[3|4|5|7|8][0-9]\d{8}$/
    console.log(reg.test(value))
    if (reg.test(value)) {
      callback()
    } else {
      return callback(new Error('请输入正确的手机号'))
    }
  }
}
const rules = {
  companyName: [{ required: true, message: '请输入公司名称', trigger: 'blur' }],
  position: [{ required: true, message: '请输入职位', trigger: 'blur' }],
  name: [{ required: true, message: '请输入姓名', trigger: 'blur' }],
  phoneNumber: [{ required: true, validator: checkPhone, trigger: 'blur' }],
  email: [{ message: '请输入电子邮箱', trigger: 'blur' }, { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }],
  note: [{ max: 80, message: '长度不超过80个字符', trigger: 'blur' }],
}
const initForm = () => {
  return {
    companyName: '', // 公司
    position: '', // 职位
    name: '', // 姓名
    phoneNumber: '', // 联系电话
    email: '', // 电子邮箱
  }
}
export { columns, columnsName, initSearchForm, rules, initForm }