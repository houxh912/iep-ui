export const dictsMap = {
  type: {
    1: '类型1',
    2: '类型2',
  },
}

export const tableOption = [
  {
    label: '合同类型',
    prop: 'type',
  }, {
    label: '合同金额',
    prop: 'type',
  }, {
    label: '合同状态',
    prop: 'type',
  }, {
    label: '回款率',
    prop: 'type',
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
