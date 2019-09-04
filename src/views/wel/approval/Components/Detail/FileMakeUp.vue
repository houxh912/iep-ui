<template>
  <div>
    <span>附件</span>
    <el-button v-if="!form.attachFile.length" style="float: right; padding: 3px 0" type="text" @click="handleUpload">补交附件</el-button>
    <iep-dialog :dialog-show="dialogShow" title="补交文件" width="440px" @close="dialogShow=false">
      <div class="upload-wrapper">
        <iep-upload v-model="fileList" drag :limit="1" @on-finish="handleFinish"></iep-upload>
      </div>
    </iep-dialog>
  </div>
</template>

<script>
import { postFileMakeUp } from '@/api/hrms/administrative_approval'
export default {
  name: 'FileMakeUp',
  props: {
    form: {
      type: Object,
      required: true,
    },
  },
  data () {
    return {
      dialogShow: false,
      fileList: [],
      fileForm: {
        id: this.form.id,
        attachFile: '',
      },
    }
  },
  methods: {
    handleFinish (files) {
      this.fileList = []
      this.fileForm.attachFile = files[0].url
      postFileMakeUp(this.fileForm).then(({ data }) => {
        if (data.data) {
          this.$message.success('操作成功')
          this.dialogShow = false
          this.$emit('load-page')
        } else {
          this.$message(data.msg)
        }
      })
    },
    handleUpload () {
      this.dialogShow = true
    },
  },
}
</script>