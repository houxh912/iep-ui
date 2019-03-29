<template>
  <iep-dialog :dialog-show="dialogShow" title="关于" width="40%" @close="handleClose">
    <div class="about">
      <h3>项目名: {{ BUILD_PRO_NAME }}({{ BUILD_VER_TAG }})</h3>
      <p>版本: {{ BUILD_GIT_HASH }}</p>
      <p v-html="BUILD_PRO_DESC"></p>
      <p>构建于: {{ BUILD_TIME | parseTime }}</p>
    </div>
  </iep-dialog>
</template>
<script>
export default {
  data () {
    return {
      dialogShow: false,
      // eslint-disable-next-line
      BUILD_PRO_NAME: BUILD_PRO_NAME,
      // eslint-disable-next-line
      BUILD_VER_TAG: BUILD_VER_TAG,
      // eslint-disable-next-line
      BUILD_PRO_DESC: BUILD_PRO_DESC,
      // eslint-disable-next-line
      BUILD_GIT_HASH: BUILD_GIT_HASH,
      // eslint-disable-next-line
      BUILD_TIME: BUILD_TIME,
    }
  },
  methods: {
    handleClose () {
      this.dialogShow = false
    },
  },
}
</script>
