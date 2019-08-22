<template>
  <div>
    <basic-container>
      <iep-page-header title="模块配置"></iep-page-header>

      <el-row class="row-bg" :gutter="20">
        <h3 class="item-title">已选模块
          <iep-tip class="el-icon-question" content="系统基础模块，不可移除"></iep-tip>
        </h3>
        <div class="module">
          <iep-no-data v-if="!masterModuleList.length"></iep-no-data>
          <iep-goms-module v-for="item in masterModuleList" :key="item.id" :item="item"></iep-goms-module>
        </div>
      </el-row>

      <el-row class="row-bg module test-module" :gutter="20">
        <h3 class="item-title">试用模块
          <iep-tip class="el-icon-question" content="测试中的模块，可选择试用，测试阶段记录的数据可能会被清空"></iep-tip>
        </h3>
        <div class="module">
          <iep-no-data v-if="!releaseModuleList.length"></iep-no-data>
          <iep-goms-module v-for="item in releaseModuleList" :key="item.id" :item="item" :is-test="1"></iep-goms-module>
        </div>
      </el-row>

    </basic-container>
  </div>
</template>
<script>
import { getOrgModuleList } from '@/api/admin/module'
import IepGomsModule from '@/views/goms/Components/module'
export default {
  components: { IepGomsModule },
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
.item-title {
  margin: 0 30px;
  font-size: 16px;
  font-weight: 400;
  text-align: left;
  i {
    margin-left: 5px;
    font-size: 14px;
    color: #999;
  }
}
.module {
  &:nth-child(3) {
    border-bottom: 1px solid #d7d7d7;
    padding-bottom: 20px;
  }
  margin-left: 40px;
  width: 80%;
}
</style>
