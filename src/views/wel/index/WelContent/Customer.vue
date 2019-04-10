<template>
  <div class="customer">
    <div class="customer-nav">
      <div>我的客户</div>
    </div>
    <iep-no-data v-if="!tableData.length" message="暂无客户"></iep-no-data>
    <div class="customer-content">
      <el-row class="item" v-for="(item,index) in tableData" :key="index">
        <el-col :span="7">
          <div class="name grid-content" @click="handleDetail(item)">{{item.name}}</div>
        </el-col>
        <el-col :span="7">
          <iep-detail-tag :value="item.businessType" class="grid-content"></iep-detail-tag>
        </el-col>
        <el-col :span="2">
          <div class="grid-content">{{item.districtType}}</div>
        </el-col>
        <el-col :span="3">
          <div class="grid-content">{{item.clientRela}}</div>
        </el-col>
        <el-col :span="3">
          <div class="grid-content">{{item.followUpStatus}}</div>
        </el-col>
        <el-col :span="2" class="time">
          <div class="grid-content">{{item.time | parseTime('{m}-{d}')}}</div>
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
      type: '1',
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
        path: '/crms_spa/customer_detail',
        query: {
          id: row.id,
        },
      })
    },
    dealData (val) {
      return val.join('，')
    },
  },
}
</script>

<style lang="scss" scoped>
.customer {
  padding: 20px 30px;
  padding-bottom: 0;
  border-bottom: 1px solid #eee;
  color: #5f5f5f;
  .customer-nav {
    display: flex;
    align-items: center;
    font-size: 16px;
  }
  .customer-content {
    padding: 10px 0;
    font-size: 14px;
    .item {
      cursor: pointer;
      padding: 5px 0;
    }
    .time div {
      text-align: right;
    }
  }
}
.business {
  padding: 0 5px;
  &:after {
    content: "，";
    position: absolute;
  }
  &:last-child {
    content: "222";
    position: absolute;
  }
}
.el-row:hover .el-col .name {
  cursor: pointer;
  color: #cb3737;
}
.grid-content {
  min-height: 24px;
}
</style>
