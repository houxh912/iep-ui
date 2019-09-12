const dictsMap = {
  status: {
    0: '禁用',
    1: '正常',
  },
}

const initForm = () => {
  return {
    name: '',
    content: '',
  }
}
const columnsMap = [
  {
    prop: 'name',
    label: '模板名称',
  },
]

const rules = {
  name: [{
    required: true,
    message: '请输入',
    trigger: 'blur',
  }],
}


export { dictsMap, columnsMap, initForm, rules }