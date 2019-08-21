<template>
  <div class="praise">
    <IepAppTabCard :title="labelTitle">
      <IepAppRankingCard isReference :dataList="labelList" @click="handleDetail" grade="thumbedTimes" name="content"></IepAppRankingCard>
    </IepAppTabCard>
  </div>
</template>

<script>
import { getMostThumbedThoughtsWeekly } from '@/api/cpms/thoughts'
export default {
  data () {
    return {
      labelTitle: '本周点赞榜',
      labelList: [],
    }
  },
  methods: {
    handleDetail (row) {
      this.$router.push(`/app/thought_detail/${row.id}`)
    },
    loadData () {
      getMostThumbedThoughtsWeekly().then(({ data }) => {
        this.labelList = data.data.slice(0, 10)
      })
    },
  },
  created () {
    this.loadData()
  },
}
</script>

<style scoped>
.praise >>> .el-card {
  height: 380px;
}
</style>
