<template>
  <div class="download">
    <IepAppListCard :dataList="list"></IepAppListCard>
  </div>
</template>

<script>
export default {
  props: {
    list: {
      type: Array,
      default: () => {},
    },
  },
  data () {
    return {}
  },
}
</script>
<style lang="scss" scoped>
.download{
  padding: 0 20px 20px 20px;
}
</style>


