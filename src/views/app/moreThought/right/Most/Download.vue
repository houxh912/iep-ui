<template>
  <div class="download">
    <IepAppRankingCard :dataList="list" @click="handleDetail" grade="value"></IepAppRankingCard>
  </div>
</template>

<script>
export default {
  data () {
    return {
      list: [],
    }
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


