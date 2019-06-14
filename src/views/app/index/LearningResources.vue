<template>
  <div class="learning-resources">
    <IepAppTabCard :title="title" :linkName="linkName" isMore>
      <IepAppListCard :dataList="dataList.slice(0, 8)" name="material_name" @click="handleDetail"></IepAppListCard>
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
.learning-resources >>> .el-card__body {
  height: 270px;
}
</style>
