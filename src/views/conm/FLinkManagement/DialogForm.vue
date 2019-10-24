<template>
  <iep-dialog :dialog-show="dialogShow" :title="`友情链接${methodName}`" width="700px" @close="loadPage">
    <el-form class="form-detail" :model="form" size="small" :rules="rules" label-width="120px">
      <el-form-item label="分类管理：" prop="typeId">
        <iep-select v-model="form.typeId" :prefix-url="`cms/info_friendlinktype/${siteId}`"></iep-select>
      </el-form-item>
      <el-form-item label="网站名称：" prop="name">
        <el-input v-model="form.name" maxlength="150" show-word-limit></el-input>
      </el-form-item>
      <el-form-item label="网站地址：" prop="url">
        <el-input v-model="form.url" maxlength="250" show-word-limit></el-input>
      </el-form-item>
      <el-form-item label="图片logo：">
        <span slot="label">
          图片logo：
        </span>
        <el-upload class="avatar-uploader" action="/api/admin/file/upload/avatar" :show-file-list="false" :headers="headers" :on-success="handleAvatarSuccess" :on-remove="handleRemove" accept="image/*">
          <iep-img v-if="form.logo" :src="form.logo" class="avatar"></iep-img>
          <i v-if="form.logo" class="el-icon-circle-close" @click.stop="handleRemove"></i>
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>
      <el-form-item label="站长email：">
        <el-input v-model="form.email" maxlength="150" show-word-limit></el-input>
      </el-form-item>
      <el-form-item label="网站描述：">
        <el-input v-model="form.description" type="textarea" maxlength="250" show-word-limit></el-input>
      </el-form-item>
      <iep-form-item label-name="推荐">
        <el-radio-group v-model="form.recommend">
          <el-radio v-for="(item,i) in dictsMap.recommend" :key="i" :label="+i">{{item}}</el-radio>
        </el-radio-group>
      </iep-form-item>
      <iep-form-item label-name="状态">
        <el-radio-group v-model="form.status">
          <el-radio v-for="(item,i) in dictsMap.status" :key="i" :label="+i">{{item}}</el-radio>
        </el-radio-group>
      </iep-form-item>
    </el-form>
    <template slot="footer">
      <iep-button type="primary" @click="submitForm()">提交</iep-button>
      <iep-button @click="dialogShow=false">取消</iep-button>
    </template>
  </iep-dialog>
</template>
<script>
import { getPageDetailById } from '@/api/conm/f_link_controller'
import { initForm, dictsMap, rules } from './options'
import formMixins from '@/mixins/formMixins'
import store from '@/store'
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
      id: 0,
      siteId: 0,
      headers: {
        Authorization: 'Bearer ' + store.getters.access_token,
      },
    }
  },
  created () {
    this.loadPage()
  },
  methods: {
    handleAvatarSuccess (row) {
      this.form.logo = row.data.url
    },
    handleRemove () {
      this.form.withLogo = ''
    },
    loadPage () {
      this.form = initForm()
      this.dialogShow = false
      this.$emit('load-page')
    },
    loadTypeList () {
      getPageDetailById(this.id).then(({ data }) => {
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