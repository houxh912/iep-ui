<template>
  <div class="customer">
    <div class="customer-nav">
      <div>我的客户</div>
    </div>
    <div class="customer-content">
      <el-row>
        <el-col :span="6" v-for="(item,index) in tabList" :key="index">
          <div class="title">{{item.name}}</div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import { getCustomerPage } from '@/api/wel/crms/customer'
export default {
  data () {
    return {
      type: '1',
      tabList: [],
    }
  },
  created () {
    getCustomerPage().then((res) => {
      this.tabList = res.data.data
    })
  },
  methods: {


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
