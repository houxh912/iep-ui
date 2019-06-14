<template>
  <div class="hottest">
    <IepAppListCard :dataList="list" @click="handleDetail"></IepAppListCard>
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
  methods: {
    handleDetail (row) {
      this.$router.push(`/app/resource/material/material_detail/${row.id}`)
    },
  },
}
</script>
<style lang="scss" scoped>
</style>


