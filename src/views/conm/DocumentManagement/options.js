const dictsMap = {
    status: {
      0: '正常',
      1: '禁用',
    },
  }
  
  const initForm = () => {
    return {
      id: '',
      title: '',
      createTime:'',//发布时间
      status: '',//状态
      // infoDescribe: '',//信息描述
      tagKeyWords:[],
      content:'',
    }
    // {
    //   "content": "string",
    //   "createTime": "2019-07-03T08:49:48.842Z",
    //   "creatorId": 0,
    //   "delFlag": 0,
    //   "id": 0,
    //   "infoDescribe": "string",
    //   "nodeId": 0,
    //   "priority": 0,
    //   "status": 0,
    //   "tagKeyWords": [
    //     "string"
    //   ],
    //   "title": "string",
    //   "updateTime": "2019-07-03T08:49:48.842Z",
    //   "views": 0
    // }
  }
  const columnsMap = [
    {
      prop: 'views',
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