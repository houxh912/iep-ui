<template>
  <my-content class="my-content" title-name="我要创建">
    <div class="my-wrapper">
      <div :class="item.disabled" v-for="(item,index) in dataList" :key="index" @click="item.callback">{{item.title}}</div>
      <div v-show="false" class="add"><i class="el-icon-plus"></i></div>
    </div>
  </my-content>
</template>
<script>
import MyContent from './MyContent'
import { mapMutations } from 'vuex'
export default {
  components: { MyContent },
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
  methods: {
    ...mapMutations({
      setApprovalDialogShow: 'SET_APPROVAL_DIALOG_SHOW',
    }),
  },
}
</script>
<style  lang="scss" scoped>
.disabled {
  color: #ccc;
  cursor: not-allowed;
  &:hover {
    color: #ccc;
  }
}
.my-wrapper {
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
</style>


