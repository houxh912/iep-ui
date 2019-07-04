<template>
  <iep-dialog :dialog-show="dialogShow" title="新增" width="40%" @close="resetForm">
    
    <el-form :model="formData" :rules="rules" size="small" ref="form" label-width="120px" style="margin-bottom: 50px;" class="form-detail">
      <el-form-item label="上传图片：" prop="imageUrl">
        <el-upload
          class="avatar-uploader"
          action="/api/admin/file/upload/avatar"
          :show-file-list="false"
          :headers="headers"
          :on-success="handleAvatarSuccess"
          accept="image/*">
          <iep-img v-if="formData.imageUrl" :src="formData.imageUrl" class="avatar"></iep-img>
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>
      <el-form-item label="标题：" prop="title">
        <el-input v-model="formData.title" :maxlength="50"></el-input>
      </el-form-item>
      <el-form-item label="日期：" prop="publishTime">
        <IepDatePicker v-model="formData.publishTime"></IepDatePicker>
      </el-form-item>
      <el-form-item label="说明：" prop="synopsis">
        <el-input type="textarea" v-model="formData.synopsis" :maxlength="2000" :rows="5"></el-input>
      </el-form-item>

    </el-form>

    <template slot="footer">
      <iep-button type="primary" @click="submitForm('form')" v-loading="loadState">确定</iep-button>
      <iep-button @click="resetForm">取消</iep-button>
    </template>
  </iep-dialog>
</template>

<script>
import store from '@/store'
import { rules, initFormData } from './const'
import { orgCreate } from '@/api/goms/org_album'
import { mapGetters } from 'vuex'

export default {
  data () {
    return {
      dialogShow: false,
      rules,
      formData: initFormData(),
      loadState: false,
      headers: {
        Authorization: 'Bearer ' + store.getters.access_token,
      },
    }
  },
  computed: {
    ...mapGetters(['userInfo']),
  },
  methods: {
    open () {
      this.dialogShow = true
      this.formData.orgId = this.userInfo.orgId
    },
    resetForm (state = false) {
      this.formData.orgId = initFormData()
      this.dialogShow = false
      if (state) {
        this.$emit('load-page', state)
      }
    },
    submitForm () {
      console.log('a')
      this.$refs['form'].validate((valid) => {
        if (valid) {
          this.loadState = true
          orgCreate(this.formData).then(({ data }) => {
            this.loadState = false
            if (data.data) {
              this.$message({
                message: '新增成功！',
                type: 'success',
              })
              this.resetForm(true)
            } else {
              this.$message.error(data.msg)
            }
          })
        } else {
          return false
        }
      })
    },
    handleAvatarSuccess (row) {
      this.formData.imageUrl = row.data.url
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
  overflow: hidden;
}
.avatar-uploader:hover {
  border-color: #409EFF;
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
