<template>
  <el-row :gutter="20">
    <el-col :span="20">
      <!-- <div class="top-title">创建组织
        <span>（第1步/共2步）</span>
      </div> -->
      <el-form ref="form" :rules="rules" :model="form" label-width="180px">
        <iep-form-item label-name="名称" prop="name">
          <el-input v-model="form.name" :maxlength="110"></el-input>
        </iep-form-item>
        <iep-form-item label-name="类别" prop="orgType">
          <iep-dict-select v-model="form.orgType" dict-name="GOMS_ORG_TYPE"></iep-dict-select>
        </iep-form-item>
        <iep-form-item label-name="Logo" prop="logo">
          <iep-avatar v-model="form.logo"></iep-avatar>
        </iep-form-item>
        <iep-form-item label-name="简介" prop="intro">
          <iep-input-area v-model="form.intro" placeholder="简单的介绍一下你的组织吧！"></iep-input-area>
        </iep-form-item>
        <!-- <iep-form-item label-name="是否默认加入我能联盟" prop="isICan">
          <el-switch v-model="form.isICan" :active-value="1" :inactive-value="0"></el-switch>
        </iep-form-item> -->
        <el-form-item>
          <el-button type="primary" :loading="submitFormLoading" @click="mixinsSubmitFormGen()">立即创建</el-button>
        </el-form-item>
      </el-form>
    </el-col>
    <el-col :span="8">
      <div class="grid-content bg-purple"></div>
    </el-col>
  </el-row>

</template>

<script>
import { mapActions } from 'vuex'
import formMixins from '@/mixins/formMixins'
import { initForm } from './options'
import { addiCanObj, validOrgName } from '@/api/goms/org'
export default {
  mixins: [formMixins],
  data () {
    const validateOrgName = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('组织名不能为空'))
      } else {
        validOrgName(value).then(({ data }) => {
          if (!data.data) {
            callback(new Error('该组织名已存在。'))
          } else {
            callback()
          }
        })
      }
    }
    return {
      // eslint-disable-next-line
      IS_ICAN,
      form: initForm(),
      rules: {
        name: [
          { required: true, validator: validateOrgName, trigger: 'blur' },
          { min: 3, max: 100, message: '组织名称必须超过 3 个字符，但不得超过 100 个字符', trigger: 'blur' },
        ],
        orgType: [
          { required: true, message: '请选择类别', trigger: 'blur' },
        ],
        intro: [
          { min: 3, max: 2000, message: '组织简介必须超过 3 个字符，但不得超过 2000 个字符', trigger: 'blur' },
        ],
      },
    }
  },
  methods: {
    ...mapActions([
      'GetUserInfo',
      'GetMenu',
      'ClearMenu',
    ]),
    async submitForm () {
      const { data } = await addiCanObj(this.form)
      if (data.data) {
        if (this.IS_ICAN) {
          this.$message.success('创建成功')
          this.tabsActive = 0
          this.form = initForm()
          await this.ClearMenu()
          await this.GetUserInfo()
          await this.GetMenu()
          this.$openPage('/wel/orgwelcome?first=true')
        } else {
          this.$message.success('创建成功，请等待审核！')
          this.tabsActive = 0
          this.form = initForm()
        }
      } else {
        this.$message(data.msg)
      }
    },
  },
}
</script>
<style lang="scss" scoped>
.create-org-container {
  padding: 0 20px;
  text-align: left;
}
.top-title {
  font-size: 24px;
  span {
    font-size: 15px;
    color: #999;
  }
}
</style>
