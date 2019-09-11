<template>
  <iep-dialog :dialog-show="dialogShow" :title="`${methodName}`" width="600px" @close="close">
    <el-form :model="form" ref="form" size="small" label-width="100px" :disabled="disabled">
      <el-form-item label="标题：" prop="versionTitle">
        <el-input v-model="form.versionTitle" placeholder="请在此输入标题"></el-input>
      </el-form-item>
      <el-form-item label="版本号：" prop="versionNumber">
        <el-input v-model="form.versionNumber" placeholder="请在此输入版本号"></el-input>
      </el-form-item>
      <el-form-item label="发布时间：" prop="createTime">
        <iep-date-picker v-model="form.createTime" type="datetime" placeholder="请选择发布时间">
        </iep-date-picker>
      </el-form-item>
      <el-form-item label="内容：" prop="versionDesc">
        <iep-input-area v-model="form.versionDesc" placeholder="请在此输入更新内容"></iep-input-area>
      </el-form-item>
    </el-form>
    <template slot="footer">
      <operation-wrapper>
        <iep-button type="primary" @click="updateForm()">保存</iep-button>
        <iep-button @click="close">取消</iep-button>
      </operation-wrapper>
    </template>
  </iep-dialog>
</template>
<script>
import { initForm } from './options'
export default {
  data () {
    return {
      dialogShow: false,
      disabled: false,
      formRequestFn: () => { },
      methodName: '',
      form: initForm(),
    }
  },
  methods: {
    close () {
      this.form = initForm()
      this.dialogShow = false
      this.$emit('load-page')
    },
    updateForm () {
      this.formRequestFn(this.form).then(({ data }) => {
        if (data.data) {
          this.$message.success('操作成功')
          this.close()
        } else {
          this.$message(data.msg)
        }
      })
    },
  },
}
</script>