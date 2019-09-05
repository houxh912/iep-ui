const dictsMap = {
  status: {
    0: '禁用',
    1: '正常',
  },
}

const initForm = () => {
  return {
    adslotId: '',
    name: '',
    adslotNumber: '',
    adslotDescription: '',
    type: 1,
  }
}
const columnsMap = [
  {
    prop: 'value',
    label: '广告位id',
  },
  {
    prop: 'label',
    label: '广告位名称',
  },
]

const initSearchForm = () => {
  return {
  }
}

const rules = {
  name: [{
    required: true,
    message: '请输入',
    trigger: 'blur',
  }],
  adslotNumber: [{
    required: true,
    message: '请输入',
    trigger: 'blur',
  }],
}

const selfRules = {
  ...rules,

}

export { dictsMap, columnsMap, initForm, initSearchForm, rules, selfRules }