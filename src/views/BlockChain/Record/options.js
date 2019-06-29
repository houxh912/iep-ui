const columnsMap = [
  {
    prop: 'id',
    label: 'ID',
    width: '55',
  },
  {
    prop: 'sender',
    label: '发送者',
  },
  {
    prop: 'receiver',
    label: '接收者',
  },
  {
    prop: 'hash',
    label: '哈希值',
  },
  {
    prop: 'amount',
    label: '金额',
    width: '80',
  },
  {
    prop: 'createTime',
    label: '创建时间',
  },
]

const initSearchForm = () => {
  return {
    send: {
      id: '',
      name: '',
    },
    receive: {
      id: '',
      name: '',
    },
    rangeTime: [],
  }
}

const toDtoSearchForm = (row) => {
  const newForm = { ...row }
  newForm.sendUserId = newForm.send.id
  newForm.receiveUserId = newForm.receive.id
  if (newForm.rangeTime.length) {
    newForm.startTime = newForm.rangeTime[0]
    newForm.endTime = newForm.rangeTime[1]
  }
  delete newForm.send
  delete newForm.receive
  delete newForm.rangeTime
  return newForm
}

export {
  columnsMap,
  initSearchForm,
  toDtoSearchForm,
}