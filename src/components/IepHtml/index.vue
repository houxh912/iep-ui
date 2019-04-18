<template>
  <div class="app">
    <div v-html="value"></div>
  </div>
</template>
<script>
export default {
  name: 'IepHtml',
  props: {
    value: {
      type: String,
      required: true,
    },
  },
}
</script>
<style scoped>
.app >>> p[data-f-id="pbf"] {
  display: none !important;
}
</style>
