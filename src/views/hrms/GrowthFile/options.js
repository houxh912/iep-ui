const simpleEmployeeStatus = {
  0: '暂无',
  1: '在职',
  2: '在职',
  3: '在职',
  4: '兼职',
  5: '其他',
  6: '离职',
}

const initForm = () => {
  return {
    avatar: '',
    createTime: '',
    id: '',
    idCard: '',
    isExpert: '',
    job: '',
    jobId: '',
    name: '',
    position: '',
    positionId: '',
    professionalTitleId: '',
    sex: '',
    staffNo: '',
    status: '',
    timeLineList: [],
    abilityTag: [],
    projectTag: [],
    learningTag: [],
    title: '',
    updateTime: '',
  }
}

export { simpleEmployeeStatus, initForm }