<template>
  <iep-dialog :dialog-show="dialogShow" title="发起交易" width="600px" @close="loadPage">
    <el-form class="form-detail" :model="form" size="small" ref="form" :rules="rules" label-width="120px">
      <el-form-item label="接收者：" prop="user">
        <iep-div-detail :value="form.user"></iep-div-detail>
      </el-form-item>
      <el-form-item label="支出时间：" prop="createTime">
        <iep-date-picker v-model="form.createTime" type="date" placeholder="选择日期"></iep-date-picker>
      </el-form-item>
    </el-form>
  </iep-dialog>
</template>
<script>
import { initForm, rules } from './options'
export default {
  data () {
    return {
      dialogShow: false,
      form: initForm(),
      rules,
    }
  },
}
</script>
