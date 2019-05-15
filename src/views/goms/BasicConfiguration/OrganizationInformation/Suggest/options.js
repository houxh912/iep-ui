import { mergeByFirst } from '@/util/util'

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
    id: '', // ID
    desc: '',//内容
    sender: '',//发件人
    ProcessingOpinion: '',//处理意见
    Feedback:'',//反馈意见
    reward:'',//打赏
  }
}

const initDtoForm = () => {
  return {
    id: '', // ID
    desc: '',//内容
    sender: '',//发件人
    ProcessingOpinion: '',//处理意见
    Feedback:'',//反馈意见
    reward:'',//打赏
  }
}

const formToDto = (row) => {
  const newForm = mergeByFirst(initDtoForm(), row)
  newForm.positionId = row.position[row.position.length - 1]
  newForm.deptId = row.dept[row.dept.length - 1]
  return newForm
}

const rules = {
  theme: [
    { required: true, message: '请填写建议主题', trigger: 'blur' },
  ],
  desc: [
    { required: true, message: '请填写建议内容', trigger: 'blur' },
  ],
}

export { dictsMap, columnsMap, initForm, formToDto, rules }