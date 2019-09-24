<template>
  <wrapper title="推荐材料">
    <iep-no-data v-if="!listData.length"></iep-no-data>
    <div class="list-wrapper">
      <div class="list-item" v-for="item in listData" :key="item.id">
        <el-link class="iep-ellipsis" :title="item.name" @click="handleOpen(item)">{{item.name}}</el-link>
        <div class="info">
          <iep-tag-detail class="iep-ellipsis tag" :value="item.tagKeyWords.slice(0, 3)"></iep-tag-detail>
          <iep-dict-detail class="iep-ellipsis type" :value="item.materialType" dict-name="mlms_material_type"></iep-dict-detail>
          <div class="creator">{{item.creatorRealName}}</div>
        </div>
      </div>
    </div>
  </wrapper>
</template>

<script>
import Wrapper from './Wrapper'
import { getMaterials } from '@/api/wel/index'
export default {
  components: {
    Wrapper,
  },
  data () {
    return {
      listData: [],
    }
  },
  created () {
    this.loadPage()
  },
  methods: {
    async loadPage () {
      const { data } = await getMaterials()
      this.listData = data.data
    },
  },
}
</script>

<style lang="scss" scoped>
.list-wrapper {
  height: 100%;
  width: 100%;
}
.list-item {
  margin: 6px 0;
  display: flex;
  justify-content: space-between;
  .info {
    display: flex;
    flex: 0 0 400px;
    .tag {
      flex: 0 0 160px;
      text-align: right;
      width: 100%;
    }
    .type {
      flex: 0 0 160px;
      text-align: right;
      width: 100%;
    }
    .creator {
      flex: 0 0 80px;
      text-align: right;
      width: 100%;
    }
  }
}
</style>
