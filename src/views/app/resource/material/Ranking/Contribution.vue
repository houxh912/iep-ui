<template>
  <div class="contribution">
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
  methods: {
    handleDetail (row) {
      this.$router.push(`/app/personal_style/${row.id}`)
    },
  },
  created () {
    getContributeList().then(({data}) => {
      this.dataList = data.data.map((m) => {return {name: m.name, grade: m.value, id: m.id}})
      for (let index = 0; index < 3; ++index) {
        this.dataList[index].color = 'red'
      }
    })
  },
}
</script>


