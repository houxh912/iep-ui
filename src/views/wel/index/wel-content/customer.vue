<template>
  <div class="customer">
    <div class="customer-nav">
      <nav-tab :nav-list="navList" @tab="tab"></nav-tab>
    </div>
    <div class="customer-content">
      <el-row v-for="(item,index) in dataList" :key="index">
        <el-col :span="8">
          <div class="grid-content bg-purple title">{{item.one.name}}<span class="start" v-if="item.one.start"><i class="el-icon-star-on"></i></span></div>
        </el-col>
        <el-col :span="8">
          <div class="grid-content bg-purple">{{item.two.name}}<span class="start" v-if="item.two.start"><i class="el-icon-star-on"></i></span></div>
        </el-col>
        <el-col :span="8">
          <div class="grid-content bg-purple">{{item.three.name}}<span class="start" v-if="item.three.start"><i class="el-icon-star-on"></i></span></div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import navTab from './navTab'
export default {
  components: { navTab },
  data () {
    return {
      dataList: {},
      navList: {
        title: 'process',
        dataList: [{
          subtitle: '对接客户',
          type: 'customer',
          id: 0,
        }, {
          subtitle: '合作专家',
          type: 'experts',
          id: 1,
        }],
      },
      contentData: {
        customer: [
          { one: { name: '中国工业集团', start: false }, two: { name: '中国工业集团', start: true }, three: { name: '中国工业集团', start: false } }, { one: { name: '中国工业集团', start: true }, two: { name: '中国工业集团', start: true }, three: { name: '中国工业集团', start: false } }, { one: { name: '中国工业集团', start: false }, two: { name: '中国工业集团', start: true }, three: { name: '中国工业集团', start: true } }, { one: { name: '中国工业集团', start: false }, two: { name: '中国工业集团', start: false }, three: { name: '中国工业集团', start: true } }, { one: { name: '中国工业集团', start: false }, two: { name: '中国工业集团', start: true }, three: { name: '中国工业集团', start: false } }],

        experts: [{ one: { name: '猪八戒', start: true }, two: { name: '猪八戒', start: true }, three: { name: '猪八戒', start: false } }, { one: { name: '猪八戒', start: true }, two: { name: '猪八戒', start: true }, three: { name: '猪八戒', start: false } }, { one: { name: '猪八戒', start: false }, two: { name: '猪八戒', start: true }, three: { name: '猪八戒', start: false } }, { one: { name: '猪八戒', start: true }, two: { name: '猪八戒', start: false }, three: { name: '猪八戒', start: false } }, { one: { name: '猪八戒', start: false }, two: { name: '猪八戒', start: true }, three: { name: '猪八戒', start: true } }],
      },
    }
  },
  created () {
    this.dataList = this.contentData.customer
  },
  methods: {
    tab (val) {
      this.dataList = this.contentData[val]
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
  }
  .customer-content {
    padding: 20px 0;
    font-size: 14px;
    .start {
      padding-left: 5px;
      font-size: 14px;
      color: #e4990f;
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
