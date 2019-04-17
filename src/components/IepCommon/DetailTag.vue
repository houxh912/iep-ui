<template>
  <span>
    <span v-if="!value.length">
      <a-tag>无</a-tag>
    </span>
    <span v-else v-for="(item,index) in value" :key="index">
      <a-tag>{{item}}</a-tag>
    </span>
  </span>
</template>
<script>
export default {
  name: 'IepDetailTag',
  props: {
    value: {
      type: Array,
      required: true,
      default: () => [],
    },
  },
}
</script>
