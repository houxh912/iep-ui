import { getDic,getDept,changeDicType } from '@/views/wenjuan/util/dic'
export default {
  data () {
    return {

      projectIdDic: [],
    }
  },
  computed: {
    searchOption () {
      return [
        { label: '项目名称', prop: 'status', type: 'select', data: this.projectIdDic  },
      ]
    },
    tableOption () {
      return {
        addBtn: false,
        editBtn: false,
        delBtn: false,
        header: false,
        selection: false,
        page: false,
        menuWidth: '180px',
        indexLabel: '序号',
        index: false,
        align: 'center',
        border: false,
        // menu: false,
        column: [
          { label: '参评单位名称', prop: 'eligibleUnitsId',type: 'dic', dicData: getDept()},
          { label: '指标数', prop: 'indexSum' },
          { label: '工单数', prop: 'workOrderSum'},
          { label: '已结束', prop: 'finished'},
          { label: '待审核', prop: 'checkPending'},
          { label: '待确认', prop: 'notConfirmed'},
          { label: '未整改', prop: 'notCorrected'},
          { label: '已整改', prop: 'corrected'},
          { label: '申诉项', prop: 'complaint'},
        ],
      }
    },
    tableOptionMy () {
      return {
        addBtn: false,
        editBtn: false,
        delBtn: false,
        header: false,
        selection: false,
        menuWidth: '180px',
        indexLabel: '序号',
        index: false,
        align: 'center',
        border: false,
        page: false,
        menu: false,
        column: [
          { label: '参评单位名称', prop: 'eligibleUnitsId',type: 'dic', dicData: getDept()},
          { label: '工单类型', prop: 'workOrderType',type: 'dic', dicData: changeDicType(getDic('EVA_PROJECT_TYPE')) },
          { label: '指标项', prop: 'name', solt:true},
          { label: '权重', prop: 'weight', solt:true},
          { label: '得分', prop: 'indexScore'},
          { label: '生成日期', prop: 'createTime'},
          { label: '整改期限', prop: 'rectificationPeriod'},
          { label: '处理状态', prop: 'processState', solt:true},
        ],
      }
    },
  },
  created () {
  },
}
