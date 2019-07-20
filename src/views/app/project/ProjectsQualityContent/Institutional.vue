<template>
  <div class="institutional">
    <IepAppTabCard :title="title" :linkName="linkName">
      <IepAppListCard :dataList="dataList" @click="handleDetail" name="material_name"></IepAppListCard>
    </IepAppTabCard>
  </div>
</template>

<script>
import { getMaterialList } from '@/api/app/mlms/'

export default {
  data () {
    return {
      title: '制度文件',
      dataList: [],
      linkName: '',
    }
  },
  methods: {
    loadList () {
      getMaterialList().then(({ data }) => {
        this.dataList = data.data.gzzd ? data.data.gzzd.slice(0, 8) : []
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
.institutional >>> .el-card {
  height: 316px;
}
</style>
