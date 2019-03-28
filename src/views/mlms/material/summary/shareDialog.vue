<template>
  <iep-dialog :dialog-show="dialogShow" :title="`分享${shareType[this.type].name}`" width="50%" @close="resetForm">
    <el-form :model="formData" :rules="shareRules" ref="form" label-width="100px">

      <el-form-item label="主题：" prop="subject">
        <el-input v-model="formData.subject"></el-input>
      </el-form-item>
      <el-form-item label="收件人：" prop="shoujianren">
        <iep-contact-multiple v-model="formData.receiverList"></iep-contact-multiple>
      </el-form-item>
      <el-form-item label="正文：" prop="content">
        <el-input type="textarea" rows=5 placeholder="请在此输入分享说明" v-model="formData.content"></el-input>
      </el-form-item>
      <el-form-item label="已添加纪要：" v-if="type==='summary'">
        <div class="item" v-for="(item, index) in formData.summaryList" :key="index">
          {{item.title}}<i class="el-icon-close"></i>
        </div>
      </el-form-item>
      <el-form-item label="已添加材料：" v-if="type==='material'">
        <div class="item" v-for="(item, index) in formData.materialList" :key="index">
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
import { initShareForm, dictsMap, shareRules, shareType } from './options'
import IepContactMultiple from '@/components/IepContact/Multiple'
import { createEmail } from '@/api/mlms/email/index'

export default {
  components: { IepDialog, IepContactMultiple },
  props: {
    type: {
      type: String,
      default: 'summary',
    },
  },
  data () {
    return {
      dictsMap,
      shareRules,
      dialogShow: false,
      formRequestFn: () => { },
      methodName: '创建',
      formData: initShareForm(),
      list: [],
      shareType,
    }
  },
  methods: {
    open (list) {
      this.dialogShow = true
      this.formData[shareType[this.type].list] = list
    },
    loadPage () {
      this.$emit('load-page')
    },
    submitForm (formName) {
      this.formData[shareType[this.type].ids] = this.formData[shareType[this.type].list].map(m => m.id)
      this.formData.receiverIds = this.formData.receiverList.users.map(m => m.id)
      this.$refs[formName].validate((valid) => {
        if (valid) {
          createEmail(this.formData).then(() => {
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
      this.formData = initShareForm()
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
