<template>
  <el-upload class="avatar-uploader" action="/api/admin/file/upload/avatar" :headers="headers" :show-file-list="false" :on-success="handleAvatarSuccess">
    <img v-if="value" :src="avatarUrl" class="avatar" />
    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
  </el-upload>
</template>
<script>
import { imgUrl } from '@/config/env'
import store from '@/store'
export default {
  name: 'IepAvatar',
  props: {
    value: {
      type: String,
      required: true,
    },
  },
  data () {
    return {
      headers: {
        Authorization: 'Bearer ' + store.getters.access_token,
      },
    }
  },
  computed: {
    avatarUrl: {
      // getter
      get: function () {
        return imgUrl + this.value
      },
      // setter
      set: function (newValue) {
        const url = newValue.replace(imgUrl, '')
        this.$emit('input', url)
      },
    },
  },
  methods: {
    handleAvatarSuccess (res) {
      this.$emit('input', res.data.url)
      // console.log(res.data.url, file)
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
