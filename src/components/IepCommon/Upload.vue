<template>
  <el-upload action="/api/admin/file/upload" :headers="headers" :on-preview="handlePreview" :on-remove="handleRemove" :before-remove="beforeRemove" :on-success="handleSuccess" multiple :limit="limit" :on-exceed="handleExceed" :file-list="fileList" drag v-bind="$attrs" v-on="$listeners">
    <el-button v-if="!drag" size="small" type="primary">点击上传</el-button>
    <template v-else>
      <i class="el-icon-upload"></i>
      <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
    </template>
    <div slot="tip" class="el-upload__tip">
      <slot></slot>
    </div>
  </el-upload>
</template>
<script>
import store from '@/store'
import { downloadFile } from '@/api/common'
export default {
  name: 'IepUpload',
  inheritAttrs: false,
  props: {
    value: {
      type: Array,
      required: true,
    },
    limit: {
      type: Number,
      default: 1,
    },
    drag: {
      type: Boolean,
      default: false,
    },
  },
  data () {
    return {
      headers: {
        Authorization: 'Bearer ' + store.getters.access_token,
      },
    }
  },
  computed: {
    fileList: {
      get: function () {
        return this.value
      },
      set: function (value) {
        this.$emit('input', value)
      },
    },
  },
  methods: {
    handleSuccess (res, rfile) {
      const file = {
        name: rfile.name,
        url: res.data.bucketName + '-' + res.data.fileName,
      }
      this.fileList.push(file)
    },
    handleRemove (file) {
      const newData = this.fileList.filter(item => item.url !== file.url)
      this.fileList = newData
    },
    handlePreview (file) {
      downloadFile(file)
    },
    handleExceed (files, fileList) {
      this.$message.warning(`当前限制选择 ${this.limit} 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`)
    },
    beforeRemove (file) {
      return this.$confirm(`确定移除 ${file.name}？`)
    },
  },
}
</script>