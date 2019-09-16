export const columnsMap = [
  {
    label: '姓名',
    prop: 'staffName',
  },
  {
    label: '所在组织',
    prop: 'department',
    // width:'120px',
  },
  {
    label: '员工状态',
    prop: 'staffState',
  },
  {
    label: '考试次数',
    prop: 'examTime',
  },
  // {
  //   label: '考试参与率',
  //   prop: 'joinRate',
  // },
  {
    label: '合格率',
    prop: 'passRate',
  },
  {
    label: '证书数',
    prop: 'certificate',
  },
]

export const examMap = [
  {
    label: '考试科目',
    prop: 'examSubValue',
  },
  {
    label: '考试名称',
    prop: 'examName',
  },
  {
    label: '考试类型',
    prop: 'examTypeValue',
  },
  {
    label: '考试时间',
    prop: 'examTime',
  },
  // {
  //   label: '交卷时间',
  //   prop: 'finishTime',
  // },
  // {
  //   label: '答题时长',
  //   prop: 'answerTime',
  // },
  // {
  //   label: '成绩',
  //   prop: 'result',
  // },
  // {
  //   label: '成绩状态',
  //   prop: 'isPass',
  // },
]

export const certificateMap = [
  {
    label: '考试科目',
    prop: 'examSub',
  },
  {
    label: '证书名称',
    prop: 'cerName',
  },
  {
    label: '证书级别',
    prop: 'cerLevel',
  },
  {
    label: '取得时间',
    prop: 'getTime',
  },
  {
    label: '颁发机构',
    prop: 'issuer',
  },
]

export const examinee = [
  {
    value: '2',
    label: '已考人员',
  },
  {
    value: '1',
    label: '未考人员',
  },
]

export const examineeRankWay = [
  {
    value: '1',
    label: '考试数量从高到低',
  },
  // {
  //   value: '2',
  //   label: '参与率从高到低',
  // },
  {
    value: '2',
    label: '证书数量从高到低',
  },
  {
    value: '3',
    label: '合格率从高到低',
  },
]

export const staffState = [
  {
    value: '1',
    label: '正式员工',
  },
  {
    value: '2',
    label: '试用期员工',
  },
  {
    value: '3',
    label: '实习期员工',
  },
  {
    value: '4',
    label: '兼职员工',
  },
  {
    value: '5',
    label: '其他',
  },
]

export const examType = [
  {
    value: '0',
    label: '考试模式',
  },
  {
    value: '1',
    label: '练习模式',
  },
]

export const isPass = [
  // {
  //   value: '1',
  //   label: '优秀',
  // },
  {
    value: '1',
    label: '及格',
  },
  {
    value: '-1',
    label: '不及格',
  },
]

export const examRankWay = [
  {
    value: '1',
    label: '成绩升序',
  },
  {
    value: '0',
    label: '成绩降序',
  },
]