<template>
  <div class="customer">
    <div class="customer-nav">
      <div>我的客户</div>
    </div>
    <div class="customer-content">
      <el-row>
        <el-col :span="6" v-for="(item,index) in tabList" :key="index">
          <div class="title" @click="handleDetail(item)">{{item.name}}</div>
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
      tabList: [],
    }
  },
  created () {
    getCustomerList().then((res) => {
      this.tabList = res.data.data
    })
  },
  methods: {
    handleDetail (row) {
      this.$router.push({
        path: '/crms_spa/customer_detail',
        query: {
          id: row.id,
          redirect: this.$route.fullPath,
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
