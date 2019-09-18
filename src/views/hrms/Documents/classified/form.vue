<template>
  <div class="iep-page-form">
    <iep-dialog :dialog-show="dialogShow" :title="`${methodName}分类`" width="50%" @close="resetForm">
      <el-form :model="formData" :rules="rules" size="small" ref="form" label-width="130px" style="margin-bottom: 50px;" class="form-detail">

        <el-form-item label="栏目名称：" prop="className">
          <el-input v-model="formData.className" placeholder="请输入栏目的名称"></el-input>
        </el-form-item>
        <el-form-item label="栏目编码：" prop="columnCode">
          <el-input v-model="formData.columnCode" placeholder="请输入栏目的编码"></el-input>
        </el-form-item>
        <el-form-item label="栏目描述：">
          <el-input v-model="formData.represent" placeholder="请输入栏目的描述" type="textarea" :rows=5></el-input>
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
import { createClassManage, updateClassManage } from '@/api/hrms/iephrclassmanage'
import { initFormData, dictsMap, rules } from './option'

export default {
  components: {  },
  data () {
    return {
      loadState: false,
      dictsMap,
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
      requestFn: () => {},
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
          this.requestFn(this.formData).then(({ data }) => {
            this.loadState = false
            if (data.data) {
              this.$message.success('保存成功！')
              this.resetForm()
              this.$emit('load-page', true)
            } else {
              this.$message.error(data.msg)
            }
          })
        } else {
          return false
        }
      })
    },
    open (type, formData) {
      this.dialogShow = true
      if (type === 'create') {
        this.requestFn = createClassManage
        this.methodName = '新增'
      } else {
        this.requestFn = updateClassManage
        this.methodName = '修改'
        this.formData = formData
      }
    },
  },
  created () {
    
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
