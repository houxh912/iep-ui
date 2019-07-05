import { mergeByFirst } from '@/util/util'
const dictsMap = {
  status: {
    0: '启用',
    1: '停用',
  },
}

const initForm = () => {
  return {
    parentId: '',
    nodeDescribe: '',
    // modelId: '',
    nodeName: '',
    status: '',
    tagKeyWords: [],
  }
}
const toNewParentForm = (row) => {
  return mergeByFirst(initForm(), {
    parentId: row.id || 0,
    parentName: row.name || '无',
  })
}
const toDtoForm = (row) => {
  const newForm = { ...row }
  newForm.type = newForm.type[1]
  newForm.parentType = newForm.type[0]
  return newForm
}
const initMergeForm = () => {
  return {
    delete: '',
    oldOrNew: '',
  }
}
const columnsMap = [
  {
    prop: 'nodeName',
    label: '栏目名称',
  },
  {
    prop: 'modelId',
    label: '模型',
  },
  {
    prop: 'numberOfArticles',
    label: '文章数',
  },
  {
    prop: 'status',
    label: '状态',
    type: 'dict',
  },
]

const initSearchForm = () => {
  return {
  }
}

const rules = {
  nodeName: [{
    required: true,
    message: '请输入栏目名称',
    trigger: 'blur',
  }],
}


export { dictsMap, columnsMap, initForm, initMergeForm, toNewParentForm, toDtoForm, initSearchForm, rules }
