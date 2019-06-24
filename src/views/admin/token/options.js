// org config options

const columnsMap = [
  {
    label: '用户ID',
    prop: 'user_id',
    align: 'center',
  },
  {
    label: '用户名',
    prop: 'username',
    align: 'center',
  },
  {
    label: '令牌',
    prop: 'access_token',
    align: 'center',
    overHidden: true,
  },
  {
    label: '类型',
    prop: 'token_type',
    align: 'center',
  },
  {
    label: '过期时间',
    prop: 'expires_in',
    align: 'center',
  },
]

const initForm = () => {
  return {
    access_token: '',
    createTime: '',
    refresh_token: '',
    username: '',
    token_type: '',
    expires_in: '',
  }
}

export { columnsMap, initForm }