<template>
  <div class="leader-board">
    <IepAppRankingCard :dataList="dataList"></IepAppRankingCard>
  </div>
</template>

<script>
import { getContributeList } from '@/api/app/mlms/index'
export default {
  data () {
    return {
      dataList: [],
    }
  },
  created () {
    getContributeList().then(({data}) => {
      this.dataList = data.data.map((m) => {return {name: m.name, grade: m.value, id: m.id}})
    })
  },
}
</script>


