<template>
  <div>
    <basic-container>
      <iep-page-header title="联盟配置"></iep-page-header>

      <el-row class="row-bg module" :gutter="20">
        <h3 class="item-title">已选模块
          <iep-tip class="el-icon-question" content="系统基础模块，不可移除"></iep-tip>
        </h3>
        <iep-no-data v-if="!masterModuleList.length"></iep-no-data>
        <iep-goms-module v-for="item in masterModuleList" :key="item.id" :item="item"></iep-goms-module>
      </el-row>

      <el-row class="row-bg module test-module" :gutter="20">
        <h3 class="item-title">试用模块
          <iep-tip class="el-icon-question" content="测试中的模块，可选择试用，测试阶段记录的数据可能会被清空"></iep-tip>
        </h3>
        <iep-no-data v-if="!testModuleList.length"></iep-no-data>
        <iep-goms-module v-for="item in testModuleList" :key="item.id" :item="item" is-test></iep-goms-module>
      </el-row>

    </basic-container>
  </div>
</template>
<script>
import mixins from '@/mixins/mixins'
import IepGomsModule from '@/views/goms/Components/module'
export default {
  components: { IepGomsModule },
  mixins: [mixins],
  data () {
    return {
      masterModuleList: [],
      testModuleList: [],
    }
  },
}
</script>
<style lang="scss" scoped>
.module {
  &:nth-child(3) {
    border-bottom: 1px solid #d7d7d7;
    padding-bottom: 20px;
  }
  width: 80%;
  text-align: center;
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
}
@media (max-width: 1169px) {
  .module {
    width: 100%;
  }
}
</style>
