<template>
  <div class="crms">
    <page-header title="客户"></page-header>
    <el-tabs v-model="tabName" @tab-click="change">
      <el-tab-pane label="全部客户" name="allCustom">
        <all-custom-tab v-if="tabName=='allCustom'" ref="allCustom"></all-custom-tab>
      </el-tab-pane>
      <el-tab-pane label="我的客户" name="myCustom">
        <my-custom-tab v-if="tabName=='myCustom'" ref="myCustom"></my-custom-tab>
      </el-tab-pane>
      <el-tab-pane label="协作客户" name="cooperation">
        <cooperation-tab v-if="tabName=='cooperation'" ref="cooperation"></cooperation-tab>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import mixins from '@/mixins/mixins'
import allCustomTab from './allCustom'
import myCustomTab from './myCustom'
import cooperationTab from './cooperation'

export default {
  name: 'Demand',
  mixins: [mixins],
  components: { allCustomTab, myCustomTab, cooperationTab },
  computed: {
  },
  data () {
    return {
      tabName: 'allCustom',
    }
  },
  methods: {
    change () {
      this.$nextTick(() => {
        this.$refs[this.tabName].loadPage()
      })
    },
  },
  mounted () {
    this.change()
  },
}
</script>

<style lang="scss" scoped>
.crms {
  padding: 20px;
  background-color: #fff;
}
</style>
