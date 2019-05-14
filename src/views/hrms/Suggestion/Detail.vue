<template>
  <div class="iep-page-form">
    <basic-container>
      <page-header title="建议详情">
        <iep-button @click="onGoBack()">返回建议列表</iep-button>
      </page-header>
      <el-form ref="form" :model="form" label-width="140px" size="small">
        <iep-form-item prop="theme" label-name="建议主题">
          <div class="content">{{form.theme}}</div>
        </iep-form-item>

        <iep-form-item prop="desc" label-name="建议内容">
          <div class="content">{{form.desc}}</div>
        </iep-form-item>

        <iep-form-item prop="attendeeList" label-name="接收对象">
          <div class="content">{{form.attendeeList}}</div>
        </iep-form-item>
        <hr>
        <iep-form-item prop="ProcessingOpinion" label-name="处理意见">
          <el-radio :disabled="form.disabled" v-model="form.ProcessingOpinion" label="1">采纳</el-radio>
          <el-radio :disabled="form.disabled" v-model="form.ProcessingOpinion" label="2">驳回</el-radio>
        </iep-form-item>

        <iep-form-item prop="Feedback" label-name="反馈意见">
          <iep-input-area :disabled="form.disabled" v-model="form.Feedback"></iep-input-area>
        </iep-form-item>
        <iep-form-item prop="reward" label-name="打赏">
          <el-input :disabled="form.disabled" v-model="form.reward" size="small">
            <template slot="append">贝</template>
          </el-input>
        </iep-form-item>
        <hr>
        <iep-form-item label-name="附件">
          <div class="file">
            <div><i class="icon-fujian"></i>{{form.annex}}</div>
          </div>
        </iep-form-item>

        <el-form-item label="">
          <operation-wrapper>
            <iep-button type="primary" @click="handlePublish" :disabled="form.disabled">确定</iep-button>
            <iep-button @click="onGoBack">取消</iep-button>
          </operation-wrapper>
        </el-form-item>
      </el-form>
    </basic-container>
  </div>
</template>
<script>
export default {
  data () {
    return {
      form:{
        theme:'主题主题主题主题主题主题',
        desc:'内容内容内容内容内容内容内容内容内容内容',
        attendeeList:'研发中心',
        ProcessingOpinion:'1',
        Feedback:'',
        reward:'',
        annex:'附件附件',
        disabled:true
      },
    }
  },
  methods: {
    onGoBack () {
      this.$router.history.go(-1)
    },
    handlePublish () {
      this.handleSubmit(true)
    },
  },
}
</script>
<style lang="scss" scoped>
.file {
  cursor: pointer;
  i {
    font-size: 16px !important;
    margin-right: 10px;
  }
}
</style>

<style scoped>
.iep-page-form >>> .el-form-item__content .el-input-group{
  width: 250px;
}
</style>

