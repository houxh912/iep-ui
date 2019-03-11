<template>
  <div>
    <operation-container>
      <template slot="left">
        <iep-button size="small" type="danger" @click="handleAdd"><i class="el-icon-plus"></i> 新增</iep-button>
        <el-dropdown size="medium">
          <iep-button size="small" type="default">更多操作<i class="el-icon-arrow-down el-icon--right"></i></iep-button>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>删除</el-dropdown-item>
            <el-dropdown-item divided>导出</el-dropdown-item>
            <el-dropdown-item>收藏</el-dropdown-item>
            <el-dropdown-item>分享</el-dropdown-item>
            <el-dropdown-item>下载</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </template>
    </operation-container>
    <iep-table-tree :data="tableData" :option="columnsMap">
      <template slot="status" slot-scope="scope">
        {{scope}}
        <el-switch v-model="scope.status"></el-switch>
      </template>
      <template slot="more">
        <div class="more-icon">
          <div class="more-icon-1"><i class="icon-shangyi"></i></div>
          <div class="more-icon-2"><i class="icon-shangyi"></i></div>
          <div class="more-icon-3"><i class="el-icon-download"></i></div>
          <div class="more-icon-4"><i class="el-icon-download"></i></div>
        </div>
      </template>
      <template slot="menu">
        <iep-button>删除</iep-button>
      </template>
    </iep-table-tree>
  </div>
</template>

<script>
import mixins from '@/mixins/mixins'
import { tableOption, dictsMap } from './option'
import { fetchList, createData, updateData, deleteDataById } from '@/api/crms/custom'
import IepTableTree from './IepTableTree'

export default {
  mixins: [mixins],
  components: { IepTableTree },
  computed: {  },
  data () {
    return {
      dictsMap,
      tableData: [],
      columnsMap: tableOption,
      index: 1,
    }
  },
  methods: {
    handleAdd () {
      this.$refs['mainDialog'].methodName = '新增'
      this.$refs['mainDialog'].formRequestFn = createData
      this.$refs['mainDialog'].dialogShow = true
    },
    handleEdit (row) {
      this.$refs['mainDialog'].formData = row
      this.$refs['mainDialog'].methodName = '编辑'
      this.$refs['mainDialog'].formRequestFn = updateData
      this.$refs['mainDialog'].dialogShow = true
    },
    handleDeleteById (row) {
      this._handleGlobalDeleteById(row.id, deleteDataById)
    },
    selectionChange (val) {
      console.log('val: ', val)
    },
    loadPage (param) {
      this.loadTable(param, fetchList)
      this.tableData = [
        { id: 1, name: '制度文化', yidong: '↑ ↑ ↓ ↓', children: [
          { id: 11, name: '制度子级1号', yidong: '↑ ↑ ↓ ↓' },
          { id: 12, name: '制度子级2号', yidong: '↑ ↑ ↓ ↓' },
          { id: 13, name: '制度子级3号', yidong: '↑ ↑ ↓ ↓' },
          { id: 14, name: '制度子级4号', yidong: '↑ ↑ ↓ ↓' },
        ] }, {
          id: 2, name: '政策文件', yidong: '↑ ↑ ↓ ↓', children: [
            { id: 21, name: '董事会', yidong: '↑ ↑ ↓ ↓' },
          ],
        },
      ]
    },
  },
  created () {
    this.loadPage()
  },
}
</script>

<style lang="scss" scoped>
.more-icon {
  display: flex;
  div {
    width: 30px;
    height: 30px;
    line-height: 30px;
    border-radius: 50%;
    text-align: center;
    cursor: pointer;
  }
  div:hover {
    background-color: #d6d6d6;
  }
  .more-icon-3, .more-icon-4 {
    font-size: 22px;
  }
  .more-icon-2, .more-icon-3 {
    transform: rotate(180deg);
    -ms-transform: rotate(180deg);		/* IE 9 */
    -webkit-transform: rotate(180deg);	/* Safari and Chrome */
    -o-transform: rotate(180deg);		/* Opera */
    -moz-transform: rotate(180deg);
  }
}
</style>
