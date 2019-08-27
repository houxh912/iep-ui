<template>
  <div class="created">
    <div class="title">我要创建</div>
    <div class="created-content">
      <div class="handelCreate" :class="item.disabled" v-for="(item,index) in dataList" :key="index" @click="item.callback">{{item.title}}</div>
      <div v-show="false" class="add"><i class="el-icon-plus"></i></div>
    </div>
  </div>
</template>
<script>
import { mapMutations } from 'vuex'
export default {
  data () {
    return {
      dataList: [
        {
          title: '纪要',
          callback: () => {
            this.$router.push('/mlms_spa/summary/create')
          },
        },
        {
          title: '报表',
          callback: () => {
            this.$router.push('/wel/material/report')
          },
        },
        {
          title: '材料',
          callback: () => {
            this.$router.push('/wel/material/datum')
          },
        },
        {
          title: '任务',
          callback: () => {
            this.$router.push('/atms/add')
          },
        },
        {
          title: '审批',
          callback: () => {
            this.setApprovalDialogShow(true)
          },
        },
        {
          title: '建议',
          callback: () => {
            this.$router.push('/hrms_spa/suggestion_list')
          },
        },
        {
          title: '说说',
          callback: () => {
            this.$router.push({ path: '/wel/material/report', query: { type: 'thoughts' } })
          },
        },
        {
          title: '邮件',
          callback: () => {
            this.$router.push('/wel/mail/new')
          },
        },
        {
          title: '考试',
          callback: () => {
            this.$router.push('/exam/testPage/subjectTest')
          },
        },
        {
          title: '调研',
          callback: () => {
            this.$router.push('/wenjuan/questionnaire')
          },
        },
        {
          title: '评估',
          callback: () => {
            this.$openPage('//123.157.68.243:10090', 'url')
          },
        },
        {
          title: '建模',
          callback: () => {
            this.$message('功能开发中')
          },
          disabled: 'disabled',
        },
      ],
    }
  },
  methods: {
    ...mapMutations({
      setApprovalDialogShow: 'SET_APPROVAL_DIALOG_SHOW',
    }),
    //创建标签事件
    handelCreate () {

    },
    //+添加事件
    handelAdd () {

    },
  },
}
</script>
<style  lang="scss" scoped>
.created {
  box-sizing: border-box;
  margin: 10px 5px;
  .disabled {
    color: #ccc;
    cursor: not-allowed;
    &:hover {
      color: #ccc;
    }
  }
}
.created-content {
  display: grid;
  grid-template-columns: auto auto auto auto;
  text-align: center;
  background: #ececec;
  grid-gap: 1px;
  color: #666;
  div {
    padding: 10px 0;
    font-size: 14px;
    background-color: #fafafa;
    cursor: pointer;
    &:hover {
      color: #cb132d;
    }
  }
  .add i {
    color: #999;
  }
}
.title {
  padding: 0 0 10px;
  font-size: 16px;
  font-weight: 500;
}
</style>


