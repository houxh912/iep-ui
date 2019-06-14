<template>
  <div class="leader-board">
    <IepAppRankingCard :dataList="dataList" @click="handleDetail"></IepAppRankingCard>
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
  methods: {
    handleDetail (row) {
      this.$router.push(`/app/personal_style/${row.id}`)
    },
  },
}
</script>


