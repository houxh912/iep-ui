<template>
  <div class="wrapper-box">
    <div class="title">
      <div>我的项目</div>
    </div>
    <iep-no-data v-if="!tableData.length" message="暂无项目"></iep-no-data>
    <div class="content">
      <el-row class="item" v-for="(item,index) in tableData" :key="index">
        <el-col :span="12">
          <div class="name iep-ellipsis" @click="handleDetail(item)">{{item.name}}</div>
        </el-col>
        <el-col :span="8">
          <iep-tag-detail :value="item.businessType" class="iep-ellipsis"></iep-tag-detail>
        </el-col>
        <el-col :span="4" class="time">
          <div class="iep-ellipsis">{{item.time | parseToMonthDay}}</div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import { getCustomerList } from '@/api/wel/index'
export default {
  data () {
    return {
      tableData: [],
    }
  },
  created () {
    getCustomerList().then((res) => {
      this.tableData = res.data.data
    })
  },
  methods: {
    handleDetail (row) {
      this.$router.push({
        path: `/crms_spa/customer_detail/${row.id}`,
      })
    },
  },
}
</script>

<style lang="scss" scoped>
.wrapper-box {
  padding: 20px 30px;
  padding-bottom: 0;
  border-bottom: 1px solid #eee;
  color: #5f5f5f;
  .title {
    display: flex;
    align-items: center;
    font-size: 16px;
    color: #000;
  }
  .content {
    padding: 10px 0;
    font-size: 14px;
    .item {
      cursor: pointer;
      padding: 5px 0;
    }
    .time div {
      text-align: right;
      color: #999;
    }
  }
}
.el-row:hover .el-col .name {
  cursor: pointer;
  color: #cb3737;
}
</style>
