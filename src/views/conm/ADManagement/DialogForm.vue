<template>
  <iep-dialog :dialog-show="dialogShow" :title="`广告${methodName}`" width="700px" @close="loadPage">
    <el-form class="form-detail" :model="form" size="small" :rules="rules" label-width="120px">
      <el-form-item label="站点id：">
        <el-input v-model="siteId" disabled></el-input>
      </el-form-item>
      <el-form-item label="广告位：">
        <iep-select v-model="form.adslotId" :prefix-url="`cms/info_adslot/${siteId}`"></iep-select>
      </el-form-item>
      <el-form-item label="广告名称：" prop="name">
        <el-input v-model="form.name" maxlength="150" show-word-limit></el-input>
      </el-form-item>
      <el-form-item label="开始时间：" prop="beginDate">
        <iep-date-picker v-model="form.beginDate" type="date" placeholder="选择日期">
        </iep-date-picker>
      </el-form-item>
      <el-form-item label="结束时间：">
        <iep-date-picker v-model="form.endDate" type="date" placeholder="选择日期">
        </iep-date-picker>
      </el-form-item>
      <el-form-item label="广告url：">
        <el-input v-model="form.url" maxlength="250" show-word-limit></el-input>
      </el-form-item>
      <el-form-item label="广告文字：">
        <el-input v-model="form.text" type="textarea" maxlength="250" show-word-limit></el-input>
      </el-form-item>
      <el-form-item label="广告图片：">
        <span slot="label">
          广告图片：
        </span>
        <!-- <iep-upload v-model="formData.attachFileList" :limit="limit"></iep-upload> -->

        <el-upload class="avatar-uploader" action="/api/admin/file/upload/avatar" :show-file-list="false" :headers="headers" :on-success="handleAvatarSuccess" :on-remove="handleRemove" accept="image/*">
          <iep-img v-if="form.image" :src="form.image" class="avatar"></iep-img>
          <i v-if="form.image" class="el-icon-circle-close" @click.stop="handleRemove"></i>
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>
      <el-form-item label="排序：">
        <el-input-number v-model="form.seq" :step="2" :min="1"></el-input-number>
      </el-form-item>
    </el-form>
    <template slot="footer">
      <iep-button type="primary" @click="submitForm()">提交</iep-button>
      <iep-button @click="dialogShow=false">取消</iep-button>
    </template>
  </iep-dialog>
</template>
<script>
import { getPageDetailById } from '@/api/conm/ad_controller'
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
      id: 0,
      siteId: 0,
      headers: {
        Authorization: 'Bearer ' + store.getters.access_token,
      },
    }
  },
  // },
  created () {
    this.loadPage()
  },
  methods: {
    handleAvatarSuccess (row) {
      // this.handleRemove()
      this.form.image = row.data.url
    },
    handleRemove () {
      this.form.image = ''
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