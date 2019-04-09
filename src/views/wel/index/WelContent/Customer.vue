<template>
  <div class="customer">
    <div class="customer-nav">
      <div>我的客户</div>
    </div>
    <div class="customer-content">
      <el-row class="item" v-for="(item,index) in tableData" :key="index">
        <el-col :span="6">
          <div class="title">{{item.customerName}}</div>
        </el-col>
        <el-col :span="4">
          <div>{{item.businessType}}</div>
        </el-col>
        <el-col :span="4">
          <div>{{item.disType}}</div>
        </el-col>
        <el-col :span="4">
          <div>{{item.relation}}</div>
        </el-col>
        <el-col :span="4">
          <div>{{item.status}}</div>
        </el-col>
        <el-col :span="2" class="time">
          <div>{{item.createTime}}</div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
// import { getCustomerList } from '@/api/wel/index'
export default {
  data () {
    return {
      type: '1',
      tableData: [
        {
          customerName: '中国电信股份有限公司',
          businessType: '软件',
          disType: '市级',
          relation: '重要客户',
          status: '待合作',
          createTime: '2019-3-25',
        },
        {
          customerName: '中国电信股份有限公司',
          businessType: '软件',
          disType: '市级',
          relation: '重要客户',
          status: '待合作',
          createTime: '2019-3-25',
        },
        {
          customerName: '中国电信股份有限公司',
          businessType: '软件',
          disType: '市级',
          relation: '重要客户',
          status: '待合作',
          createTime: '2019-3-25',
        },
      ],
    }
  },
  created () {
    // getCustomerList().then((res) => {
    //   this.tabList = res.data.data
    // })
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
      padding: 5px 0;
    }
    .time div {
      text-align: right;
    }
  }
  .title {
    cursor: pointer;
    &:hover {
      color: #cb3737;
    }
  }
}
</style>
