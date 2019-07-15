<template>
  <iep-dialog :dialog-show="dialogShow" :title="`${methodName}大事记`" width="500px" @close="close">
    <el-form :model="form" :rules="rules" ref="form" size="small" label-width="100px">
      <el-form-item label="栏目" prop="node">
        <el-select v-model="form.node" placeholder="请选择栏目">
          <el-option v-for="(item,i) in dictsMap.node" :key="i" :value="+i" :label="item"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="标题" prop="title">
        <el-input v-model="form.title" placeholder="请输入标题"></el-input>
      </el-form-item>
      <el-form-item label="日期" prop="happenTime">
        <iep-date-picker v-model="form.happenTime" placeholder="请选择发生日期"></iep-date-picker>
      </el-form-item>
      <el-form-item label="内容" prop="content">
        <iep-input-area v-model="form.content" placeholder="请输入内容"></iep-input-area>
      </el-form-item>
    </el-form>
    <template slot="footer">
      <iep-button type="primary" @click="submitForm()">{{methodName}}</iep-button>
    </template>
  </iep-dialog>
</template>
<script>
import { initForm, toDtoForm, dictsMap } from './options'
import formMixins from '@/mixins/formMixins'
export default {
  mixins: [formMixins],
  data () {
    return {
      dictsMap,
      dialogShow: false,
      formRequestFn: () => { },
      methodName: '创建',
      form: initForm(),
      rules: {
        name: [
          { required: true, message: '请输入栏目名称', trigger: 'change' },
        ],
        title: [
          { required: true, message: '请输入标题', trigger: 'change' },
        ],
        happenTime: [
          { required: true, message: '请选择日期', trigger: 'change' },
        ],
        content: [
          { required: true, message: '请填写详细内容', trigger: 'change' },
        ],
      },
    }
  },
  methods: {
    close () {
      this.form = initForm()
      this.dialogShow = false
      this.$emit('load-page')
    },
    async submitForm () {
      try {
        await this.mixinsValidate()
        try {
          const { data } = await this.formRequestFn(toDtoForm(this.form))
          if (data.data) {
            this.$message({
              message: '操作成功',
              type: 'success',
            })
            this.close()
          } else {
            this.$message({
              message: data.msg,
              type: 'error',
            })
          }
        } catch (error) {
          this.$message({
            message: error.message,
            type: 'error',
          })
        }
      } catch (object) {
        this.mixinsMessage(object)
      }
    },
  },
}
</script>
