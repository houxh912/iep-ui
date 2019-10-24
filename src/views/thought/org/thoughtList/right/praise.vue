<template>
  <div class="praise">
    <IepAppTabCard :title="labelTitle">
      <IepAppRankingCard isReference :dataList="labelList" @click="handleDetail" grade="thumbedTimes" name="content"></IepAppRankingCard>
    </IepAppTabCard>
  </div>
</template>

<script>
import { getMostThumbedThoughtsWeeklyPage } from '@/api/cpms/thoughts'
export default {
  data () {
    return {
      labelTitle: '本周点赞榜',
      labelList: [],
    }
  },
  methods: {
    handleDetail (row) {
      console.log(row)
      return
      // this.$router.push(`/app/thought_detail/${row.id}`)
    },
    loadData () {
      getMostThumbedThoughtsWeeklyPage().then(({ data }) => {
        this.labelList = data.data.records
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
