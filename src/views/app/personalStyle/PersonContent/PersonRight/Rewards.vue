<template>
  <div class="mark">
    <IepAppTabCard :title="title">
      <div v-if="list.length !== 0"></div>
      <IepNoData v-else></IepNoData>
    </IepAppTabCard>
  </div>
</template>

<script>
import { getWealthFlowListById } from '@/api/fams/wealth_flow'

export default {
  data () {
    return {
      title: '奖惩记录',
      list: [],
    }
  },
  created () {
    getWealthFlowListById(this.$route.params.id).then(() => {})
  },
}
</script>
<style lang="scss" scoped>
.mark {
  margin-bottom: 30px;
}
</style>
