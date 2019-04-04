<template>
  <div class="contract">
    <div class="contract-nav">
      <div>我的合同</div>
    </div>
    <div class="contract-content">
      <el-row v-for="(item,index) in dataList" :key="index">
        <el-col :span="15">
          <div class="title">{{item.name}}</div>
        </el-col>
        <el-col :span="6">
          <div>{{item.status}}</div>
        </el-col>
        <el-col :span="3">
          <div>{{item.time |parseTime('{y}-{m}-{d}')}}</div>
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
  }
  .title {
    padding: 5px 0;
    cursor: pointer;
    &:hover {
      color: #cb3737;
    }
  }
}
</style>
