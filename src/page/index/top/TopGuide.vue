<template>
  <el-tooltip class="item" effect="dark" content="使用指南" placement="bottom">
    <iep-button @click="handleOpen()"><i class="el-icon-question"></i></iep-button>
  </el-tooltip>
</template>
<script>
export default {
  methods: {
    handleOpen () {
      this.$openPage('/app/resource/material/material_detail/7914')
    },
  },
}
</script>

<style lang="css" scoped>
.item >>> .el-badge__content.is-fixed {
  z-index: 1;
  top: 20px;
  right: 22px;
}
</style>
<style lang="scss" scoped>
button {
  border: 0;
  height: 60px;
  i {
    font-size: 20px;
  }
  &:focus,
  &:hover {
    background-color: #eee;
    color: #333;
  }
}
</style>
