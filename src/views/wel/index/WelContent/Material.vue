<template>
  <div class="material">
    <div class="material-nav">
      <div>推荐材料</div>
    </div>
    <div class="material-content">
      <el-row class="item" v-for="(item) in dataList" :key="item.id">
        <el-col :span="8">
          <div class="grid-content title">{{item.name}}</div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content">{{item.type === 1 ? '外部材料' : '内部材料'}}</div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content">{{item.creatorRealName}}</div>
        </el-col>
        <el-col :span="4">
          <div class="grid-content text-right text-time">{{item.createTime}}</div>
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
    loadPage () {
      getMaterials().then(({ data }) => {
        this.dataList = data.data
        console.log(data.data)
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
