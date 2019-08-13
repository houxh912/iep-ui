<template>
  <div class="tobe-bole">
    <el-form :model="formData" :rules="rules" size="small" ref="form" label-width="120px" style="margin-bottom: 50px;" class="form-detail">
      <h2 class="title">争做伯乐</h2>

      <el-row>
        <el-col>
          <el-form-item label="姓名：" prop="name">
            <el-input v-model="formData.name"></el-input>
          </el-form-item>
        </el-col>
        <el-col>
          <el-form-item label="性别：" prop="">
            <el-radio-group v-model="formData.sex">
              <el-radio :label="1">男</el-radio>
              <el-radio :label="2">女</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
        <el-col>
          <el-form-item label="出生年月：" prop="">
            <IepDatePicker v-model="formData.birthday"></IepDatePicker>
          </el-form-item>
        </el-col>
        <el-col>
          <el-form-item label="应聘岗位：" prop="position">
            <!-- <el-input v-model="formData.positionId"></el-input> -->
            <iep-cascader v-model="formData.position" prefix-url="hrms/post_type"></iep-cascader>
          </el-form-item>
        </el-col>
        <el-col>
          <el-form-item label="学历：" prop="">
            <iep-dict-select v-model="formData.materialType" dict-name="hrms_highest_educational"></iep-dict-select>
          </el-form-item>
        </el-col>
        <el-col>
          <el-form-item label="手机：" prop="phone">
            <el-input v-model="formData.phone"></el-input>
          </el-form-item>
        </el-col>
        <el-col>
          <el-form-item>
            <iep-button type="primary" @click="submitForm('form')" :loading="loadState">保存</iep-button>
            <iep-button @click="resetForm">重置</iep-button>
          </el-form-item>
        </el-col>
      </el-row>

    </el-form>
  </div>
</template>

<script>
import { initFormData, rules } from './option'
import { postResumeBlacklist } from '@/api/hrms/talent_pool'

export default {
  data () {
    return {
      formData: initFormData(),
      rules,
      loadState: false,
    }
  },
  methods: {
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.loadState = true
          this.formData.positionId = this.formData.position[1]
          postResumeBlacklist(this.formData).then(() => {
            this.loadState = false
            this.$message({
              message: '提交成功',
              type: 'success',
            })
            setTimeout(() => {
              this.resetForm()
            }, 1500)
          })
        } else {
          return false
        }
      })
    },
    resetForm () {
      this.$router.history.go(-1)
    },
  },
}
</script>

<style lang="scss" scoped>
.tobe-bole {
  margin: 20px 20px 0 0;
  .title {
    font-size: 26px;
    margin-bottom: 35px;
  }
  .hr {
    background-color: #f8f8f8;
    margin: 10px 0 20px;
    padding: 10px 20px;
  }
  .el-button {
    margin-right: 20px;
  }
}
</style>
