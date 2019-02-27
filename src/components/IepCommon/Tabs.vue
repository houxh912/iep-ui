<template>
  <el-tabs v-bind="$attrs" v-on="$listeners">
    <el-tab-pane v-for="tab in tabList" :label="tab.label" :name="tab.value" :key="tab.value">
      <slot :name="tab.value"></slot>
    </el-tab-pane>
  </el-tabs>
</template>
<script>
export default {
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
