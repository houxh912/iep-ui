<template>
  <div class="honor">
    <IepAppTabCard :title="title" :linkName="linkName" isMore>
      <IepAppListCard :dataList="dataList" name="honorQualName"></IepAppListCard>
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
