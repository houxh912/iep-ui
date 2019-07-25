<template>
  <div class="hottest">
    <IepAppRankingCard :dataList="list" @click="handleDetail" grade="thoughtsCount"></IepAppRankingCard>
  </div>
</template>

<script>
import { getMostThoughts } from '@/api/cpms/thoughts'
export default {
  data () {
    return {
      list: [],
    }
  },
  methods: {
    handleDetail (row) {
      this.$router.push({ path: '/app/more_thought', query: {id: row.id} })
    },
    loadData () {
      getMostThoughts().then(({ data }) => {
        this.list = data.data
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


