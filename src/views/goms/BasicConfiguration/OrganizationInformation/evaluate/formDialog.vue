<template>
  <iep-dialog :dialog-show="dialogShow" title="组织评价" width="600px" @close="close">
    <el-form ref="form" :model="form" :rules="rules" size="small" label-width="0">
      <el-form-item label="" prop="content">
        <el-input type="textarea" v-model="form.content" placeholder="发表评价" :rows="5"></el-input>
      </el-form-item>
    </el-form>
    <template slot="footer">
      <iep-button type="primary" @click="submitForm">确认</iep-button>
      <iep-button @click="close">取消</iep-button>
    </template>
  </iep-dialog>
</template>

<script>
import { orgEvaluateUpdate } from '@/api/admin/orgEvaluate'
const initFormData = () => {
  return {
    id: '',
    orgId: 0,
    content: '',
  }
}
export default {
  data () {
    return {
      dialogShow: false,
      form: initFormData(),
      rules: {
        content: [
          { required: true, message: '请输入你的评价', trigger: 'blur' },
        ],
      },
    }
  },
  methods: {
    // 我要评价
    open (row) {
      this.dialogShow = true
      this.form.orgId = row.orgId
      this.form.id = row.id
      this.form.content = row.content
    },
    submitForm () {
      this.$refs['form'].validate((valid) => {
        if (valid) {
          orgEvaluateUpdate(this.form).then(({data}) => {
            if (data.data) {
              this.$message.success('评价成功！')
              this.close(true)
            } else {
              this.$message.error('评价出错，请重试')
            }
            this.dialogShow = false
          })
        }
      })
    },
    close (type = false) {
      this.form = initFormData()
      this.dialogShow = false
      this.$emit('load-page', type)
    },
  },
}
</script>
