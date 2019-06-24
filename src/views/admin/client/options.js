// org config options
const dictsMap = {
    status: {
    },
  }
  
  const columnsMap = [
    {
      prop: 'clientId',
      label: '编号',
    },
    {
      prop: 'clientSecret',
      label: '密钥',
    },
    {
      prop: 'scope',
      label: '域',
    },
    {
      prop: 'authorizedGrantTypes',
      label: '授权模式',
    },
    {
      prop: 'autoapprove',
      label: '自动放行',
    },
    {
      prop: 'accessTokenValidity',
      label: '令牌时效',
    },
    {
      prop: 'refreshTokenValidity',
      label: '刷新时效',
    },
  ]
  const rules = {
    clientId: [
      { required: true, message: '请输入', trigger: 'blur' },
    ],
    clientSecret: [
      { required: true, message: '请输入', trigger: 'blur' },
    ],
    scope: [
      { required: true, message: '请输入', trigger: 'blur' },
    ],
    authorizedGrantTypes: [
      { required: true, message: '请输入', trigger: 'blur' },
    ],
    autoapprove: [
      { required: true, message: '请输入', trigger: 'blur' },
    ],
    webServerRedirectUri: [
      { message: '请输入', trigger: 'blur' },
    ],
    authorities: [
      { message: '请输入', trigger: 'blur' },
    ],
    accessTokenValidity: [
      { message: '请输入', trigger: 'blur' },
    ],
    refreshTokenValidity: [
      { message: '请输入', trigger: 'blur' },
    ],
    additionalInformation: [
      { message: '请输入', trigger: 'blur' },
    ],
    resourceIds: [
      { message: '请输入', trigger: 'blur' },
    ],
  }
  const initForm = () => {
    return {
        additionalInformation: '',
        authorities: '',
        authorizedGrantTypes: '',
        autoapprove: '',
        clientId: '',
        clientSecret: '',
        resourceIds: '',
        scope: '',
        webServerRedirectUri: '',
    }
  }
  
  
  export { dictsMap, columnsMap, initForm, rules }