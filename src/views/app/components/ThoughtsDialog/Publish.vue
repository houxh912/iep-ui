<template>
  <iep-dialog :dialog-show="dialogShow" title="发布说说" width="50%" @close="resetForm">
    <el-form :model="formData" :rules="rules" ref="form" label-width="100px" style="margin-right: 20px;">

      <el-form-item label="说说内容：" prop="content">
        <el-input type="textarea" rows="5" v-model="formData.content" maxlength="200" />
      </el-form-item>
      <el-form-item label="是否开放：">
        <el-switch
          v-model="formData.status"
          active-color="#13ce66"
          inactive-color="#bbb"
          :active-value="0"
          :inactive-value="1">
        </el-switch>
      </el-form-item>
    </el-form>
    <template slot="footer">
      <iep-button type="primary" @click="submitForm('form')" :loading="loadState">发表</iep-button>
      <iep-button @click="resetForm('form')">取消</iep-button>
    </template>
  </iep-dialog>
</template>
<script>
import { thoughtsCreate } from '@/api/cpms/thoughts'

function initFormData () {
  return {
    content: '',
    status: 0,
  }
}

const rules = {
  content: { required: true, message: '必填', trigger: 'change' },
}

export default {
  data () {
    return {
      rules,
      dialogShow: false,
      formData: initFormData(),
      loadState: false,
    }
  },
  methods: {
    open () {
      this.dialogShow = true
    },
    loadPage () {
      this.$emit('load-page')
    },
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.loadState = true
          thoughtsCreate(this.formData).then(() => {
            this.$message({
              message: '发表成功',
              type: 'success',
            })
            this.loadState = false
            this.loadPage()
            this.dialogShow = false
          })
        } else {
          return false
        }
      })
    },
    resetForm () {
      this.formData = initFormData()
      this.dialogShow = false
    },
  },
}
</script>

<style lang="scss" scoped>
.item {
  line-height: 40px;
  i {
    cursor: pointer;
    margin-left: 20px;
  }
}
</style>
