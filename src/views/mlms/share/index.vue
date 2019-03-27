<template>
  <el-col class="share">
    <operation-container>
      <template slot="left">
        <iep-button @click="handleAdd" icon="el-icon-plus" type="danger" plain>新增</iep-button>
        <el-dropdown size="medium">
          <iep-button size="small" type="default">更多操作<i class="el-icon-arrow-down el-icon--right"></i></iep-button>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>导入</el-dropdown-item>
            <el-dropdown-item>删除</el-dropdown-item>
            <el-dropdown-item>转移</el-dropdown-item>
            <el-dropdown-item>添加协作人</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </template>
      <template slot="right">
        <operation-search @search="searchPage" advance-search>
          <el-form :model="searchForm" label-width="80px" size="mini">
            <el-form-item label="名称">
              <el-input v-model="searchForm.name" placeholder="请输入名称"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="searchPage">搜索</el-button>
              <el-button @click="clearSearchParam">清空</el-button>
            </el-form-item>
          </el-form>
        </operation-search>
      </template>
    </operation-container>
    <iep-table :isLoadTable="isLoadTable" :pagination="pagination" :dictsMap="dictsMap" :columnsMap="columnsMap" :pagedTable="pagedTable" @size-change="handleSizeChange" @current-change="handleCurrentChange" is-index isMutipleSelection @selection-change="handleSelectionChange">
      <el-table-column prop="operation" label="操作" min-width="160">
        <template slot-scope="scope">
          <operation-wrapper>
            <iep-button @click="handleEdit(scope.row)" type="warning" plain>编辑</iep-button>
            <iep-button @click="handleDeleteById(scope.row)">删除</iep-button>
          </operation-wrapper>
        </template>
      </el-table-column>
    </iep-table>
  </el-col>
</template>

<script>
import mixins from '@/mixins/mixins'
import { columnsMap, dictsMap } from './options'

export default {
  name: 'share',
  mixins: [mixins],
  components: {  },
  computed: {},
  data () {
    return {
      dictsMap,
      columnsMap,
    }
  },
  created () {
    this.loadPage()
  },
  methods: {
    handleAdd () {
      this.$emit('onAdvance')
    },
    handleEdit (row) {
      this.$emit('onEdit', { id: row.clientId })
    },
    handleDeleteById (row) {
      this._handleGlobalDeleteById(row.clientId, () => {})
    },
    handleSelectionChange () {
    },
    loadPage () {
      this.pagedTable = []
      this.isLoadTable = false
    },
    clearSearchParam () {},
  },
}
</script>

<style lang="scss" scoped>
.share {
  padding: 20px;
}
</style>
