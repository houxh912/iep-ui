<template>
  <iep-dialog :dialog-show="dialogShow" title="纪要分享" width="50%" @close="resetForm">
    <el-form :model="formData" :rules="shareRules" ref="form" label-width="100px">

      <el-form-item label="主题：" prop="zhuti">
        <el-input v-model="formData.zhuti"></el-input>
      </el-form-item>
      <el-form-item label="收件人：" prop="shoujianren">
        <iep-tags v-model="formData.shoujianren"></iep-tags>
      </el-form-item>
      <el-form-item label="正文：" prop="zhengwen">
        <el-input type="textarea" rows=5 placeholder="请在此输入分享说明" v-model="formData.zhengwen"></el-input>
      </el-form-item>
      <el-form-item label="已添加材料：">
        <div class="item" v-for="(item, index) in list" :key="index">
          {{item.name}}<i class="el-icon-close"></i>
        </div>
      </el-form-item>
      
    </el-form>
    <template slot="footer">
      <iep-button type="primary" @click="submitForm('form')">{{methodName}}</iep-button>
      <iep-button @click="resetForm('form')">取消</iep-button>
    </template>
  </iep-dialog>
</template>
<script>
import IepDialog from '@/components/IepDialog/'
import { initFormData, dictsMap, shareRules } from './options'
import IepTags from '@/components/IepTags/input'

export default {
  components: { IepDialog, IepTags },
  data () {
    return {
      dictsMap,
      shareRules,
      dialogShow: false,
      formRequestFn: () => { },
      methodName: '创建',
      formData: initFormData(),
      list: [{name: '20190201数据基因流程图'}, {name: '20190201数据基因流程图'}],
    }
  },
  methods: {
    loadPage () {
      this.$emit('load-page')
    },
    submitForm (formName) {
      console.log('formData: ', this.formData)
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.formRequestFn(this.formData).then(() => {
            this.$notify({
              title: '成功',
              message: `${this.methodName}成功`,
              type: 'success',
              duration: 2000,
            })
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
