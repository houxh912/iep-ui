<template>
  <div class="edit-wrapper">
    <basic-container>
      <iep-page-header :title="topTitle" :backOption="backOption"></iep-page-header>

      <div class="top">
        <div class="row">
          <!-- <div>名称：<span>{{row.title}}</span></div> -->
          <div>科目：<span>{{row.fieldName}}</span></div>
          <div>总题量：<span>{{row.choiceNum}} 道</span></div>
          <div>总分：<span>{{row.totalScore}} 分</span></div>
          <div>考试时间：<span>{{row.beginTime}} ~ {{row.endTime}}</span></div>
        </div>
        <!-- <div class="row" style="margin-top:-17px">
        </div> -->
        <!-- <div class="row">
          <p>标签：<el-tag type="info" size="medium" style="margin-right:10px" closable>{{row.title}}</el-tag>
            <el-tag type="info" size="medium" closable>{{row.title}}</el-tag>
          </p>
        </div> -->
      </div>
      <hr class="line">

      <iep-tabs v-model="activeTab" :tab-list="list">
        <template v-if="activeTab ==='ExamPaper' && (isCreator || permissionRegist || permissionAll)"
          v-slot:ExamPaper>
          <exam-paper :record="record"></exam-paper>
        </template>
        <template v-if="activeTab ==='ExamReading'" v-slot:ExamReading>
          <exam-reading :record="record"></exam-reading>
        </template>
        <template v-if="activeTab ==='ExamRegistration' && (isCreator || permissionRegist || permissionAll)"
          v-slot:ExamRegistration>
          <exam-registration :record="record"></exam-registration>
        </template>
      </iep-tabs>
    </basic-container>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import ExamPaper from './examPaper/'
import ExamReading from './examReading/'
import ExamRegistration from './examRegistration/'
export default {
  name: 'examManage',
  components: { ExamPaper, ExamReading, ExamRegistration },
  props: {
    record: {
      type: Object,
      default: () => { },
    },
  },
  data () {
    return {
      topTitle: null,
      row: {},
      tabList: [{
        label: '报名管理',
        value: 'ExamRegistration',
      }, {
        label: '考卷管理',
        value: 'ExamPaper',
      }, {
        label: '阅卷管理',
        value: 'ExamReading',
      }],
      activeTab: 'ExamRegistration',
      backOption: {
        isBack: true,
        backPath: null,
        backFunction: () => {
          this.$emit('onGoBack', {
            currentPage: this.record.currentPage,
            size: this.record.size,
            search: this.record.search,
          })
        },
      },
      permissionAll: false,
      permissionView: false,
    }
  },
  computed: {
    ...mapGetters(['userInfo', 'permissions']),
    permissionRegist () {
      // 报名/考卷权限
      const { operateUsersArray } = this.record.row.iepExaminationOperateVO
      return operateUsersArray.map(Number).includes(this.userInfo.userId)
    },
    permissionReading () {
      // 阅卷权限
      const { writeUsedWriteUsedArray, faceUserIdsArray } = this.record.row.iepExaminationOperateVO
      return (writeUsedWriteUsedArray.map(Number).includes(this.userInfo.userId) || faceUserIdsArray.map(Number).includes(this.userInfo.userId)) && this.permissionView
    },
    /**
     * 判断当前用户是不是考试创建者
     */
    isCreator () {
      const { creatorId } = this.record.row
      return creatorId === this.userInfo.userId
    },
    list () {
      // 根据权限是否显示报名/考卷的tab页
      const array = [].concat(this.tabList)
      if (this.isCreator || this.permissionAll) return array
      if (this.permissionRegist) return array.splice(0, 2)
      if (this.permissionReading) return array.splice(2)
      return array
      // return this.permissionRegist || this.permissionAll ? array : array.splice(2)
    },
  },
  created () {
    const { row, activeTab } = this.record
    this.row = row
    // console.log(this.row)
    this.activeTab = activeTab
    this.row.fieldName = this.row.fieldName
    // this.row.title = this.row.title
    this.row.choiceNum = this.row.choiceNum
    this.row.totalScore = this.row.totalScore
    this.row.beginTime = this.row.beginTime
    this.row.endTime = this.row.endTime
    this.topTitle = '考试名称： ' + this.row.title
    this.setPermission()
  },
  methods: {
    setPermission () {
      this.permissionAll = this.permissions['exam_library_all']
      this.permissionView = this.permissions['exam_library_view']
    },
  },
}
</script>
<style lang="scss" scoped>
.edit-wrapper {
  margin: 5px 5px 50px 5px;
  .title {
    width: 100%;
    height: 50px;
    line-height: 50px;
    display: flex;
    align-items: center;
    .department {
      font-weight: 600;
      font-size: 18px;
    }
    .back {
      height: 30px;
      float: right;
      margin-left: auto;
    }
  }
  .top {
    // height: 95px;
    margin: -15px 0px;
    // background-color: #ecf5ff;
    .row {
      display: flex;
      line-height: 33px;
      font-size: 16px;
      color: #000000;
      div {
        margin-right: 40px;
        float: left;
        span {
          color: #797b79;
        }
      }
    }
  }
  .line {
    margin-bottom: 0px !important;
  }
}
</style>