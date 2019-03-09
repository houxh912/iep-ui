export const dictsMap = {
  type: {
    1: '类型1',
    2: '类型2',
  },
}

export const tableOption = [
  {
    label: '创建时间',
    prop: 'type',
    width: '250',
  }, {
    label: '浏览次数',
    prop: 'type',
    width: '200',
  },
]

export const initLocalForm = () => {
  return {
    id: '',
    name: '',
  }
}


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
