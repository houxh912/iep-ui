const dictsMap = {
  status: {
    0: '正常',
    1: '禁用',
  },
}

const initForm = () => {
  return {
    parentId:'',//上级站点
    orgId: '',//组织
    siteName: '',//名称
    url: '',//域名
    mobileUrl: '',//手机端域名
    status: '',//状态
  }
}
const columnsMap = [
  {
    prop: 'url',
    label: '域名',
  },
  {
    prop: 'orgId',
    label: '组织',
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

}

const selfRules = {
  ...rules,

}

export { dictsMap, columnsMap, initForm, initSearchForm, rules, selfRules }