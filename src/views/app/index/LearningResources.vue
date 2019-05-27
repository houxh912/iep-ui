<template>
  <div class="learning-resources">
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
      title: '学习资源',
      dataList: [],
      linkName: '/app/resource/material',
    }
  },
  methods: {
    loadList () {
      getMaterialList().then(({data}) => {
        this.dataList = data.data.rlxx ? data.data.rlxx : []
      })
    },
  },
  created () {
    this.loadList()
  },
}
</script>
<style scoped>
.learning-resources >>> .el-card__body {
  height: 270px;
}
</style>
