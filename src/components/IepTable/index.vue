<template>
  <div>
    <el-table class="table" v-loading="isLoadTable" :data="formatData" style="width: 100%;" @selection-change="handleSelectionChange" :header-cell-style="getRowClass" :row-style="showRow" v-bind="$attrs">
      <el-table-column v-if="isMutipleSelection" type="selection" width="55" :align="align">
      </el-table-column>
      <el-table-column v-if="isIndex" type="index" width="50" :align="align">
      </el-table-column>
      <!-- 为了实行点击查看的规定 -->
      <slot name="before-columns"></slot>
      <el-table-column :label="item.label" :width="item.width" :min-width="item.minWidth" v-for="(item, idx) in columnsMap" :key="idx" :align="align">
        <template slot-scope="scope">
          <!-- eslint-disable -->
          <span v-if="isTree && idx === 0" v-for="space in scope.row._level" class="ms-tree-space" :key="space"></span>
          <!-- eslint-enable -->
          <span class="tree-ctrl" v-if="isTree && iconShow(idx,scope.row)" @click="toggleExpanded(scope)">
            <i v-if="!scope.row._expanded" class="el-icon-caret-right"></i>
            <i v-else class="el-icon-caret-bottom"></i>
          </span>
          <div v-if="item.type==='dict'">
            <span>{{dictsMap[item.prop][scope.row[item.prop]]}}</span>
          </div>
          <div v-else>
            <span v-if="scope.row[item.prop] === 0">0</span>
            <span v-if="scope.row[item.prop] === null">{{ '暂无' }}</span>
            <span v-if="scope.row[item.prop]">{{scope.row[item.prop]}}</span>
          </div>
        </template>
      </el-table-column>
      <slot></slot>
    </el-table>
    <pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :pagination-option="pagination"></pagination>
  </div>
</template>

<script>
import Pagination from './Pagination'
import treeToArray from './eval'
export default {
  name: 'IepTable',
  inheritAttrs: false,
  props: {
    isLoadTable: {
      type: Boolean,
      required: true,
    },
    isMutipleSelection: {
      type: Boolean,
      required: false,
    },
    isTree: {
      type: Boolean,
      required: false,
    },
    isIndex: {
      type: Boolean,
      required: false,
    },
    pagination: {
      type: Object,
      required: true,
    },
    pagedTable: {
      type: Array,
      required: true,
    },
    columnsMap: {
      type: Array,
      required: false,
      default: () => [],
    },
    dictsMap: {
      type: Object,
      required: false,
      default: () => { },
    },
    align: {
      type: String,
      required: false,
      default: 'left',
    },
    evalFunc: {
      type: Function,
      default: null,
    },
    evalArgs: {
      type: Array,
      default: () => [],
    },
    expandAll: {
      type: Boolean,
      required: false,
      default: true,
    },
  },
  components: {
    Pagination,
  },
  data () {
    return {
    }
  },
  computed: {
    // 格式化数据源
    formatData () {
      let tmp
      if (!Array.isArray(this.pagedTable)) {
        tmp = [this.pagedTable]
      } else {
        tmp = this.pagedTable
      }
      const func = this.evalFunc || treeToArray
      const args = [tmp, this.expandAll]
      return func.apply(null, args)
    },
  },
  methods: {
    handleSizeChange (val) {
      this.$emit('size-change', val)
    },
    handleCurrentChange (val) {
      this.$emit('current-change', val)
    },
    handleSelectionChange (val) {
      this.$emit('selection-change', val)
    },
    getRowClass ({ rowIndex }) {
      if (rowIndex == 0) {
        return 'background:#F2F4F5;color:#000'
      } else {
        return ''
      }
    },
    showRow (row) {
      const show = row.row.parent
        ? row.row.parent._expanded && row.row.parent._show
        : true
      row.row._show = show
      return show
        ? 'animation:treeTableShow 1s;'
        : 'display:none;'
    },
    // 切换下级是否展开
    toggleExpanded (scope) {
      const record = this.formatData[scope.$index]
      record._expanded = !record._expanded
    },
    // 图标显示
    iconShow (index, record) {
      return index === 0 && record.children && record.children.length > 0
    },
  },
}
</script>
<style scoped>
.el-table >>> .el-checkbox__input.is-focus .el-checkbox__inner {
  border-color: #a5a5a5;
}
.el-table >>> .el-checkbox__inner:hover,
.el-table >>> .el-checkbox__inner:focus {
  border-color: #a5a5a5;
}
/* .el-table >>> .el-button--default.is-plain:nth-child(1) {
  border-color: #ea8d03;
  background-color: #fff7ec;
  color: #ea8d03;
} */
/* .el-table >>> .el-button--default.is-plain:nth-child(1):hover {
  border-color: #ea8d03;
  background-color: #ea8d03;
  color: #fff;
} */
.el-table >>> .el-button--default.is-plain:focus,
.el-table >>> .el-button--default.is-plain:hover {
  border-color: #ea8d03;
  background-color: #fff7ec;
  color: #ea8d03;
}
.el-table >>> .el-dropdown .el-button.is-plain:nth-child(1) {
  padding: 9px 10px;
  background: #fff;
  border: 1px solid #dcdfe6;
  border-color: #dcdfe6;
  color: #606266;
}
.el-table >>> .el-dropdown .el-button.is-plain:nth-child(1):focus,
.el-table >>> .el-dropdown .el-button.is-plain:nth-child(1):hover {
  border-color: #ea8d03;
  background-color: #fff7ec;
  color: #ea8d03;
}
.el-table >>> .cell .el-dropdown:nth-child(1) .el-button.is-plain:nth-child(1) {
  padding: 9px 10px;
  border-color: #ea8d03;
  background-color: #fff7ec;
  color: #ea8d03;
}
.el-table
  >>> .cell
  .el-dropdown:nth-child(1)
  .el-button.is-plain:nth-child(1):hover {
  background-color: #ea8d03 !important;
  color: #fff !important;
}
.el-table
  >>> .cell
  .el-dropdown:nth-child(1)
  .el-button.is-plain:nth-child(1):focus,
.el-table
  >>> .cell
  .el-dropdown:nth-child(1)
  .el-button.is-plain:nth-child(1):hover {
  border-color: #ea8d03;
  background-color: #fff7ec;
  color: #ea8d03;
}
.table >>> .th {
  background: #ccc;
}
.table >>> .ms-tree-space {
  position: relative;
  top: 1px;
  font-style: normal;
  font-weight: 400;
  line-height: 1;
  width: 18px;
  height: 14px;
}
.table >>> .cell {
  display: flex;
}
span.ms-tree-space {
  display: block;
}
.tree-ctrl {
  position: relative;
  cursor: pointer;
  color: #666;
  margin-left: -18px;
}
.el-table--fit .el-button--default:hover,
.el-table--fit .el-button--default:focus {
  border-color: #ea8d03;
  background-color: #fff7ec;
  color: #ea8d03;
}
.el-table >>> .el-button--text {
  color: #999;
}
.el-table >>> .el-button--text:hover {
  color: #666;
}

.el-table >>> .el-button:focus,
.el-table >>> .el-button:hover {
  border-color: #ea8d03;
  background-color: #fff7ec;
  color: #ea8d03;
}
</style>
