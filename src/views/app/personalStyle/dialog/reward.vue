<template>
  <iep-dialog :dialog-show="dialogShow" title="材料纠错" width="50%" @close="resetForm">
    <el-form :model="formData" :rules="rules" ref="form" label-width="100px">

      
    </el-form>

    <template slot="footer">
      <iep-button type="primary" @click="submitForm('form')">确认</iep-button>
      <iep-button @click="resetForm('form')">取消</iep-button>
    </template>
  </iep-dialog>
</template>
<script>

const initWrongForm = () => {
  return {}
}
const rules = () => {
  return {}
}

export default {
  props: {
    type: {
      type: String,
      default: 'summary',
    },
  },
  data () {
    return {
      rules,
      dialogShow: false,
      formData: initWrongForm(),
      list: [],
    }
  },
  methods: {
    open (row) {
      this.dialogShow = true
      this.formData = Object.assign({}, this.formData, row)
    },
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.create(this.formData).then(() => {
            this.$message({
              message: '打赏成功',
              type: 'success',
            })
            this.resetForm()
          })
        } else {
          return false
        }
      })
    },
    resetForm () {
      this.formData = initWrongForm()
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
