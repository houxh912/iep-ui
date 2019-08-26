const dictsMap = {
  status: {
    0: '禁用',
    1: '正常',
  },
}

const initForm = () => {
  return {
    attributeName: '',
    attributeNumber: '',
  }
}
const columnsMap = [
  {
    prop: 'value',
    label: '序号',
  },
  {
    prop: 'label',
    label: '推荐位名称',
  },
]

const initSearchForm = () => {
  return {
  }
}

const rules = {
  attributeName: [{
    required: true,
    message: '请输入站点名称',
    trigger: 'blur',
  }],
  attributeNumber: [{
    required: true,
    message: '请输入站点名称',
    trigger: 'blur',
  }],
}

const selfRules = {
  ...rules,

}

export { dictsMap, columnsMap, initForm, initSearchForm, rules, selfRules }