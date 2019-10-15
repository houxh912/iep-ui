<template>
  <iep-dialog :dialog-show="dialogShow" :title="`友情链接分类${methodName}`" width="700px" @close="loadPage">
    <el-form class="form-detail" :model="form" size="small" :rules="rules" label-width="120px">
      <el-form-item label="分类名称：" prop="typeName">
        <el-input v-model="form.typeName" maxlength="150" show-word-limit></el-input>
      </el-form-item>
      <el-form-item label="分类编码：" prop="typeNumber">
        <el-input v-model="form.typeNumber" maxlength="150" show-word-limit></el-input>
      </el-form-item>
    </el-form>
    <template slot="footer">
      <iep-button type="primary" @click="submitForm()">提交</iep-button>
      <iep-button @click="dialogShow=false">取消</iep-button>
    </template>
  </iep-dialog>
</template>
<script>
import { getTypePageDetailById } from '@/api/conm/f_link_type_controller'
import { initTypeForm, dictsMap, rules } from './options'
import formMixins from '@/mixins/formMixins'
export default {
  mixins: [formMixins],
  data () {
    return {
      dictsMap,
      dialogShow: false,
      formRequestFn: () => { },
      methodName: '创建',
      form: initTypeForm(),
      rules,
      id: 0,
      siteId: 0,
    }
  },
  created () {
    this.loadPage()
  },
  methods: {
    loadPage () {
      this.form = initTypeForm()
      this.dialogShow = false
      this.$emit('load-page')
    },
    loadTypeList () {
      getTypePageDetailById(this.id).then(({ data }) => {
        this.form = this.$mergeByFirst(this.form, data.data)
      })
    },
    async submitForm () {
      this.formRequestFn({ siteId: this.siteId, ...this.form }).then(({ data }) => {
        if (data.data) {
          this.$message.success('操作成功')
          this.loadPage()
        } else {
          this.$message(data.msg)
        }
      })
    },
  },
}
</script>
<style lang="scss" scoped>
.avatar-uploader {
  display: inline-block;
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  transition: 0.3s;
  &:hover .el-icon-circle-close {
    visibility: visible;
  }
}
.el-icon-circle-close {
  position: absolute;
  visibility: hidden;
  top: -7px;
  right: -7px;
  font-size: 16px;
  color: #ccc;
  &:hover {
    color: #409eff;
  }
}
.avatar-uploader:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>
<style scoped>
.form-detail >>> .el-input-number {
  width: 30%;
}
</style>