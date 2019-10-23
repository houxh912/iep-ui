<template>
  <div class="hottest">
    <IepAppRankingCard :dataList="list" @click="handleDetail" grade="thoughtsCount"></IepAppRankingCard>
  </div>
</template>

<script>
import { getMostThoughtsPage } from '@/api/cpms/thoughts'
export default {
  data () {
    return {
      list: [],
    }
  },
  methods: {
    handleDetail (row) {
      console.log(row)
      return
      // this.$router.push({ path: '/app/more_thoughts', query: {id: row.id} })
    },
    loadData () {
      getMostThoughtsPage().then(({ data }) => {
        this.list = data.data.records
      })
    },
  },
  created () {
    this.loadData()
  },
}
</script>
<style scoped>
</style>


