<template>
  <IepAppTabCard :title="labelTitle">
    <iep-no-data v-if="!tagList.length"></iep-no-data>
    <IepAppLabelCard :dataList="tagList.map(m => m.commonName)"></IepAppLabelCard>
  </IepAppTabCard>
</template>
<script>
import { getTagViewById } from '@/api/tms/tag'
export default {
  name: 'AboutTags',
  data () {
    return {
      labelTitle: '相关标签',
      tagList: [],
    }
  },
  created () {
    this.loadPage()
  },
  methods: {
    async loadPage () {
      const { data } = await getTagViewById(this.$route.params.id)
      this.tagList = data.data.tagList
    },
  },
}
</script>
<style lang="scss" scoped>
.el-card {
  border: 0;
}
.library {
  padding: 0 20px;
  border-right: 1px solid #ebeef5;
}
</style>
<style scoped>
.el-card >>> .title {
  font-size: 18px;
}
</style>
