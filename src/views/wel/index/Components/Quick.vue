<template>
  <wrapper title="快捷入口">
    <template v-slot:right>
      <el-link type="primary">编辑</el-link>
    </template>
    <div class="grid-btn-group">
      <div class="btn" v-for="(item,index) in dataList" :key="index" @click="item.callback">{{item.title}}</div>
    </div>
  </wrapper>
</template>
<script>
import Wrapper from './Wrapper'
export default {
  components: {
    Wrapper,
  },
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
            this.$router.push({ path: '/wel/thoughts/thought_mine' })
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
}
</script>
<style lang="scss" scoped>
.grid-btn-group {
  width: 100%;
  margin: 10px;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
  gap: 10px;
  text-align: center;
  .btn {
    cursor: pointer;
    border-radius: 5px;
    border: 1px solid transparent;
    &:hover {
      border: 1px solid #ddd;
    }
  }
}
</style>
