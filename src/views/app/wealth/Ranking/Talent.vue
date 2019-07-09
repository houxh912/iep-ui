<template>
  <div class="search">
    <IepAppRankingCard :dataList="dataList" @click="handleDetail"></IepAppRankingCard>
  </div>
</template>

<script>
import { getInvestmentList } from '@/api/app/mlms/'
export default {
  data () {
    return {
      dataList: [],
    }
  },
  methods:{
    handleDetail (row) {
      this.$router.push(`/app/personal_style/${row.id}`)
    },
  },
  created () {
    getInvestmentList().then(({data}) => {
      this.dataList = data.data.map(m => { return { id: m.id, name: m.name, grade: m.value } })
    })
  },
}
</script>


