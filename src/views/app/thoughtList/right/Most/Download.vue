<template>
  <div class="download">
    <IepAppRankingCard :dataList="list" @click="handleDetail" grade="thoughtsCount"></IepAppRankingCard>
  </div>
</template>

<script>
import { getMostThoughtsWeekly } from '@/api/cpms/thoughts'
export default {
  data () {
    return {
      list: [],
    }
  },
  methods: {
    handleDetail (row) {
      this.$router.push(`/app/personal_style/${row.id}`)
    },
    loadData () {
      getMostThoughtsWeekly().then(({ data }) => {
        this.list = data.data
      })
    },
  },
  created () {
    this.loadData()
  },
}
</script>
<style lang="scss" scoped>
</style>


