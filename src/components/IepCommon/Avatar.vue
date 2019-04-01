<template>
  <el-upload class="avatar-uploader" action="/api/admin/file/upload/avatar" :headers="headers" :show-file-list="false" :on-success="handleAvatarSuccess">
    <div class="no-avatar-wrapper">
      <a-avatar v-if="value" :size="64" :src="avatarUrl"></a-avatar>
      <a-avatar v-else :size="64" icon="user"></a-avatar>
      <div class="intro-text">建议尺寸：300px * 300px 的等比图片</div>
    </div>
  </el-upload>
</template>
<script>
import { imgUrl } from '@/config/env'
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
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
</style>
<style lang="scss" scoped>
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
