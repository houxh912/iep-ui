<template>
  <div class="InstitutionalDocument">
    <iepAppTabCard :title="title">
      <IepAppListCard :dataList="dataList" @click="handleDetail"></IepAppListCard>
    </iepAppTabCard>
  </div>
</template>
<script>
import { getNewsList } from '@/api/app/mlms/index'
export default {
  data () {
    return {
      title: '产品动态',
      dataList: [],
    }
  },
  methods: {
    loadList () {
      // getNewsList().then(({ data }) => {
      //   this.dataList = data.data.gzzd ? data.data.gzzd.map((m) => { return { name: m.material_name, id: m.id } }) : []
      // })
      getNewsList().then(({ data }) => {
        this.dataList = data.data.slice(0, 8)
      })
    },
    handleDetail (row) {
      this.$router.push(`/app/resource/material/material_detail/${row.id}`)
    },
  },
  created () {
    this.loadList()
  },
}
</script>
<style scoped>
.InstitutionalDocument >>> .el-card {
  height: 330px;
}
</style>
