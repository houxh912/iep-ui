<template>
  <div class="wrapper-box">
    <div class="title">
      <div>我的项目</div>
    </div>
    <iep-no-data v-if="!tableData.length"></iep-no-data>
    <div class="content">
      <el-row class="item" v-for="(item,index) in tableData" :key="index">
        <el-col :span="14">
          <div class="name iep-ellipsis" @click="handleDetail(item)">{{item.name}}</div>
        </el-col>
        <el-col :span="6">
          <iep-dict-detail :value="item.type" dict-name="prms_project_type"></iep-dict-detail>
        </el-col>
        <el-col :span="4" class="time">
          <div class="iep-ellipsis">{{item.time | parseToMonthDay}}</div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import { getProjectList } from '@/api/wel/index'
export default {
  data () {
    return {
      tableData: [],
    }
  },
  created () {
    getProjectList().then((res) => {
      this.tableData = res.data.data
    })
  },
  methods: {
    handleDetail (row) {
      this.$router.push({
        path: `/gpms_spa/project/detail/${row.id}`,
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
    color: #333;
  }
  .content {
    padding: 10px 0;
    font-size: 14px;
    .item {
      cursor: pointer;
      padding: 5px 0;
    }
    .name {
      margin-right: 10px;
      color: #333;
    }
    .time div {
      text-align: right;
      color: #999;
    }
  }
}
.el-row:hover .el-col .name {
  cursor: pointer;
  color: $--menu-color-primary;
}
</style>
