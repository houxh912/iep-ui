<template>
  <div>
    <el-badge :value="12" class="item">
      <iep-button icon="el-icon-phone-outline" plain>通知</iep-button>
    </el-badge>
    <el-badge :value="12" class="item">
      <iep-button icon="el-icon-bell" plain>消息</iep-button>
    </el-badge>
    <el-badge :value="12" class="item">
      <iep-button icon="el-icon-message" plain>邮件</iep-button>
    </el-badge>
  </div>
</template>
<script>
export default {
  data () {
    return {

    }
  },
}
</script>

<style lang="scss" scoped>
.item {
  margin-right: 20px;
}
</style>
