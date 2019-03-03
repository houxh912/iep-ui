<template>
  <el-upload class="avatar-uploader" action="/api/admin/file/upload" :headers="headers" :show-file-list="false" :on-success="handleAvatarSuccess">
    <img :id="className" v-if="avatar" :src="avatarUrl" class="avatar" />
    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
  </el-upload>
</template>
<script>
import store from '@/store'
import { handleImg } from '@/util/util'
export default {
  props: {
    avatar: {
      type: String,
      required: true,
    },
  },
  data () {
    return {
      headers: {
        Authorization: 'Bearer ' + store.getters.access_token,
      },
      avatarUrl: this.avatar,
      className: this.generateName(this.avatar),
    }
  },
  created () {
    handleImg(this.avatar, 'avatar')
  },
  methods: {
    handleAvatarSuccess (res, file) {
      this.avatarUrl = URL.createObjectURL(file.raw)
      this.ruleForm2.avatar = res.data.bucketName + '-' + res.data.fileName
    },
    generateName (avatar) {
      return avatar.split('.')[0].split('-')[1]
    },
  },
  watch: {
    avatarUrl (n) {
      this.avatarUrl = n
      this.className = this.generateName(n)
      handleImg(this.avatarUrl, this.className)
    },
  },
}
</script>
<style scoped>
.avatar-uploader >>> .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader >>> .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px !important;
  color: #8c939d !important;
  width: 178px !important;
  height: 178px !important;
  line-height: 178px !important;
  text-align: center !important;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>
