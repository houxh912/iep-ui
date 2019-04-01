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
          <div class="grid-content bg-purple title">{{item.two.name}}<span class="start" v-if="item.two.start"><i class="el-icon-star-on"></i></span></div>
        </el-col>
        <el-col :span="8">
          <div class="grid-content bg-purple title">{{item.three.name}}<span class="start" v-if="item.three.start"><i class="el-icon-star-on"></i></span></div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import NavTab from './NavTab'
export default {
  components: { NavTab },
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
          { one: { name: '大余县行政服务中心', start: false }, two: { name: '赣州市大数据局', start: true }, three: { name: '湖南省工商联', start: false } }, { one: { name: '湖南省人大信息技术中心', start: true }, two: { name: '上饶市委市政府电子政务办', start: true }, three: { name: '珠山区政务信息中心', start: false } }, { one: { name: '昌江区信息中心', start: false }, two: { name: '乐平市信息中心', start: true }, three: { name: '广东省政务服务数据管理局指导监督组', start: true } }, { one: { name: '景德镇市政务信息化管理局', start: false }, two: { name: '庐山管理局信息办', start: false }, three: { name: '吉州区信息中心', start: true } }, { one: { name: '抚州市政务信息化工作办公室', start: false }, two: { name: '湖南省人民政府国有资产监督管理委员', start: true }, three: { name: '浮梁县信息中心', start: false } }],

        experts: [{ one: { name: '张靖笙', start: true }, two: { name: '张启祥', start: true }, three: { name: '田景熙', start: false } }, { one: { name: '吕本富', start: true }, two: { name: '詹长智', start: true }, three: { name: '李绍俊', start: false } }, { one: { name: '江楠', start: false }, two: { name: '范彦斌', start: true }, three: { name: '梁精明', start: false } }, { one: { name: '杨兆华', start: true }, two: { name: '陈宏武', start: false }, three: { name: '罗先录', start: false } }, { one: { name: '陈灿华', start: false }, two: { name: '李军', start: true }, three: { name: '王金平', start: true } }],
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
    padding: 10px 0;
    font-size: 14px;
    .start {
      padding-left: 5px;
      font-size: 14px;
      color: #e4990f;
    }
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
