<template>
  <iep-dialog :dialog-show="dialogShow" :title="`专题${methodName}`" width="700px" @close="loadPage">
    <el-form class="form-detail" :model="form" size="small" :rules="rules" label-width="120px">
      <el-form-item label="站点id：">
        <el-input v-model="siteId" disabled></el-input>
      </el-form-item>
      <el-form-item label="专题名称：" prop="title">
        <el-input v-model="form.title" maxlength="150" show-word-limit></el-input>
      </el-form-item>
      <el-form-item label="描述：">
        <el-input v-model="form.description" maxlength="250" show-word-limit></el-input>
      </el-form-item>
      <el-form-item label="选择文章：">
        <operation-wrapper class="contact-wrapper">
          <el-tag class="wrapper" v-for="item in titleColumn" :key="item">{{item}}</el-tag>
        </operation-wrapper>
        <iep-button @click="handleSelect">选择文章</iep-button>
      </el-form-item>
    </el-form>
    <template slot="footer">
      <iep-button type="primary" @click="submitForm()">提交</iep-button>
      <iep-button @click="dialogShow=false">取消</iep-button>
    </template>
    <dialog-select-form ref="DialogSelectForm" @load-select="loadSelect"></dialog-select-form>
  </iep-dialog>
</template>
<script>
import { getPageDetailById } from '@/api/conm/special_controller'
import { initForm, dictsMap, rules } from './options'
import formMixins from '@/mixins/formMixins'
import DialogSelectForm from './DialogSelectForm'
export default {
  mixins: [formMixins],
  components: {
    DialogSelectForm,
  },
  data () {
    return {
      dictsMap,
      dialogShow: false,
      formRequestFn: () => { },
      methodName: '创建',
      form: initForm(),
      rules,
      id: 0,
      siteId: 0,
      value: '',
      titleColumn: '',
    }
  },
  methods: {
    loadSelect (val) {
      this.form.articleIds = val.map(m => m.id)
      this.titleColumn = val.map(m => m.title)
      this.$refs['DialogSelectForm'].dialogShow = false
    },
    loadPage () {
      this.form = initForm()
      this.titleColumn = ''
      this.dialogShow = false
      this.$emit('load-page')
    },
    handleSelect () {
      this.$refs['DialogSelectForm'].dialogShow = true
      this.$refs['DialogSelectForm'].methodName = '选择'
      this.$refs['DialogSelectForm'].loadPage()
    },
    loadTypeList () {
      getPageDetailById(this.id).then(({ data }) => {
        this.form = this.$mergeByFirst(this.form, data.data)
        this.titleColumn = this.form.relations.map(m => m.title)
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
<style scoped>
</style>
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