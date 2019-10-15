<template>
  <div>
    <el-table v-bind="$attrs" ref="table" class="table" v-loading="isLoadTable" :data="formatData" style="width: 100%;" :header-cell-style="headerCellStyle" :cell-class-name="cellClassName" :row-style="rowStyle" @selection-change="handleSelectionChange" @row-click="rowClick" @select="selectLine" @select-all="selectAll" @sort-change='sortChange'>
      <el-table-column v-if="isMutipleSelection" type="selection" :selectable="checkboxInit" width="55" :align="align">
      </el-table-column>
      <el-table-column v-if="isIndex" type="index" width="50" :align="align">
      </el-table-column>
      <!-- 为了实行点击查看的规定 -->
      <slot name="before-columns"></slot>
      <el-table-column :label="item.label" :width="item.width" :min-width="item.minWidth" v-for="(item, idx) in columnsMap" :key="idx" :align="align" :prop="item.prop">
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
          <template v-else-if="item.type==='dictGroup'">
            <div>{{calculateDict(item, scope)}}</div>
          </template>
          <template v-else-if="item.type==='date'">
            <div>{{calculateDate(item, scope)}}</div>
          </template>
          <template v-else-if="item.type==='custom'">
            <div>{{calculateCustom(item, scope)}}</div>
          </template>
          <template v-else-if="item.type==='tag'">
            <iep-tag-detail :value="scope.row[item.prop]" :iep-type="item.iepType"></iep-tag-detail>
          </template>
          <template v-else-if="item.type==='detail'">
            <detail :row="scope.row" :item="item"></detail>
          </template>
          <template v-else>
            <iep-div-detail :value="scope.row[item.prop]" :nullmsg="item.nullmsg"></iep-div-detail>
          </template>
        </template>
      </el-table-column>
      <slot></slot>
    </el-table>
    <iep-pagination v-if="isPagination" @size-change="handleSizeChange" @current-change="handleCurrentChange" :pagination-option="pagination" :page-sizes="initPageSize" :layout="layout" prev-text="上一页" next-text="下一页" background></iep-pagination>
  </div>
</template>

<script>
import { pageOption } from '@/const/pageConfig'
import { parseDate } from '@/filters/index'
import treeToArray from './eval'
import keyBy from 'lodash/keyBy'
import { mapGetters } from 'vuex'
import Detail from './Detail'
export default {
  name: 'IepTable',
  inheritAttrs: false,
  components: { Detail },
  props: {
    isLoadTable: {
      type: Boolean,
      required: true,
    },
    isMutipleSelection: {
      type: Boolean,
      default: false,
    },
    isTree: {
      type: Boolean,
      default: false,
    },
    isIndex: {
      type: Boolean,
      default: false,
    },
    isPagination: {
      type: Boolean,
      default: true,
    },
    pagination: {
      type: Object,
      default: () => pageOption(),
    },
    pagedTable: {
      type: Array,
      required: true,
    },
    columnsMap: {
      type: Array,
      default: () => [],
    },
    dictsMap: {
      type: Object,
      default: () => { },
    },
    align: {
      type: String,
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
      default: false,
    },
    pageOptionSize: {
      type: Number,
      default: 10,
    },
    layout: {
      type: String,
      default: 'total, sizes, prev, pager, next',
    },
    cellClassName: {
      type: Function,
      default: ({ row }) => {
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
    },
    rowStyle: {
      type: Function,
      default: (row) => {
        const show = row.row.parent ? row.row.parent._expanded && row.row.parent._show : true
        row.row._show = show
        return show ? 'animation:treeTableShow 1s;-webkit-animation:treeTableShow 1s;' : 'display:table-column;'
      },
    },
    headerCellStyle: {
      type: Function,
      default: ({ rowIndex }) => {
        if (rowIndex == 0) {
          return 'background:#F2F4F5;color:#000'
        } else {
          return ''
        }
      },
    },
  },
  computed: {
    ...mapGetters([
      'dictGroup',
    ]),
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
      const args = this.evalArgs ? [tmp, this.expandAll, ...this.evalArgs] : [tmp, this.expandAll]
      return func.apply(null, args)
    },
  },
  methods: {
    calculateCustom (item, scope) {
      return item.customFunction(scope.row)
    },
    calculateDate (item, scope) {
      return parseDate(scope.row[item.prop], item.formatString)
    },
    calculateDict (item, scope) {
      if (scope.row[item.prop]) {
        const isExist = keyBy(this.dictGroup[item.dictName], 'value')[scope.row[item.prop]]
        if (isExist) {
          return isExist.label
        } else {
          return '暂无'
        }
      } else {
        return '暂无'
      }
    },
    handleSizeChange (val) {
      this.$emit('size-change', val)
    },
    handleCurrentChange (val) {
      this.$emit('current-change', val)
    },
    // 切换下级是否展开
    toggleExpanded (scope) {
      const record = this.formatData[scope.$index]
      record._expanded = !record._expanded
    },
    // 图标显示
    iconShow (index, record) {
      return index === 0 && record.childrenLength > 0
    },
    handleSelectionChange (val) {
      this.$emit('selection-change', val)
    },
    sortChange (val) {
      this.$emit('sort-change', val)
    },
    // 整行点击事件
    rowClick (row, column, event) {
      this.$emit('row-click', row, column, event)
    },
    // 选择单行回调事件
    selectLine (selection, row) {
      this.$emit('select', selection, row)
    },
    // 全选回调事件
    selectAll (selection) {
      this.$emit('select-all', selection)
    },
    // 切换某一行的选中状态
    toggleRowSelection (row, selected) {
      this.$refs['table'].toggleRowSelection(row, selected)
    },
    // 全部取消选择
    clearSelection () {
      this.$refs['table'].clearSelection()
    },
  },
}
</script>
<style lang="scss" scoped>
.table ::v-deep .th {
  background: #ccc;
}
.table ::v-deep .ms-tree-space {
  position: relative;
  top: 1px;
  font-style: normal;
  font-weight: 400;
  line-height: 1;
  width: 18px;
  height: 14px;
}
.table ::v-deep .cell {
  display: flex;
  flex-wrap: wrap;
}
.table ::v-deep .cell-master {
  background-color: #fff;
}
.table ::v-deep .cell-child {
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
