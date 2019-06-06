export const initFormData = () => {
  return {
    list: [],
    kpiVOs: [],
  }
}

export const dictsMap = {
  scoringMethod: {
    1: '平均分',
    2: '去掉最高最低平均分',
  },
}

export const initTableColumn = () => {
  return [
    {
      label: '考核指标项',
      value: 'checkName',
      fixed: true,
      width: '150px',
    },
    {
      label: '考核指标说明',
      value: 'checkExplan',
      width: '220px',
    },
    {
      label: '权重（%）',
      value: 'weight',
      width: '100px',
    },
  ]
}