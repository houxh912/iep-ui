import { fetchList } from '@/api/admin/user'
import { getDic } from '@/views/wenjuan/util/dic'
export default {
  data () {
    return {

      projectIdDic: [],
      createByDic: [],
    }
  },
  computed: {
    searchOption () {
      return [
        { label: '项目名称', prop: 'projectId', type: 'select', data: this.projectIdDic  },
        { label: '项目经理', prop: 'projectManagerId', type: 'select', data: this.createByDic  },
      ]
    },
    tableComOption () {
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
        column: [
          { label: '项目名称', prop: 'projectName'},
          { label: '指标体系', prop: 'indexSystem'},
          { label: '项目经理', prop: 'projectManager',type: 'dic', dicData: this.createByDic},
          { label: '项目状态', prop: 'status',type: 'dic', dicData:getDic('EVA_PROJECT_STATUS')},
          { label: '参评单位分组', prop: 'grouping'},
          { label: '指标数量', prop: 'indexSystemRelationSum'},
          { label: '已评测', prop: 'stateEvaluationsSum'},
        ],
      }
    },
    tableOption () {
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
        column: [
          { label: '项目名称', prop: 'projectName'},
          { label: '指标体系', prop: 'indexSystem'},
          { label: '项目经理', prop: 'projectManager',type: 'dic', dicData: this.createByDic},
          { label: '项目状态', prop: 'status',type: 'dic', dicData:getDic('EVA_PROJECT_STATUS')},
          { label: '参评单位分组', prop: 'grouping'},
          { label: '指标数量', prop: 'indexSystemRelationSum'},
          { label: '发布工单数', prop: 'workOrderSum'},
        ],
      }
    },
  },
  created () {
    fetchList ({ //获取用户dic
      limit:9999,
      page:1,
    }).then(({data})=>{
      let dic = data.records.map(item=>{
        return {
          value: item.id+'',
          label: item.username,
        }
      })
      this.createByDic = dic
    })
    this.projectIdDic = []
  },
}
