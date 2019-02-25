export const allTableOption = [
  {
    label: '业务类型',
    prop: 'type',
  }, {
    label: '客户类型',
    prop: 'type',
  },  {
    label: '客户关系',
    prop: 'guanxi',
  }, {
    label: '跟进状态',
    prop: 'zhuangtai',
  }, {
    label: '市场经理',
    prop: 'jingli',
  },
]

export const initFormData = () => {
  return {
    id: '',
    name: '',
  }
}

export const rules = {
  name: [
    { required: true, message: '请输入组织名称', trigger: 'blur' },
    { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' },
  ],
}
