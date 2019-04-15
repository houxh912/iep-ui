<template>
  <div class="material">
    <div class="material-nav">
      <div>推荐材料</div>
    </div>
    <div class="material-content">
      <iep-no-data v-if="!dataList.length" message="暂无材料"></iep-no-data>
      <el-row class="item" v-for="(item) in dataList" :key="item.id">
        <el-col :span="12">
          <div class="iep-ellipsis title" @click="handleDetail(item)">{{item.name}}</div>
        </el-col>
        <el-col :span="8">
          <iep-detail-tag :value="item.tagKeyWords"></iep-detail-tag>
        </el-col>
        <el-col :span="2">
          <iep-dict-detail :currentValue="item.materialType" dict-name="mlms_material_type" style="text-align: center;"></iep-dict-detail>
        </el-col>
        <el-col :span="2">
          <div style="text-align: center;">{{item.creatorRealName}}</div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import { getMaterials } from '@/api/wel/index'
export default {
  data () {
    return {
      dataList: [],
    }
  },
  created () {
    this.loadPage()
  },
  methods: {
    handleDetail (row) {
      this.$router.push({
        path: `/mlms_spa/material/detail/${row.id}`,
      })
    },
    loadPage () {
      getMaterials().then(({ data }) => {
        this.dataList = data.data
      })
    },
  },
}
</script>

<style lang="scss" scoped>
.material {
  padding: 15px 30px;
  padding-bottom: 0;
  border-bottom: 1px solid #eee;
  color: #5f5f5f;
  .item {
    padding: 5px 0;
  }
  .material-nav {
    display: flex;
    align-items: center;
    font-size: 16px;
  }
  .material-content {
    padding: 10px 0;
    font-size: 14px;
    .text-right {
      text-align: right;
    }
    .text-time {
      color: #999;
    }
  }
  .title {
    // padding: 5px 0;
    cursor: pointer;
    &:hover {
      color: #cb3737;
    }
  }
}
</style>
