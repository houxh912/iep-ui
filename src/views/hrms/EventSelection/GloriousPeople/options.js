import { getStore } from '@/util/store'
const dicData = getStore({ name: 'dictGroup' })
function changeDict (name) {
  let data = {}
  for (let item of dicData[name]) {
    data[item.value] = item.label
  }
  return data
}
const dictsMap = {
  category: changeDict('mlms_contract_level'),
  status: {
    0: '启用',
    1: '禁用',
  },
}

const initForm = () => {
  return {
    
  }
}
const columnsMap = [
  {
    prop: 'splendorId',
    label: 'ID',
  },
  {
    prop: 'selectionName',
    label: '评选名称',
  },
  {
    prop: 'category',
    label: '类别',
    type: 'dict',
  },
  {
    prop: 'status',
    label: '状态',
    type: 'dict',
  },
  {
    prop: 'priority',
    label: '优先级',
  },
  {
    prop: 'describes',
    label: '描述',
  },
]

const initSearchForm = () => {
  return {
  }
}

const rules = {
  selectionName: [{
    required: true,
    message: '请输入评选名称',
    trigger: 'blur',
  }],
}

export { dictsMap, columnsMap, initForm, initSearchForm, rules }