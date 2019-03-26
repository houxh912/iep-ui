<template>
  <el-table :data="data" style="width: 100%" @selection-change="handleSelectionChange">
    <!-- 子级-开始 -->
    <el-table-column type="expand">
      <template slot-scope="scope">
        <el-table :data="scope.row.childrens" :show-header="false" :style="tableStyle" :row-style="rowStyle" v-if="scope.row.childrens.length>0"  @selection-change="childSelectionChange">
          <el-table-column width="48"></el-table-column>
          <el-table-column type="selection" width="55" class-name="child-column"></el-table-column>
          <el-table-column
            class-name="child-column"
            :label="option.props[0].label"
            :prop="option.props[0].prop">
            <template slot-scope="childScope">
              <slot v-if="option.props[0].slot" :name="option.props[0].prop" :scope="childScope.row" :index="`${scope.$index}-${childScope.$index}`"></slot>
              <div v-else>{{childScope.row[option.props[0].prop]}}</div>
            </template>
          </el-table-column>
          <el-table-column
            v-for="(item, index) in option.props.slice(1)"
            :key="index"
            :label="item.label"
            :prop="item.prop">
            <template slot-scope="childScope">
              <slot v-if="item.slot" :name="item.prop" :scope="childScope.row" :index="`${scope.$index}-${childScope.$index}`"></slot>
              <div v-else>{{childScope.row[item.prop]}}</div>
            </template>
          </el-table-column>
        </el-table>
        <div class="add-child" @click="handleChild(scope)">新增子分类</div>
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
        <slot v-if="item.slot" :name="item.prop" :scope="scope.row" :index="scope.$index"></slot>
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
      parentList: [],
      childList: [],
    }
  },
  methods: {
    handleSelectionChange (val) {
      this.parentList = val.map(m => m.id)
      this.$emit('selectChange', this.parentList.concat(this.childList))
    },
    childSelectionChange (val) {
      this.childList = val.map(m => m.id)
      this.$emit('selectChange', this.childList.concat(this.parentList))
    },
    handleChild (row) {
      this.$emit('handleChild', row)
    },
  },
}
</script>

<style lang="scss">
.add-child {
  height: 50px;
  color: #999;
  line-height: 50px;
  text-align: center;
  cursor: pointer;
}
.child-column {
  padding-left: 30px !important;
}
.el-table__expanded-cell {
  padding: 0 !important;
}
</style>
