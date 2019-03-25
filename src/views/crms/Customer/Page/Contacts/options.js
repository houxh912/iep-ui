const columnsMap = [
  { label: '联系人姓名', prop: 'contractName' },
  { label: '联系人职务', prop: 'contractPosition' },
  { label: '电话', prop: 'cellphone' },
]
const initForm = () => {
  return {
    id: '', //新增无id
    contactName: '', //联系人姓名
    contactPosition: '', //联系人职务
    telephoneNo: '', //电话
    fax: '', //传真
    qq: '', //QQ
    wechat: '', //微信
    email: '', //邮箱
    cellphone: '', //手机
    address: '', //地址
    clientConcern: '', //客户关注
    other: '', //其他
  }
}
export { columnsMap, initForm }
