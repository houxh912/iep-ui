<template>
  <div class="baner">
    <IepAppTabCard :title="title" :linkName="linkName">
      <IepAppAssortCard :dataList="dataList" @click="handleDetail"></IepAppAssortCard>
    </IepAppTabCard>
  </div>
</template>

<script>
import { getNewsList } from '@/api/app/mlms/index'

export default {
  data () {
    return {
      title: '国脉动态',
      dataList: [],
      linkName: '',
    }
  },
  methods: {
    handleDetail (row) {
      this.$router.push(`/app/resource/material/material_detail/${row.id}`)
    },
  },
  created () {
    getNewsList().then(({ data }) => {
      this.dataList = data.data.map(m => { return { id: m.id, desc: m.name, assort: `【${m.secondClassName}】` } })
    })
  },
}
</script>
<style lang="css" scoped>
.baner >>> .assort .piece .assort {
  margin-left: -8px;
}
.baner >>> .el-card {
  height: 288px;
}
</style>
