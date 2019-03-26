<template>
  <el-upload class="upload-demo" drag :headers="token" :action="actionUrl" accept=".xlsx, .xls" :limit="1" :multiple="false" :on-success="handleFileFinish">
    <i class="el-icon-upload"></i>
    <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
    <div class="el-upload__tip" slot="tip">只能上传xls/xlsx文件
      <el-button type="text" @click="handleDownloadModel()">下载模板</el-button>
    </div>
  </el-upload>
</template>
<script>
import { mapState } from 'vuex'
import { downloadModel } from '@/api/crms/excel'

export default {
  props: {
    urlName: {
      type: String,
      default: '',
    },
  },
  data () {
    return {
      token: {},
      actionUrl: '',
    }
  },
  computed: {
    ...mapState({
      access_token: state => state.user.access_token,
    }),
  },
  created () {
    console.log(this.access_token)
    this.actionUrl = this.urlName
    this.token.Authorization = 'Bearer ' + this.access_token
  },
  methods: {
    handleDownloadModel () {
      downloadModel()
    },
    handleFileFinish (res) {
      setTimeout(() => {
        this.$emit('close', res)
      }, 500)
    },
  },
}
</script>
<style lang="scss" scoped>
.upload-demo {
  text-align: center;
}
</style>
