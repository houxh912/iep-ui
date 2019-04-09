<template>
  <vue-neditor-wrap class="neditor" v-model="content" :config="myConfig" :destroy="false" @ready="ready">

  </vue-neditor-wrap>
</template>

<script>
import VueNeditorWrap from 'vue-neditor-wrap'

export default {
  name: 'IepEditor',
  components: {
    VueNeditorWrap,
  },
  props: {
    value: {
      type: String,
      require: true,
      default: '',
    },
    disabled: {
      type: Boolean,
      require: false,
    },
  },
  data () {
    return {
      myConfig: {
        // 如果需要上传功能,找后端小伙伴要服务器接口地址
        // serverUrl: '/api/admin/upload/uploadAvatar',
        // 你的UEditor资源存放的路径,相对于打包后的index.html
        UEDITOR_HOME_URL: '/NEditor/',
        // 编辑器不自动被内容撑高
        autoHeightEnabled: false,
        // 初始容器高度
        initialFrameWidth: '100%',
        // 关闭自动保存
        enableAutoSave: false,
      },
    }
  },
  computed: {
    content: {
      // getter
      get: function () {
        return this.value
      },
      // setter
      set: function (value) {
        this.$emit('input', value)
      },
    },
  },
}
</script>
<style>
.neditor .edui-editor {
  z-index: 9 !important;
}
</style>

