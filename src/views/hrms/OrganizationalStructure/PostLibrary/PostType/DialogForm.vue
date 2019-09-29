<template>
  <iep-dialog :dialog-show="dialogShow" :title="`${methodName}岗位分类`" width="500px" @close="close">
    <el-form :model="form" :rules="rules" ref="form" size="small" label-width="100px">
      <el-form-item label="分类名称" prop="name">
        <el-input :maxlength="80" v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="分类说明" prop="description">
        <iep-input-area type="textarea" v-model="form.description"></iep-input-area>
      </el-form-item>
    </el-form>
    <template slot="footer">
      <iep-button type="primary" :loading="submitFormLoading" @click="mixinsSubmitFormGen()">{{methodName}}</iep-button>
    </template>
  </iep-dialog>
</template>
<script>
import formMixins from '@/mixins/formMixins'
import { initForm } from './options'
export default {
  mixins: [formMixins],
  data () {
    return {
      dialogShow: false,
      formRequestFn: () => { },
      methodName: '创建',
      form: initForm(),
      rules: {
        name: [
          { required: true, message: '请输入岗位分类名称', trigger: 'change' },
        ],
        description: [
          { required: true, message: '请填写岗位分类描述', trigger: 'change' },
        ],
      },
    }
  },
  methods: {
    close () {
      this.form = initForm()
      this.dialogShow = false
      this.$emit('load-page')
    },
    async submitForm () {
      const { data } = await this.formRequestFn((this.form))
      if (data.data) {
        this.$message.success('操作成功')
        this.close()
      } else {
        this.$message(data.msg)
      }
    },
  },
}
</script>
