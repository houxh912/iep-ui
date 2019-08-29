<template>
  <iep-dialog :dialog-show="dialogShow" title="变更发行" width="500px" @close="close">
    <el-form class="form-detail" ref="form" :model="form" :rules="rules" label-width="120px" size="small">

      <iep-form-item label-name="发行股份" prop="issueNumber">
        <iep-input-number v-model="form.issueNumber" step-strictly></iep-input-number>
      </iep-form-item>
      <iep-form-item label-name="发行类型" prop="releaseType">
        <el-radio-group v-model="form.releaseType">
          <el-radio :label="1">增加</el-radio>
          <el-radio :label="2">减少</el-radio>
        </el-radio-group>
      </iep-form-item>

    </el-form>
    <template slot="footer">
      <iep-button @click="handleSubmit" type="primary">保存</iep-button>
    </template>
  </iep-dialog>
</template>

<script>
import formMixins from '@/mixins/formMixins'
function initForm (id = 0) {
  return {
    investmentId: id,
    issueNumber: 0,
    releaseType: 1,
  }
}
export default {
  mixins: [formMixins],
  data () {
    return {
      form: initForm(),
      rules: {
        issueNumber: [
          { required: true, message: '请填写发行股份且大于0', trigger: 'blur', type: 'number', min: 1 },
        ],
      },
      dialogShow: false,
      formRequestFn: () => { },
    }
  },
  methods: {
    initForm,
    close () {
      this.form = initForm()
      this.dialogShow = false
      this.$emit('load-page')
    },
    async handleSubmit () {
      try {
        await this.mixinsValidate()
        this.formRequestFn(this.form).then(({ data }) => {
          if (data.data) {
            this.$message.success('操作成功')
            this.close()
          } else {
            this.$message(data.msg)
          }
        })
      } catch (object) {
        this.mixinsMessage(object)
      }
    },
  },
}
</script>