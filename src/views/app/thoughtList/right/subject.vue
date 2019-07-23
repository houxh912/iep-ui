<template>
  <div class="subject">
    <IepAppTabCard :title="labelTitle">
      <IepAppRankingCard :dataList="labelList" @click="handleDetail" name="topic"></IepAppRankingCard>
    </IepAppTabCard>
  </div>
</template>

<script>
import { getHotTopics } from '@/api/cpms/thoughts'
export default {
  data () {
    return {
      labelTitle: '热门话题榜',
      labelList: [],
    }
  },
  methods: {
    handleDetail () {},
    loadData () {
      getHotTopics().then(({ data }) => {
        this.labelList = data.data
      })
    },
  },
  created () {
    this.loadData()
  },
}
</script>

<style scoped>
.subject >>> .el-card {
  height: 380px;
}
</style>
