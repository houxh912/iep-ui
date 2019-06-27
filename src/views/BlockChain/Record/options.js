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
  initSearchForm,
  toDtoSearchForm,
}