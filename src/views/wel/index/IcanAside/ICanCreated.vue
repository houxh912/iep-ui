<template>
  <i-can-content class="my-content" title-name="快捷入口">
    <div class="my-wrapper">
      <div :class="item.disabled" v-for="(item,index) in dataList" :key="index" @click="item.callback">{{item.title}}</div>
      <div v-show="false" class="add"><i class="el-icon-plus"></i></div>
    </div>
  </i-can-content>
</template>
<script>
import ICanContent from './ICanContent'
import { mapMutations } from 'vuex'
export default {
  components: { ICanContent },
  data () {
    return {
      dataList: [
        {
          title: '报表',
          callback: () => {
            this.$router.push('/wel/material/report')
          },
        },
        {
          title: '纪要',
          callback: () => {
            this.$router.push('/mlms_spa/summary/create')
          },
        },
        {
          title: '材料',
          callback: () => {
            this.$router.push('/wel/material/datum')
          },
        },
        {
          title: '邮件',
          callback: () => {
            this.$router.push('/wel/mail/new')
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
          title: '+',
          callback: () => {
            return
          },
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
  grid-template-columns: repeat(5, 20%);
  margin-top: 10px;
  text-align: center;
  grid-gap: 1px;
  color: #666;
  div {
    padding: 8px 0;
    font-size: 14px;
    background-color: #fff;
    cursor: pointer;
    &:hover {
      color: $--color-primary;
    }
  }
  .add i {
    color: #999;
  }
}
</style>


