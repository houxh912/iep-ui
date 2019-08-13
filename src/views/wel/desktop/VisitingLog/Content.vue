<template>
  <div>
    <basic-container>
      <iep-page-header :title="form.title" :backOption="backOption"></iep-page-header>
      <operation-container style="border-bottom: 1px solid #eee;padding-bottom:15px;">
        <template slot="left">
          <span style="margin-right:15px;">组织：{{form.orgName}}</span>
          <span style="margin-right:15px;">发布人: <iep-hover-card v-if="form.realName" :obj="sender"></iep-hover-card>
          </span>
          <span>发布日期：{{form.createTime|parseToDay}}</span>
        </template>
      </operation-container>
      <div class="container">
        <div class="con-item">
          <div class="title">拜访对象</div>
          <div class="content" v-for="item in form.visitingUser" :key="item.id">{{item.name}}</div>
        </div>
        <div class="con-item">
          <div class="title">会议内容</div>
          <div class="content" v-html="form.meetingContent"></div>
        </div>
        <div class="con-item">
          <div class="title">会议总结</div>
          <iep-div-detail class="content" :value="form.meetingCon"></iep-div-detail>
        </div>
        <div class="con-item">
          <div class="title">感想与困惑</div>
          <iep-div-detail class="content" :value="form.thoughtsProblem"></iep-div-detail>
        </div>
      </div>
    </basic-container>
  </div>
</template>
<script>
function initForm () {
  return {
  }
}
export default {
  data () {
    return {
      backOption: {
        isBack: true,
      },
      form: initForm(),
      sender: {
        id: 0,
        name: '',
      },
    }
  },
  props: {
    message: {
      type: Object,
      required: true,
    },
  },
  computed: {
    id () {
      return + this.$route.params.id
    },
  },
  created () {
    this.$watch('message', (newVal) => {
      const newObj = { ...newVal }
      this.form = newObj
      this.sender.id = newObj.userId
      this.sender.name = newObj.realName
    })
  },
  methods: {
  },
}
</script>
<style scoped lang='scss'>
.container {
  padding: 0 10px;
  .con-item {
    margin-bottom: 20px;
    .title {
      margin-bottom: 10px;
      font-size: 15px;
      color: #333;
    }
    .content {
      word-break: break-all;
      word-wrap: break-word;
      white-space: pre-wrap;
      padding: 0 15px;
      font-size: 14px;
      line-height: 28px;
      color: #999;
    }
  }
}
</style>
