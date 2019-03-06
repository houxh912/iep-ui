<template>
  <div>
    <el-table class="table" v-loading="isLoadTable" :data="pagedTable" style="width: 100%;" @selection-change="handleSelectionChange" :header-cell-style="getRowClass" v-bind="$attrs">
      <el-table-column v-if="isMutipleSelection" type="selection" width="55" :align="align">
      </el-table-column>
      <el-table-column v-if="isIndex" type="index" width="50" :align="align">
      </el-table-column>
      <!-- 为了实行点击查看的规定 -->
      <slot name="before-columns"></slot>
      <el-table-column :label="item.label" :width="item.width" :min-width="item.minWidth" v-for="(item, idx) in columnsMap" :key="idx" :align="align">
        <template slot-scope="scope">
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
  },
  components: {
    Pagination,
  },
  data () {
    return {
    }
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
.el-table--fit .el-button--default:hover,
.el-table--fit .el-button--default:focus {
  border-color: #ea8d03;
  background-color: #fff7ec;
  color: #ea8d03;
}
</style>