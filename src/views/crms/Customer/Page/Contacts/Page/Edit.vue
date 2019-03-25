<template>
  <div>
    <page-header title="添加联系人"></page-header>
    <el-form :model="formData" :rules="rules" ref="formName" label-width="140px">
      <el-row>
        <el-col :span=12>
          <el-form-item label="联系人姓名：" prop="contactName">
            <el-input v-model="formData.contactName"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span=12>
          <el-form-item label="联系人职务：" prop="contactPosition">
            <el-input v-model="formData.contactPosition"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item label="电话：" prop="telephoneNo">
        <el-input v-model="formData.telephoneNo"></el-input>
      </el-form-item>
      <el-row>
        <el-col :span=12>
          <el-form-item label="手机：">
            <el-input v-model="formData.cellphone"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span=12>
          <el-form-item label="传真：">
            <el-input v-model="formData.fax"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span=12>
          <el-form-item label="QQ：">
            <el-input v-model="formData.qq"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span=12>
          <el-form-item label="微信：">
            <el-input v-model="formData.wechat"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span=12>
          <el-form-item label="邮箱：">
            <el-input v-model="formData.email"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span=12>
          <el-form-item label="地址：" prop="address">
            <el-input v-model="formData.address"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item label="客户关注：">
        <el-input type="textarea" v-model="formData.clientConcern"></el-input>
      </el-form-item>
      <el-form-item label="其他：">
        <el-input type="textarea" v-model="formData.other"></el-input>
      </el-form-item>
      <el-form-item>
        <iep-button type="danger" @click="submitForm('formName')">保存</iep-button>
      </el-form-item>
    </el-form>

  </div>
</template>

<script>
import { initForm } from '../options'
import { mergeByFirst } from '@/util/util'
import { getContactById } from '@/api/crms/customer_contacts'
export default {
  props: {
    record: {
      type: Object,
      default: () => { },
    },
  },
  data () {
    return {
      methodName: '',
      formRequestFn: () => { },
      formData: initForm(),
      rules: {
        contactName: [
          { required: true, message: '请输入联系人姓名', trigger: 'blur' },
        ],
        contactPosition: [
          { required: true, message: '请输入联系人职务', trigger: 'blur' },
        ],
        telephoneNo: [
          { required: true, message: '请选择区域类型', trigger: 'blur' },
        ],
      },
    }
  },
  created () {
    this.methodName = this.record.methodName
    this.formRequestFn = this.record.formRequestFn
    this.id = this.record.id
    if (this.id) {
      console.log(222)
      getContactById(this.id).then(({ data }) => {
        this.formData = mergeByFirst(initForm(), data.data)
      })
    }
  },
  methods: {

  },
}

</script>

<style>
</style>
