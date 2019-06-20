<template>
  <iep-drawer :drawer-show="drawerShow" type="drawer" :title="'联系人'+methodName" width="40%" @close="loadPage">
    <el-form :model="form" label-width="120px" size="small" :disabled="true">
      <el-row>
        <el-col :span=12>
          <el-form-item label="联系人姓名：">
            {{form.contactName}}
          </el-form-item>
        </el-col>
        <el-col :span=12>
          <el-form-item label="联系人职务：">
            {{form.contactPosition}}
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span=12>
          <el-form-item label="电话：">
            {{form.telephoneNo}}
          </el-form-item>
        </el-col>
        <el-col :span=12>
          <el-form-item label="手机：">
            {{form.cellphone}}
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span=12>
          <el-form-item label="传真：">
            {{form.fax}}
          </el-form-item>
        </el-col>
        <el-col :span=12>
          <el-form-item label="QQ：">
            {{form.qq}}
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span=12>
          <el-form-item label="微信：">
            {{form.wechat}}
          </el-form-item>
        </el-col>
        <el-col :span=12>
          <el-form-item label="邮箱：">
            {{form.email}}
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item label="地址：">
        {{form.address}}
      </el-form-item>
      <el-form-item label="客户关注：">
        {{form.clientConcern}}
      </el-form-item>
      <el-form-item label="其他：">
        {{form.other}}
      </el-form-item>
    </el-form>
  </iep-drawer>
</template>
<script>
import { initForm } from './options'
export default {
  data () {
    return {
      drawerShow: false,
      methodName: '',
      form: initForm(),
    }
  },
  methods: {
    loadPage () {
      this.form = initForm()
      this.drawerShow = false
      this.$emit('load-page')
    },
  },
}
</script>

