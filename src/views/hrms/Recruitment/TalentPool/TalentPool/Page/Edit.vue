<template>
  <div>
    <!-- fixed footer toolbar -->
    <footer-tool-bar :style="{ width: `calc(100% - 288px)`}">
      <iep-button type="info" @click="handleGoBack">返回</iep-button>
      <iep-button type="primary">提交</iep-button>
    </footer-tool-bar>
  </div>
</template>
<script>
import FooterToolBar from '@/components/FooterToolbar'
export default {
  components: { FooterToolBar },
  methods: {
    handleGoBack () {
      this.$emit('onGoBack')
    },
  },
}
</script>
