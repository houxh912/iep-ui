<template>
  <div class="praise">
    <IepAppTabCard :title="labelTitle">
      <IepAppRankingCard :dataList="labelList" @click="handleDetail" grade="number"></IepAppRankingCard>
    </IepAppTabCard>
  </div>
</template>

<script>
import { getRankingThumbsUp } from '@/api/cpms/thoughts'
export default {
  data () {
    return {
      labelTitle: '本周点赞榜',
      labelList: [],
    }
  },
  methods: {
    handleDetail () {},
  },
  created () {
    getRankingThumbsUp().then(({ data }) => {
      this.labelList = data
    })
  },
}
</script>

<style scoped>
.praise >>> .el-card {
  height: 380px;
}
</style>
