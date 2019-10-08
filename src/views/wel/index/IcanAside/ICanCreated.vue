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
        },
        {
          title: '审批',
        },
        {
          title: '建议',
        },
        {
          title: '说说',
        },
        {
          title: '考试',
        },
        {
          title: '调研',
        },
        {
          title: '十',
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
  grid-template-columns: auto auto auto auto auto;
  text-align: center;
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


