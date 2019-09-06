const dictsMap = {
  status: {
    0: '禁用',
    1: '正常',
  },
}

const initForm = () => {
  return {
    adId: '', //广告id
    adslotId: '',
    name: '',// 广告名称
    beginDate: '',//开始时间
    endDate: '',//结束时间
    url: '',//广告url
    text: '',//广告文字
    image: '', //广告图片
    seq: '', //排序,
  }
}
const columnsMap = [
  {
    prop: 'adId',
    label: '广告id',
  },
  {
    prop: 'name',
    label: '广告名称',
  },
  {
    prop: 'url',
    label: '广告url',
  },
]

const initSearchForm = () => {
  return {
  }
}

const rules = {
  name: [{
    required: true,
    message: '请输入',
    trigger: 'blur',
  }],
}

const selfRules = {
  ...rules,

}

export { dictsMap, columnsMap, initForm, initSearchForm, rules, selfRules }