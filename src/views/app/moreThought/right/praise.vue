<template>
  <div class="praise">
    <IepAppTabCard :title="labelTitle">
      <IepAppRankingCard :dataList="labelList" @click="handleDetail"></IepAppRankingCard>
    </IepAppTabCard>
  </div>
</template>

<script>
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
}
</script>
