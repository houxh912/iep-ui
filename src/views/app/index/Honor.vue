<template>
  <div class="honor">
    <IepAppTabCard :title="title" :linkName="linkName" isMore>
      <IepAppListCard :dataList="dataList" name="honorQualName" @clicked="handleDetail"></IepAppListCard>
    </IepAppTabCard>
  </div>
</template>

<script>
import { getHonorPage } from '@/api/app/mlms/honor'

export default {
  data () {
    return {
      title: '荣誉资质',
      dataList: [],
      linkName: '/app/resource/qualification',
    }
  },
  methods: {
    handleDetail (row) {
      this.$router.push(`/mlms_spa/aptitude/detail/${row.id}`)
    },
    loadList () {
      getHonorPage().then(({data}) => {
        this.dataList = data.data.records
      })
    },
  },
  created () {
    this.loadList()
  },
}
</script>
<style scoped>
.honor >>> .el-card__body {
  height: 332px;
}
</style>
