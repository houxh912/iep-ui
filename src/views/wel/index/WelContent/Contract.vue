<template>
  <div class="contract">
    <div class="contract-nav">
      <div>我的合同</div>
    </div>
    <iep-no-data v-if="!dataList.length" message="暂无内容"></iep-no-data>
    <div class="contract-content">
      <iep-no-data v-if="!dataList.length" message="暂无合同"></iep-no-data>
      <el-row class="item" v-for="(item,index) in dataList" :key="index">
        <el-col :span="10">
          <div>{{item.name}}</div>
        </el-col>
        <el-col :span="6">
          <div>{{item.businessContractType}}</div>
        </el-col>
        <el-col :span="6">
          <div>{{item.contractAmount}} w</div>
        </el-col>
        <el-col :span="2" class="text-right">
          <div>{{item.status}}</div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import { getContractList } from '@/api/wel/index'
export default {
  data () {
    return {
      dataList: [],
    }
  },
  created () {
    getContractList().then((res) => {
      this.dataList = res.data.data
    })
  },
  methods: {
  },
}
</script>

<style lang="scss" scoped>
.contract {
  padding: 15px 30px;
  padding-bottom: 0;
  border-bottom: 1px solid #eee;
  color: #5f5f5f;
  .contract-nav {
    display: flex;
    align-items: center;
    font-size: 16px;
  }
  .contract-content {
    padding: 10px 0;
    font-size: 14px;
    .item {
      padding: 5px 0;
    }
    .text-right {
      text-align: right;
    }
  }
}
</style>
