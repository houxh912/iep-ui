import {
  getDic,
  getDept,
} from '@/wenjuan/util/dic'
// import {
//   getProject,
//   getGroupDept,
// } from '@/api/evaluate/question'
import {getGroupDept} from '@/api/evaluate/question'
var moment = require('moment')
export default {
  data () {
    return {
      form: {

      },
      showSubordinate: false,
      showGrade: false,
      projectIdDic: [],
      createByDic: [],
      groupData: [],
      disabledProject: false,  // 判断是否是项目跳转过来的
      projectId: '',
    }
  },
  computed: {
    column () {
      return [
        {
          label: '问卷名称',
          prop: 'name',
          span: 12,
          maxlength: 50,
          rules: [{
            required: true,
            message: '不能为空',
            trigger: 'blur',
          }],
        },
        {
          label: '问卷类型',
          prop: 'type',
          span: 12,
          type: 'select',
          dicData: getDic('QUESTION_TYPE'),
          rules: [{
            required: true,
            message: '不能为空',
            trigger: 'change',
          }],
          disabled: this.disabledProject,
        },
        {
          label: '所属项目',
          prop: 'projectId',
          span: 12,
          visdiplay: this.showSubordinate,
          type: 'select',
          dicData: this.projectIdDic,
          rules: [{
            required: true,
            message: '不能为空',
            trigger: 'change',
          }],
          disabled: this.disabledProject,
          change: (value)=>{
            if(value.value){
              getGroupDept(value.value).then(({data}) => {
                if (data.code === this.SUCCESS) {
                  let deptIds = []
                  data.data.map(item=>{
                    deptIds.push(...item.eligibleUnitsList)
                  })
                  this.form.evaDept = deptIds
                  this.$nextTick(()=>{
                    this.$refs['form'] ?  this.$refs['form'].clearValidate(): ''
                  })
                }
              })
            }
          },
        },
        {
          label: '问卷单位',
          prop: 'evaDept',
          type: 'select',
          multiple: true,
          dicData: getDept(),
          span: 12,
          rules: [{
            required: true,
            message: '不能为空',
            trigger: 'change',
          }],
        },
        {
          label: '开始日期',
          prop: 'startTime',
          span: 12,
          type: 'datetime',
          valueFormat: 'yyyy-MM-dd HH:mm:ss',
          rules: [{
            required: true,
            message: '不能为空',
            trigger: 'blur',
          },{ validator: this.validateStart, trigger: 'blur' }],
        },
        {
          label: '结束日期',
          prop: 'endTime',
          span: 12,
          type: 'datetime',
          valueFormat: 'yyyy-MM-dd HH:mm:ss',
          rules: [{
            required: true,
            message: '不能为空',
            trigger: 'blur',
          },{ validator: this.validateEnd, trigger: 'blur' }],
        },
        {
          label: '是否评分',
          prop: 'isGrade',
          span: 12,
          type: 'radio',
          dicData: [{
            value: '1',
            label: '是',
          },{
            value: '2',
            label: '否',
          }],
          rules: [{
            required: true,
            message: '不能为空',
            trigger: 'blur',
          }],
        },
        {
          label: '评分有效性',
          prop: 'gradeEffective',
          span: 12,
          type: 'radio',
          visdiplay: this.showGrade,
          dicData: [{
            value: '1',
            label: '按人数',
          },{
            value: '2',
            label: '按回答率',
          }],
          rules: [{
            required: true,
            message: '不能为空',
            trigger: 'blur',
          }],
        },
        {
          label: '有效阈值',
          type: 'number',
          prop: 'gradeNumber',
          span: 12,
          visdiplay: this.showGrade,
          rules: [{
            required: true,
            message: '不能为空',
            trigger: 'blur',
          }],
          maxlength: 4,
        },
        {
          label: '问卷描述',
          prop: 'remarks',
          span: 24,
          type: 'textarea',
          rules: [{
            required: true,
            message: '不能为空',
            trigger: 'blur',
          }],
          maxlength: 150,
        },
      ]
    },
    detailOption () {
      return {
        option: [
          {
            column: [
              {
                label: '问卷名称',
                prop: 'name',
                span: 12,
              },
              {
                label: '问卷类型',
                prop: 'type',
                span: 12,
                type: 'select',
                dicData: getDic('QUESTION_TYPE'),
              },
              {
                label: '所属项目',
                prop: 'projectId',
                type: 'select',
                dicData: this.projectIdDic,
                span: 12,
              },
              {
                label: '问卷单位',
                prop: 'evaDept',
                type: 'select',
                dicData: getDept(),
                span: 12,
              },
              {
                label: '问卷描述',
                prop: 'remarks',
                span: 12,
              },
              {
                label: '开始日期',
                prop: 'startTime',
                span: 12,
              },
              {
                label: '结束日期',
                prop: 'endTime',
                span: 12,
              },
            ],
          },
        ],
      }
    },
    editOption () {
      return {
        menuBtn: false,
        labelWidth: '100',
        labelPosition: 'right',
        column: this.column,
      }
    },
    searchOption () {
      return [
        { label: '问卷名称', prop: 'name'},
        { label: '问卷类型', prop: 'type', type: 'select', data: getDic('QUESTION_TYPE')  },
        { label: '问卷状态', prop: 'status', type: 'select', data: getDic('QUESTION_STATUS')  },
      ]
    },
    searchOptionMy () {
      return [
        { label: '问卷名称', prop: 'name'},
        { label: '问卷类型', prop: 'type', type: 'select', data: getDic('QUESTION_TYPE')  },
      ]
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
          { label: '问卷名称', prop: 'name'},
          { label: '创建人', prop: 'createBy',type: 'dic', dicData: this.createByDic },
          { label: '问卷类型', prop: 'type', type: 'dic', dicData: getDic('QUESTION_TYPE') },
          { label: '问卷状态', prop: 'status', type: 'dic', dicData: getDic('QUESTION_STATUS') },
          { label: '所属项目', prop: 'projectId',type: 'select', dicData: this.projectIdDic },
          { label: '开始日期', prop: 'startTime', type: 'date' },
          { label: '结束日期', prop: 'endTime', type: 'date' },
          { label: '参与人数/收到问卷人数', prop: 'proportion' },
          { label: '回收率', prop: 'recovery' },
        ],
      }
    },
    myTableOption () {
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
          { label: '问卷名称', prop: 'name'},
          { label: '创建人', prop: 'createBy',type: 'dic', dicData: this.createByDic },
          { label: '问卷类型', prop: 'type', type: 'dic', dicData: getDic('QUESTION_TYPE') },
          { label: '问卷状态', prop: 'status', type: 'dic', dicData: getDic('QUESTION_STATUS') },
          { label: '所属项目', prop: 'projectId',type: 'select', dicData: this.projectIdDic },
          { label: '开始日期', prop: 'startTime', type: 'date' },
          { label: '结束日期', prop: 'endTime', type: 'date' },
        ],
      }
    },
    chooseOption () {
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
          { label: '问卷名称', prop: 'name'},
          { label: '创建人', prop: 'createBy',type: 'dic', dicData: this.createByDic },
          { label: '问卷类型', prop: 'type', type: 'dic', dicData: getDic('QUESTION_TYPE') },
          { label: '问卷状态', prop: 'status', type: 'dic', dicData: getDic('QUESTION_STATUS') },
          { label: '所属项目', prop: 'projectId',type: 'select', dicData: this.projectIdDic },
        ],
      }
    },
  },
  watch: {
    'form.type': {
      deep: true,
      handler (val) {
        if(val == 1){
          this.showSubordinate = true
        }else{
          this.showSubordinate = false
          this.form.subordinate = ''
        }
        this.$nextTick(()=>{
          this.$refs['form'] ?  this.$refs['form'].clearValidate(): ''
        })
      },
    },
    'form.isGrade': {
      handler (val) {
        if(val == 1){
          this.showGrade = true
        }else{
          this.showGrade = false
          this.form.gradeEffective = ''
          this.form.gradeNumber = ''
        }
      },
    },
  },
  methods: {
    validateStart (rule, value, callback) {
      let selectTime = moment(value).valueOf()
      let nowTime = new Date().valueOf()
      let endTime = moment(this.form.endTime).valueOf()
      // moment(value).valueOf() new Date().valueOf()
      if (selectTime < nowTime) {
        callback(new Error('开始的时间必须得是当前时间之后！'))
      } else if(selectTime >= endTime){
        callback(new Error('开始的时间必须小于结束时间！'))
      } else {
        callback()
      }
    },
    validateEnd (rule, value, callback) {
      let selectTime = moment(value).valueOf()
      let startTime = moment(this.form.startTime).valueOf()
      if (selectTime <= startTime) {
          callback(new Error('结束时间必须大于开始时间！'))
        } else {
          callback()
        }
    },
  },
  created () {
    // getProject().then(({data})=>{
    //   console.log('dicData',data.data)
    //   getGroupDept(4)
    // })
  },
}
