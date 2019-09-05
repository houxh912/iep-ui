<template>
  <div class="praise">
    <IepAppTabCard :title="labelTitle">
      <IepAppRankingCard isReference :dataList="labelList" @click="handleDetail" grade="thumbedTimes" name="name"></IepAppRankingCard>
    </IepAppTabCard>
  </div>
</template>

<script>
import { getMostComments } from '@/api/cpms/thoughts'
export default {
  data () {
    return {
      labelTitle: '评论总数榜',
      labelList: [],
    }
  },
  methods: {
    handleDetail (row) {
      this.$router.push({ path: '/app/more_thoughts', query: {id: row.id} })
    },
    loadData () {
      getMostComments().then(({ data }) => {
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
