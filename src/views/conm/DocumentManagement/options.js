const dictsMap = {
    status: {
      0: '正常',
      1: '禁用',
    },
  }
  
  const initForm = () => {
    return {
      superiorSite:'',//上级站点
      organization: '',//组织
      name: '',//名称
      domainName: '',//域名
      phoneName: '',//手机端域名
      status: '',//状态
    }
  }
  const columnsMap = [
    {
      prop: 'browsingVolume',
      label: '浏览量',
    },
    {
      prop: 'numberOfComments',
      label: '评论数',
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