<template>
  <iep-a-dialog :dialog-show="dialogShow" title="关于" width="40%" @cancel="handleClose" @ok="handleClose">
    <div class="about">
      <h3>项目名称: {{ BUILD_PRO_NAME }}({{ BUILD_VER_TAG }})</h3>
      <p>版本号: {{ BUILD_GIT_HASH }}</p>
      <p v-html="BUILD_PRO_DESC"></p>
      <p>最近更新日期: {{ BUILD_TIME | parseTime }}</p>
    </div>
  </iep-a-dialog>
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
