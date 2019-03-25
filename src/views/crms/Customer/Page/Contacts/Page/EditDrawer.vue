<template>
  <iep-drawer :drawer-show="drawerShow" type="drawer" :title="methodName+'联系人'" width="50%" @close="loadPage">
    <el-form :model="form" :rules="rules" ref="form" label-width="140px">
      <el-row>
        <el-col :span=12>
          <el-form-item label="联系人姓名：" prop="contactName">
            <el-input v-model="form.contactName"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span=12>
          <el-form-item label="联系人职务：" prop="contactPosition">
            <el-input v-model="form.contactPosition"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item label="电话：" prop="cellphone">
        <el-input v-model="form.cellphone"></el-input>
      </el-form-item>
      <el-row>
        <el-col :span=12>
          <el-form-item label="手机：">
            <el-input v-model="form.telephoneNo"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span=12>
          <el-form-item label="传真：">
            <el-input v-model="form.fax"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span=12>
          <el-form-item label="QQ：">
            <el-input v-model="form.qq"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span=12>
          <el-form-item label="微信：">
            <el-input v-model="form.wechat"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span=12>
          <el-form-item label="邮箱：">
            <el-input v-model="form.email"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span=12>
          <el-form-item label="地址：" prop="address">
            <el-input v-model="form.address"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item label="客户关注：">
        <el-input type="textarea" v-model="form.clientConcern"></el-input>
      </el-form-item>
      <el-form-item label="其他：">
        <el-input type="textarea" v-model="form.other"></el-input>
      </el-form-item>
    </el-form>
    <template slot="footer">
      <iep-button class="btn" @click="loadPage()">取消</iep-button>
      <iep-button type="danger" @click="submitForm('form')">保存</iep-button>
    </template>
  </iep-drawer>
</template>
<script>
import { initForm } from '../options'
export default {
  data () {
    return {
      drawerShow: false,
      methodName: '',
      formRequestFn: () => { },
      form: initForm(),
      rules: {
        departureTime: [
          { required: true, message: '请选择离职时间', trigger: 'blur' },
        ],
        reason: [
          { required: true, message: '请输入离职原因', trigger: 'blur' },
        ],
      },
    }
  },
  methods: {
    loadPage () {
      this.form = initForm()
      this.drawerShow = false
      this.$emit('load-page')
    },
    submitForm (form) {
      this.$refs[form].validate((valid) => {
        if (valid) {
          this.formRequestFn(this.form).then(() => {
            this.$notify({
              title: '成功',
              message: '离职成功',
              type: 'success',
              duration: 2000,
            })
            this.loadPage()
          })
        } else {
          return false
        }
      })
    },
  },
}
</script>

