<template>
  <basic-container v-if="isShow" class="abs iep-page-form">
    <page-header :title="methodName" :backOption="backOption"></page-header>
    
    <el-form :model="formData" :rules="rules" ref="form" label-width="200px">

      <el-row>
        <el-col>
          <el-col :span='12'>
            <el-form-item label="项目经理：" prop='projectManagerObj'>
              <iep-contact-select v-model="formData.projectManagerObj"></iep-contact-select>
            </el-form-item>
          </el-col>
          <el-col :span='12'>
            <el-form-item label="性别：" prop='gender'>
              <el-radio-group v-model="formData.gender">
                <!-- <el-radio v-for="(item, index) in dictGroup.mlms_meeting_type" :key="index" :label="item.value" @change="typeChange">{{item.label}}</el-radio> -->
                <el-radio label="1">男</el-radio>
                <el-radio label="2">女</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
        </el-col>
        <el-col :span='12'>
          <el-form-item label="身份证号码：">
            <el-input v-model="formData.idCardNumber" placeholder="请输入项目经理身份证号码"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span='12'>
          <el-form-item label="年龄：">
            <el-input v-model="formData.age" placeholder="请输入项目经理年龄"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span='12'>
          <el-form-item label="联系电话：" prop='phone'>
            <el-input v-model="formData.phone" placeholder="请输入项目经理联系电话"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span='12'>
          <el-form-item label="邮编：">
            <el-input v-model="formData.zipCode" placeholder="请输入邮编"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span='24'>
          <el-form-item label="通讯地址：">
            <el-input v-model="formData.address" placeholder="请输入通讯地址"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span='12'>
          <el-form-item label="任命开始日期：" prop='appointStartTime'>
            <IepDatePicker v-model="formData.appointStartTime"></IepDatePicker>
          </el-form-item>
        </el-col>
        <el-col :span='12'>
          <el-form-item label="任命结束日期：" prop='appointEndTime'>
            <IepDatePicker v-model="formData.appointEndTime"></IepDatePicker>
          </el-form-item>
        </el-col>
        <el-col :span='24'>
          <el-form-item label="授权单位：" prop='authCompany'>
            <iep-dept-select v-model="formData.authCompany"></iep-dept-select>
          </el-form-item>
        </el-col>
        <el-col :span='24'>
          <el-form-item label="授权日期：" prop='authDate'>
            <IepDatePicker v-model="formData.authDate"></IepDatePicker>
          </el-form-item>
        </el-col>
      </el-row>

    </el-form>
    <footer-toolbar>
      <iep-button type="primary" @click="saveForm">{{methodName}}</iep-button>
      <iep-button @click="close(false)">取消</iep-button>
    </footer-toolbar>

  </basic-container>
</template>

<script>
import { rules, initFormData } from './option'
import FooterToolbar from '@/components/FooterToolbar/'

export default {
  name: 'add-dialog',
  components: { FooterToolbar },
  data () {
    return {
      rules,
      formData: initFormData(),
      backOption: {
        isBack: true,
        backPath: null,
        backFunction: () => {
          this.close(false)
        },
      },
      methodName: '新增',
      formRequestFn: () => {},
    }
  },
  methods: {
    close (state) {
      this.formData = initFormData()
      this.$emit('close', state)
    },
    saveForm () {
      this.$refs['form'].validate((valid) => {
        if (valid) {
          this.formRequestFn(this.formData).then(() => {
            this.$notify({
              title: '成功',
              message: `${this.methodName}成功`,
              type: 'success',
              duration: 2000,
            })
            this.close(true)
          })
        } else {
          return false
        }
      })
    },
  },
  props: {
    isShow: {
      type: Boolean,
      required: false,
    },
  },
}
</script>

<style scoped lang="scss">
  .abs{
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    right: 0;
    z-index: 999;
    background: #fff;
  }
</style>