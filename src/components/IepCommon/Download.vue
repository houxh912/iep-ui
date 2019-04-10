<template>
  <div>
    <a-tag v-for="file in value" :key="file.url">{{file.name}}</a-tag>
  </div>
</template>
<script>
export default {
  name: 'IepDownload',
  props: {
    value: {
      type: Array,
      required: true,
    },
  },
}
</script>
