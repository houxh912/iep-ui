<template>
  <div class="iep-basic-scroll">
    <iep-dialog :dialog-show="dialogShow" :title="`${methodName === 'create' ? '新增' : '修改'}分类`" width="40%" @close="resetForm">
      
      <el-form :model="formData" :rules="rules" label-width="100px" ref="form">
        <el-form-item label="分类名称" prop="typeName">
          <el-input v-model="formData.typeName" :maxlength="25"></el-input>
        </el-form-item>
      </el-form>

      <template slot="footer">
        <iep-button type="primary" @click="submitForm('form')">添加</iep-button>
        <iep-button @click="resetForm('form')">取消</iep-button>
      </template>
    </iep-dialog>
  </div>
</template>
<script>
import { rules } from './options'
import { postQuestionType } from '@/api/ics/questionType'

export default {
  components: {  },
  data () {
    return {
      methodName: 'create',
      formData: {},
      dialogShow: false,
      rules,
    }
  },
  methods: {
    open (state = 'create') {
      this.methodName = state
      this.dialogShow = true
    },
    submitForm () {
      this.$refs['form'].validate((valid) => {
        if (valid) {
          this.formData.typeDesc = this.formData.typeName
          postQuestionType(this.formData).then(() => {
            this.$message({
              message: `${this.methodName}成功`,
              type: 'success',
            })
            this.$emit('load_page', true)
            this.resetForm()
          })
        } else {
          return false
        }
      })
    },
    resetForm () {
      this.formData = {}
      this.dialogShow = false
    },
  },
}
</script>

<style lang="scss" scoped>
.menu-vertical {
  .item-tpl {
    display: flex;
    .item-name {
      flex: 1;
    }
    i {
      line-height: 50px;
    }
  }
}
</style>

<style scoped>
.menu-content >>> .el-card__header {
  padding: 8px 20px;
  border: 0;
}
.menu-content >>> .el-submenu__title,
.menu-content >>> .el-menu-item {
  height: 40px;
  line-height: 40px;
}
.menu-content >>> .el-dropdown {
  top: -5px;
}
.menu-content >>> .el-menu {
  border-right: 0;
}
</style>
