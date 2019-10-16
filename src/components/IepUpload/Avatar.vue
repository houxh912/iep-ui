<template>
  <el-upload class="avatar-uploader" action="/api/admin/file/upload/avatar" :headers="headers" :show-file-list="false" :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload" accept="image/*">
    <div class="no-avatar-wrapper">
      <iep-img class="org-img" :src="value"></iep-img>
      <div class="intro-text">
        <div class="upload-text">点击上传</div>
        <div>建议上传300px * 300px的JPG图片</div>
      </div>
    </div>
  </el-upload>
</template>
<script>
import store from '@/store'
export default {
  name: 'IepAvatar',
  props: {
    value: {
      required: true,
      validator: prop => typeof prop === 'string' || prop === null,
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
    isShow () {
      if (this.value.startsWith('//')) return true
      else return false
    },
  },
  methods: {
    beforeAvatarUpload (file) {
      const isLt4M = file.size / 1024 / 1024 < 4
      if (!isLt4M) {
        this.$message.error('上传图片大小不能超过 4MB!')
      }
      return isLt4M
    },
    handleAvatarSuccess (file) {
      this.$emit('input', file.data.url)
    },
  },
}
</script>
<style lang="scss" scoped>
.org-img {
  height: 80px;
  width: 80px;
}
.avatar-uploader {
  border: none;
}
.avatar-uploader ::v-deep .el-upload {
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.no-avatar-wrapper {
  display: flex;
  align-items: center;
  .intro-text {
    display: flex;
    margin-left: 20px;
    font-size: 14px;
    color: #606266;
    flex-direction: column;
    align-items: flex-start;
    > div {
      line-height: 30px;
    }
    .upload-text {
      color: $--menu-color-primary;
    }
  }
}
</style>
