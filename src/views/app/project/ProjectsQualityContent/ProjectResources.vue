<template>
  <div class="recommendable">
    <IepAppTabCard :title="title" :linkName="linkName" isMore :data="data">
      <IepAppListCard :dataList="dataList" name="projectName" @click="handleDetail"></IepAppListCard>
    </IepAppTabCard>
  </div>
</template>

<script>
import { getProjectResources } from '@/api/app/prms/'
export default {
  data () {
    return {
      data: '',
      title: '项目资源',
      dataList: [],
      linkName: '/app/resource/material',
    }
  },
  methods: {
    handleDetail (row) {
      this.$router.push(`/app/resource/material/material_detail/${row.id}`)
    },
  },
  created () {
    getProjectResources().then(({ data }) => {
      this.dataList = data.data.records.slice(0, 8)
      this.data = `(${data.data.total}个)`
    })
  },
}
</script>

<style scoped>
.recommendable >>> .el-card {
  height: 316px;
}
</style>