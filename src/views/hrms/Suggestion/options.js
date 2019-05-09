// org config options
const dictsMap = {
  status: {
    0: '草稿',
    1: '未处理',
    2: '以采纳',
    3: '已驳回',
  },
}

const columnsMap = [
  {
    prop: 'status',
    label: '状态',
    type: 'dict',
  },
  {
    prop: 'sendTime',
    label: '发送时间',
  },
]

const initForm = () => {
  return {
    'id': '', // ID
    'name': '', // 收件人
    'theme': '', // 主题
    'status': 1, // 状态
    'sendTime': '',//发送时间
  }
}


export { dictsMap, columnsMap, initForm }
