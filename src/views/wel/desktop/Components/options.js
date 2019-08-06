const dictsMap = {
  status: {
    0: '禁用',
    1: '正常',
  },
}

const initForm = () => {
  return {
    topic: '',//主题
    person: '',
    content: '',
  }
}

const rules = {
  topic: [{
    required: true,
    message: '请输入主题名称',
    trigger: 'blur',
  }],
  content: [{
    required: true,
    message: '请输入内容',
    trigger: 'blur',
  }],
}


export { dictsMap, initForm, rules }