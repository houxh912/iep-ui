<template>
  <div class="count">
    <el-tabs v-model="tabName" @tab-click="change">
      <el-tab-pane label="我的客户" name="myCustom">
        <my-custom-tab ref="myCustom"></my-custom-tab>
      </el-tab-pane>
      <el-tab-pane label="全部客户" name="allCustom">
        <all-custom-tab ref="allCustom"></all-custom-tab>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import MyCustomTab from './myCustom'
import AllCustomTab from './allCustom'
export default {
  name: 'count',
  components: { MyCustomTab, AllCustomTab },
  data () {
    return {
      tabName: 'myCustom',
    }
  },
  methods: {
    change () {},
  },
}
</script>

<style lang="scss" scoped>
.count {
  padding: 20px;
  background-color: #fff;
}
</style>
