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

        <iep-form-item prop="proposeContent" label-name="建议内容">
          <div class="content">{{form.proposeContent}}</div>
        </iep-form-item>

        <iep-form-item prop="attendeeList" label-name="接收对象">
          <div class="content" v-for="(item,index) in form.attendeeList" :key="index" style="margin-right:5px;">{{item}}</div>
        </iep-form-item>
        <hr>
        <iep-form-item prop="addresStatus" label-name="处理意见">
          <el-radio :disabled="isEdit" v-model="form.addresStatus" label="1">采纳</el-radio>
          <el-radio :disabled="isEdit" v-model="form.addresStatus" label="2">驳回</el-radio>
        </iep-form-item>

        <iep-form-item prop="feedbackOpinion" label-name="反馈意见">
          <iep-input-area :disabled="isEdit" v-model="form.feedbackOpinion"></iep-input-area>
        </iep-form-item>
        <iep-form-item prop="reward" label-name="打赏">
          <el-input :disabled="isEdit" v-model="form.reward" size="small">
            <template slot="append">贝</template>
          </el-input>
        </iep-form-item>
        <hr>
        <iep-form-item label-name="附件">
          <a-tag v-for="file in form.annexList" :key="file.url" @click="handleDownload(file)">
            <a-icon type="paper-clip" />{{file.name}}</a-tag>
        </iep-form-item>

        <el-form-item label="">
          <operation-wrapper>
            <iep-button type="primary" @click="handlePublish" :disabled="isEdit">确定</iep-button>
            <iep-button @click="onGoBack">取消</iep-button>
          </operation-wrapper>
        </el-form-item>
      </el-form>
    </basic-container>
  </div>
</template>
<script>
import { getSuggestionById } from '@/api/hrms/suggestion'
import { initForm, dictsMap } from './options'
import { downloadFile } from '@/api/common'
import { mapGetters } from 'vuex'
export default {
  data () {
    return {
      id: this.$route.params.id,
      pageLoading: true,
      form: initForm(),
    }
  },
  computed: {
    ...mapGetters([
      'userInfo',
    ]),
    isEdit (){
      return this.userInfo.userId === this.form.userId
    },
  },
  created () {
    this.loadPage()
  },
  methods: {
    onGoBack () {
      this.$router.history.go(-1)
    },
    handlePublish () {
      this.handleSubmit(true)
    },
    handleDownload (file) {
      downloadFile(file)
    },
    loadPage () {
      this.pageLoading = true
      getSuggestionById(this.id).then(({ data }) => {
        this.form = this.$mergeByFirst(initForm(), data.data)
        this.pageLoading = false
      })
    },
  },
}
</script>
<style lang="scss" scoped>
</style>

<style scoped>
.iep-page-form >>> .el-form-item__content .el-input-group{
  width: 250px;
}
</style>

