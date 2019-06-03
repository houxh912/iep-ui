import { getDic, changeDicType } from '@/wenjuan/util/dic'
export default {
  data () {
    return {
      managerData:[],
    }
  },
  computed: {
    tableOption () {
      return {
        addBtn: false,
        editBtn: false,
        delBtn: false,
        header: false,
        page: false,
        selection: false,
        menuWidth: '180px',
        indexLabel: '序号',
        index: false,
        align: 'center',
        border: false,
        // menu: false,
        column: [
          { label: '指标体系', prop: 'name' },
          { label: '项目名称', prop: 'projectId',type: 'dic',dicData: this.managerData},
          { label: '指标类型', prop: 'indexStyle', type: 'dic', dicData: changeDicType(getDic('INDEX_STYLE'))},
          { label: '创建人', prop: 'createUserName'},
        ],
      }
    },
  },
  created () {
  },
  methods: {


  },
}
