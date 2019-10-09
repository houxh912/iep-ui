<template>
  <div class="download">
    <IepAppRankingCard :dataList="list" @click="handleDetail" grade="thoughtsCount"></IepAppRankingCard>
  </div>
</template>

<script>
import { getMostThoughtsWeeklyPage } from '@/api/cpms/thoughts'
export default {
  data () {
    return {
      list: [],
    }
  },
  methods: {
    handleDetail (row) {
      this.$router.push({ path: '/app/more_thoughts', query: {id: row.id} })
    },
    loadData () {
      getMostThoughtsWeeklyPage().then(({ data }) => {
        this.list = data.data.records
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


