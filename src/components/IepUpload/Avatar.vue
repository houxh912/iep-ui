<template>
  <el-upload class="avatar-uploader" action="/api/admin/file/upload/avatar" :headers="headers" :show-file-list="false" :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload" accept="image/*">
    <div class="no-avatar-wrapper">
      <a-avatar v-if="isShow" :size="64" shape="square" :src="value"></a-avatar>
      <a-avatar v-if="!isShow" shape="square" :size="64" icon="picture"></a-avatar>
      <div class="intro-text">建议尺寸：300px * 300px 的等比图片</div>
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
    margin-left: 20px;
    font-size: 14px;
    color: #606266;
  }
}
</style>
