<template>
  <el-upload class="avatar-uploader" action="/api/admin/file/upload/avatar" :headers="headers" :show-file-list="false" :on-success="handleAvatarSuccess" accept="image/*">
    <div class="no-avatar-wrapper">
      <a-avatar v-if="isShow" :size="64" shape="square" :src="value"></a-avatar>
      <a-avatar v-if="!isShow" shape="square" :size="64" icon="picture"></a-avatar>
      <div class="intro-text">图片尺寸 1080*640，.jpg 或 .png格式</div>
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
    handleAvatarSuccess (res) {
      this.$emit('input', res.data.url)
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
