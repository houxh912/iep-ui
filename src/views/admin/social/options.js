
const columnsMap = [
    {
      prop: 'id',
      label: 'ID',
    },
    {
      prop: 'type',
      label: '类型',
    },
    {
      prop: 'remark',
      label: '描述',
    },
    {
      prop: 'appId',
      label: 'appId',
    },
    {
      prop: 'appSecret',
      label: 'appSecret',
    },
    {
      prop: 'createTime',
      label: '创建时间',
    },
  ]
  const rules = {
    id:[{required:true,message: '请输入', trigger: 'blur'}],
    type:[{required:true,message: '请输入', trigger: 'blur'}],
    appId:[{required:true,message: '请输入', trigger: 'blur'}],
    appSecret:[{required:true,message: '请输入', trigger: 'blur'}], 
  }
  const initMemberForm = () => {
    return {
      appId: '',
      appSecret: '',
      redirectUrl: '',
      remark: '',
      type: '',
    }
  }
  
  
  export { columnsMap, initMemberForm, rules }