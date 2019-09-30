<template>
  <iep-dialog :dialog-show="dialogShow" :title="`${methodName}岗位`" width="500px" @close="close">
    <el-form :model="form" :rules="rules" size="small" ref="form" label-width="100px">
      <el-form-item label="岗位名称" prop="name">
        <el-input :maxlength="80" v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="岗位类型" prop="typeId">
        <iep-select prefix-url="hrms/post_type" v-model="form.typeId"></iep-select>
      </el-form-item>
      <el-form-item label="岗位职责" prop="duties">
        <iep-input-area v-model="form.duties"></iep-input-area>
      </el-form-item>
      <el-form-item label="岗位要求" prop="claim">
        <iep-input-area v-model="form.claim"></iep-input-area>
      </el-form-item>
    </el-form>
    <template slot="footer">
      <iep-button type="primary" :loading="submitFormLoading" @click="mixinsSubmitFormGen()">提交</iep-button>
      <iep-button @click="close">取消</iep-button>
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
          { required: true, message: '请输入岗位名称', trigger: 'blur' },
        ],
        typeId: [
          { required: true, message: '请选择岗位类型', trigger: 'blur' },
        ],
        duties: [
          { required: true, message: '请输入岗位职责', trigger: 'blur' },
        ],
        claim: [
          { required: true, message: '请输入岗位要求', trigger: 'blur' },
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

