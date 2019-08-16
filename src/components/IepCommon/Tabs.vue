<template>
  <el-tabs class="iep-tabs" v-bind="$attrs" v-on="$listeners">
    <el-tab-pane v-for="tab in tabList" :label="tab.label" :name="tab.value" :key="tab.value" :disabled="tab.disabled">
      <slot :name="tab.value"></slot>
    </el-tab-pane>
  </el-tabs>
</template>
<script>
export default {
  name: 'IepTabs',
  inheritAttrs: false,
  props: {
    tabList: {
      type: Array,
      default: () => [],
    },
  },
  data () {
    return {

    }
  },
}
</script>
<style lang="scss" scoped>
.iep-tabs ::v-deep .el-tabs__nav-wrap::after {
  height: 1px;
}
.iep-tabs ::v-deep .el-tabs__active-bar {
  background-color: $--color-primary;
}
.iep-tabs ::v-deep .el-tabs__item.is-active {
  color: $--color-primary;
}
.iep-tabs ::v-deep .el-tabs__item {
  font-size: 16px;
  height: 22px;
  line-height: 22px;
}
</style>
