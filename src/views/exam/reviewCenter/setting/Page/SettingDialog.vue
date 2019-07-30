<template>
  <iep-dialog :dialog-show="dialogShow" :title="`${methodName}信息`" width="500px" @close="loadPage">
    <el-form size="small" label-width="100px" ref="form" :model="form" :rules="rules">
      <iep-form-item label-name="编码" prop="code">
        <el-input v-model="form.code"></el-input>
      </iep-form-item>
      <iep-form-item label-name="名称" prop="name">
        <el-input v-model="form.name"></el-input>
      </iep-form-item>
      <iep-form-item label-name="所属系统" prop="system">
        <el-input v-model="form.system" disabled></el-input>
      </iep-form-item>
    </el-form>
    <template slot="footer">
      <operation-wrapper>
        <iep-button type="primary" @click="updateForm()">保存</iep-button>
        <iep-button @click="loadPage">取消</iep-button>
      </operation-wrapper>
    </template>
  </iep-dialog>
</template>

<script>
import { initMemberForm } from './options'
export default {
  data () {
    return {
      methodName: '创建',
      formRequestFn: () => { },
      dialogShow: false,
      form: initMemberForm(),
      rules: {
        code: [{ required: true, message: '请输入编码', trigger: 'blur' }],
        name: [{ required: true, message: '请输入名称', trigger: 'blur' }],
      },
    }
  },
  methods: {
    loadPage () {
      this.form = initMemberForm()
      this.dialogShow = false
      this.$emit('load-page')
    },
    /**
     * 提交
     */
    updateForm () {
      this.$refs['form'].validate((valid) => {
        if (valid) {
          this.formRequestFn(this.form).then(({ data }) => {
            if (data.data) {
              this.$message.success('修改成功')
              this.loadPage()
            } else {
              this.$message(data.msg)
            }
          })
        }
      })
    },


  },
}
</script>
