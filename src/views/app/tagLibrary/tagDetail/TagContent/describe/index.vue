<template>
  <div class="iep-page-form">
    <iep-dialog :dialog-show="dialogShow" :title="`${methodName}分类`" width="50%" @close="resetForm">
      <el-form :model="formData" :rules="rules" size="small" ref="form" label-width="130px" style="margin-bottom: 50px;" class="form-detail">

        <el-form-item label="标签名称：">
          <el-input v-model="formData.name" placeholder="请输入标签的名称" readonly></el-input>
        </el-form-item>
        <el-form-item label="标签介绍：" prop="description">
          <el-input v-model="formData.description" placeholder="请输入标签的介绍" type="textarea" :rows=5></el-input>
        </el-form-item>
        
        <el-form-item class="footer">
          <iep-button class="button" type="primary" @click="handleSubmit('form')" :loading="loadState">保存</iep-button>
          <iep-button class="button" @click="resetForm('form')">取消</iep-button>
        </el-form-item>
      </el-form>
    </iep-dialog>
  </div>
</template>
<script>
import { initFormData, rules } from './option'
import { postTagDesc } from '@/api/tms/description'

export default {
  components: {  },
  data () {
    return {
      loadState: false,
      rules,
      formData: initFormData(),
      methodName: '新增',
      backOption: {
        isBack: true,
        backPath: null,
        backFunction: () => {
          this.resetForm()
        },
      },
      dialogShow: false,
    }
  },
  methods: {
    resetForm () {
      this.formData = initFormData()
      this.dialogShow = false
    },
    handleSubmit (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.loadState = true
          postTagDesc(this.formData).then(({ data }) => {
            this.loadState = false
            if (data.data) {
              this.dialogShow = false
              this.$message.success('新增成功！')
              this.$emit('load-page', true)
            } else {
              this.$message.error(data.msg)
            }
          })
        } else {
          this.loadState = false
          return false
        }
      })
    },
    open (row) {
      this.dialogShow = true
      this.formData = Object.assign({}, this.formData, row)
    },
  },
}
</script>

<style lang="scss" scoped>
.el-tag {
  margin-right: 10px;
}
.form-detail {
  padding-right: 10px;
  .footer {
    text-align: right;
    .button {
      margin-left: 15px;
    }
  }
}
</style>
