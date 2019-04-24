<template>
  <div>
    <el-table class="table" v-loading="isLoadTable" :data="formatData" style="width: 100%;" @selection-change="handleSelectionChange" :header-cell-style="getRowClass" :cell-class-name="cellClassName" :row-style="showRow" v-bind="$attrs" @row-click="rowClick">
      <el-table-column v-if="isMutipleSelection" type="selection" :selectable="checkboxInit" width="55" :align="align">
      </el-table-column>
      <el-table-column v-if="isIndex" type="index" width="50" :align="align">
      </el-table-column>
      <!-- 为了实行点击查看的规定 -->
      <slot name="before-columns"></slot>
      <el-table-column :label="item.label" :width="item.width" :min-width="item.minWidth" v-for="(item, idx) in columnsMap" :key="idx" :align="align">
        <template slot-scope="scope">
          <template v-if="isTree && idx === 0">
            <span v-for="space in scope.row._level" class="ms-tree-space" :key="space"></span>
          </template>
          <template v-if="isTree && iconShow(idx,scope.row)">
            <span class="tree-ctrl" @click="toggleExpanded(scope)">
              <i v-if="!scope.row._expanded" class="el-icon-caret-right"></i>
              <i v-else class="el-icon-caret-bottom"></i>
            </span>
          </template>
          <template v-if="item.type==='dict'">
            <div>{{dictsMap[item.prop][scope.row[item.prop]]}}</div>
          </template>
          <template v-else-if="item.type==='tag'">
            <iep-tag-detail :value="scope.row[item.prop]"></iep-tag-detail>
          </template>
          <template v-else>
            <iep-table-detail :value="scope.row[item.prop]"></iep-table-detail>
          </template>
        </template>
      </el-table-column>
      <slot></slot>
    </el-table>
    <iep-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :pagination-option="pagination" :page-sizes="initPageSize" layout="total, sizes, prev, pager, next" prev-text="上一页" next-text="下一页" background></iep-pagination>
  </div>
</template>

<script>
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
    checkboxInit: {
      type: Function,
      default: null,
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
    pageOptionSize: {
      type: Number,
      default: 10,
    },
  },
  data () {
    return {
    }
  },
  computed: {
    initPageSize () {
      const { pageOptionSize } = this
      return [pageOptionSize, pageOptionSize * 2, pageOptionSize * 3, pageOptionSize * 4]
    },
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
    cellClassName ({ row }) {
      const { _level } = row
      if (_level === 1) {
        return 'cell-master'
      }
      if (_level == 2) {
        return 'cell-child'
      }
      if (_level == 3) {
        return 'cell-sub'
      }
    },
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
    // 整行点击事件
    rowClick (row, column, event) {
      this.$emit('row-click', row, column, event)
    },
  },
}
</script>
<style scoped>
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
  flex-wrap: wrap;
}
.table >>> .cell-master {
  background-color: #fff;
}
.table >>> .cell-child {
  background-color: #fafafa;
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
</style>
