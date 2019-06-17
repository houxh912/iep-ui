<template>
  <div>
    <div v-for="item in value" :key="item.id">
      <el-link>{{item.name}}</el-link>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    value: {
      type: Array,
      default: () => [],
    },
  },
}
</script>
