const columnsMap = [
  { label: '业务类型', prop: 'type', width: '150px' },
  { label: '合同金额', prop: 'money', width: '150px' },
  { label: '合同状态', prop: 'status', width: '150px' },
  { label: '回款率', prop: 'efficiency', width: '150px' },
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
