<template>
  <el-table :data="data" style="width: 100%" @selection-change="handleSelectionChange">
    <!-- 子级-开始 -->
    <el-table-column type="expand">
      <template slot-scope="scope">
        <el-table :data="scope.row.children" :show-header="false" :style="tableStyle" :row-style="rowStyle">
          <el-table-column width="48"></el-table-column>
          <el-table-column type="selection" width="55" class-name="child-column"></el-table-column>
          <el-table-column
            class-name="child-column"
            :label="option.props[0].label"
            :prop="option.props[0].prop">
          </el-table-column>
          <el-table-column
            v-for="(item, index) in option.props.slice(1)"
            :key="index"
            :label="item.label"
            :prop="item.prop">
            <template slot-scope="scope">
              <slot v-if="item.slot" :name="item.prop" :scope="scope.row"></slot>
              <div v-else>{{scope.row[item.prop]}}</div>
            </template>
          </el-table-column>
        </el-table>
      </template>
    </el-table-column>
    <!-- 子级-结束 -->
    <el-table-column type="selection" width="55"></el-table-column>
    <el-table-column
      v-for="(item, index) in option.props"
      :key="index"
      :label="item.label"
      :prop="item.prop">
      <template slot-scope="scope">
        <slot v-if="item.slot" :name="item.prop" :scope="scope.row"></slot>
        <div v-else>{{scope.row[item.prop]}}</div>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
export default {
  props: {
    data: {
      type: Array,
      default: () => {},
    },
    option: {
      type: Object,
      default: () => {},
    },
  },
  data () {
    return {
      tableStyle: {},
      rowStyle: {
      },
    }
  },
  methods: {
    handleSelectionChange () {},
  },
}
</script>

<style lang="scss">
.child-column {
  padding-left: 30px !important;
}
.el-table__expanded-cell {
  padding: 0 !important;
}
</style>
