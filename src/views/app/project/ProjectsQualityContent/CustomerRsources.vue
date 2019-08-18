<template>
  <div class="recommendable">
    <IepAppTabCard :title="title" :linkName="linkName" isMore :data="data">
      <IepAppListCard :dataList="dataList" name="projectName" @click="handleDetail"></IepAppListCard>
    </IepAppTabCard>
  </div>
</template>

<script>
import { getClient } from '@/api/app/prms/'
export default {
  data () {
    return {
      data: '',
      title: '客户资源',
      dataList: [],
      linkName: '/app/resource/client',
    }
  },
  methods: {
    handleDetail (row) {
      this.$router.push(`/app/resource/client/client_detail/${row.id}`)
    },
  },
  created () {
    getClient().then(({ data }) => {
      this.dataList = data.data.records
    })
  },
}
</script>
<style scoped>
.recommendable >>> .el-card {
  height: 316px;
}
</style>
