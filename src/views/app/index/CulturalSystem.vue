<template>
  <div class="honor">
    <IepAppTabCard :title="title" :linkName="linkName" isMore>
      <IepAppListCard :dataList="dataList.slice(0, 8)" name="material_name"></IepAppListCard>
    </IepAppTabCard>
  </div>
</template>

<script>
import { getMaterialList } from '@/api/app/mlms/'

export default {
  data () {
    return {
      title: '文化制度',
      dataList: [],
      linkName: '',
    }
  },
  methods: {
    loadList () {
      getMaterialList().then(({data}) => {
        this.dataList = data.data.gzzd ? data.data.gzzd : []
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
  height: 270px;
}
</style>
