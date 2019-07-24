<template>
  <div>
    <basic-container>
      <iep-page-header title="模块配置"></iep-page-header>
      <el-row class="row-bg module" :gutter="20">
        <h3 class="item-title">已选模块<span class="sub-title">系统基础模块，不可移除</span></h3>
        <el-col :span="6" class="module-item" v-for="item in masterModuleList" :key="item.id">
          <div class="module-con " :class="{'module-con-operable': item.enable}">
            <!-- <span class="btn"><i class="add el-icon-plus"></i></span> -->
            <iep-img class="img" :src="item.logo"></iep-img>
            <span class="text">{{item.name}}</span>
          </div>
        </el-col>
      </el-row>

      <el-row class="row-bg module test-module" :gutter="20">
        <h3 class="item-title">试用模块<span class="sub-title">测试中的模块，可选择试用，测试阶段记录的数据可能会被清空</span></h3>
        <el-col :span="6" class="module-item" v-for="item in releaseModuleList" :key="item.id">
          <div class="module-con module-con-operable">
            <!-- <span class="btn"><i class="add el-icon-plus"></i></span> -->
            <iep-img class="img" :src="item.logo"></iep-img>
            <span class="text">{{item.name}}</span>
          </div>
        </el-col>
      </el-row>
    </basic-container>
  </div>
</template>
<script>
import { getOrgModuleList } from '@/api/admin/module'
export default {
  data () {
    return {
      masterModuleList: [],
      releaseModuleList: [],
    }
  },
  created () {
    this.loadPage()
  },
  methods: {
    async loadPage () {
      const { data } = await getOrgModuleList()
      const modules = data.data
      this.masterModuleList = modules.filter(m => m.status === 1)
      this.releaseModuleList = modules.filter(m => m.status === 2)
    },
  },
}
</script>
<style lang="scss" scoped>
.img {
  width: 40px;
  height: 40px;
}
.module {
  &:nth-child(3) {
    border-bottom: 1px solid #d7d7d7;
    padding-bottom: 20px;
  }
  margin: 0 auto !important;
  width: 85%;
  text-align: center;
  .item-title {
    margin: 0 30px;
    font-size: 16px;
    font-weight: 400;
    text-align: left;
    .sub-title {
      margin-left: 20px;
      font-size: 14px;
      color: #888;
    }
  }
}
.module-item {
  display: inline-block;
  .module-con {
    position: relative;
    margin: 20px;
    padding: 15px;
    text-align: center;
    border: 1px solid #d7d7d7;
    border-radius: 3px;
    background-color: #fff;
    color: #d7d7d7;
    -webkit-transition: 0.1s;
    transition: 0.1s;
    .text {
      display: block;
      margin-top: 10px;
      font-size: 14px;
    }
  }
  .module-con-operable {
    &:hover {
      border-color: #bf051a;
      background-color: #fff2f4;
      color: #bf051a;
      .btn {
        border-color: #bf051a;
        background-color: #bf051a;
        .close,
        .add {
          color: #fff;
        }
      }
      .text {
        color: #bf051a;
      }
    }
    .text {
      color: #666;
    }
  }
}

.test-module {
  margin-top: 40px !important;
  .module-con {
    border-style: dashed;
    &:hover {
      border-style: solid;
      border-color: #dcdfe6;
      background-color: #f5f7fa;
      color: #909399;
      .text {
        color: #333;
      }
    }
  }
}
@media (max-width: 1169px) {
  .module {
    width: 100%;
  }
}
</style>
