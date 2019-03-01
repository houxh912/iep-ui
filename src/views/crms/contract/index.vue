<template>
  <div class="contract">
    <page-header title="合同"></page-header>
    <el-tabs v-model="tabName" @tab-click="change">
      <el-tab-pane label="全部合同" name="allContract">
        <all-contract-tab v-if="tabName=='allContract'" ref="allContract"></all-contract-tab>
      </el-tab-pane>
      <el-tab-pane label="我的合同" name="myContract">
        <my-contract-tab v-if="tabName=='myContract'" ref="myContract"></my-contract-tab>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import mixins from '@/mixins/mixins'
import allContractTab from './allContract'
import myContractTab from './myContract'
export default {
  name: 'contract',
  components: { allContractTab, myContractTab },
  mixins: [ mixins ],
  data () {
    return {
      tabName: 'allContract',
    }
  },
  methods: {
    change () {},
  },
}
</script>

<style lang="scss" scoped>
.contract {
  padding: 20px;
  background-color: #fff;
}
</style>
