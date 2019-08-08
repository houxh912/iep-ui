<template>
  <iep-dialog :dialog-show="dialogShow" :title="`文档${methodName}`" width="1200px" @close="loadPage">
    <el-form class="form-detail" :model="form" size="small" ref="form" :rules="rules" label-width="120px">
      <el-form-item label="标题：" prop="title">
        <el-input v-model="form.title"></el-input>
      </el-form-item>
      <el-form-item label="标签：" prop="tagKeyWords">
        <iep-tag v-model="form.tagKeyWords"></iep-tag>
      </el-form-item>
      <el-form-item label="发布时间：" prop="updateTime" v-show="methodName==='新增'">
        <iep-date-picker v-model="form.updateTime" type="datetime" placeholder="请选择发布时间"></iep-date-picker>
      </el-form-item>
      <el-form-item label="状态：" prop="status">
        <el-radio-group v-model="form.status">
          <el-radio :label="1">启用</el-radio>
          <el-radio :label="0">停用</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="推荐位选择：">
        <iep-select v-model="form.attributeId" :prefix-url="`cms/info_attribute/${siteId}`"></iep-select>
      </el-form-item>
      <el-form-item label="图片：" prop="image">
        <span slot="label">
          图片：
        </span>
        <!-- <iep-upload v-model="formData.attachFileList" :limit="limit"></iep-upload> -->

        <el-upload class="avatar-uploader" action="/api/admin/file/upload/avatar" :show-file-list="false" :headers="headers" :on-success="handleAvatarSuccess" :on-remove="handleRemove" accept="image/*">
          <iep-img v-if="form.image" :src="form.image" class="avatar"></iep-img>
          <i v-if="form.image" class="el-icon-circle-close" @click.stop="handleRemove"></i>
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>
      <el-form-item label="文章描述：">
        <el-input type="textarea" v-model="form.infoDescribe"></el-input>
      </el-form-item>
      <el-form-item label="文档内容：" prop="content">
        <iep-froala-editor v-model="form.content"></iep-froala-editor>
      </el-form-item>
    </el-form>
    <template slot="footer">
      <iep-button type="primary" plain @click="submitForm()">提交</iep-button>
      <iep-button @click="dialogShow=false">取消</iep-button>
    </template>
  </iep-dialog>
</template>
<script>
import { getPageById } from '@/api/conm/article_controller'
import { initForm, dictsMap, rules } from './options'
import formMixins from '@/mixins/formMixins'
import store from '@/store'
// import { mapGetters } from 'vuex'
export default {
  mixins: [formMixins],
  data () {
    return {
      dictsMap,
      dialogShow: false,
      formRequestFn: () => { },
      methodName: '创建',
      form: initForm(),
      rules,
      id: '',
      siteId: '',
      nodeId: '',
      headers: {
        Authorization: 'Bearer ' + store.getters.access_token,
      },
    }
  },
  // },
  created () {
    this.form.updateTime = this.createTimeDefault()
    // getInfoAttributePage(this.siteId).then((data) => {
    //   console.log(data)
    // })
    // console.log(this.siteId)
  },
  methods: {
    loadPage () {
      this.form = initForm()
      this.dialogShow = false
      this.$emit('load-page')
    },
    createTimeDefault () {
      let date = new Date()
      let y = date.getFullYear()
      let m = ((date.getMonth() + 1) < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1)
      let d = (date.getDate() < 10 ? '0' + date.getDate() : date.getDate())
      let h = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours())
      let mi = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes())
      let s = (date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds())
      return y + '-' + m + '-' + d + ' ' + h + ':' + mi + ':' + s

    },
    loadTypeList () {
      getPageById(this.id).then(({ data }) => {
        this.form = this.$mergeByFirst(this.form, data.data)
      })
    },
    handleAvatarSuccess (row) {
      // this.handleRemove()
      this.form.image = row.data.url
    },
    handleRemove () {
      this.form.image = ''
    },
    async submitForm () {
      this.formRequestFn({ id: this.id, nodeId: this.nodeId, ...this.form }).then(({ data }) => {
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