<template>
  <div>
    <basic-container>
      <iep-page-header title="站群管理" :replaceText="replaceText" :data="statistics"></iep-page-header>
      <operation-container>
        <template slot="left">
          <iep-button v-if="info_site_add" type="primary" plain @click="handleAdd" icon="el-icon-plus">新增</iep-button>
        </template>
        <!-- <template slot="right">
          <operation-search>
            <advance-search @search-page="searchPage"></advance-search>
          </operation-search>
        </template> -->
      </operation-container>
      <iep-table :isLoadTable="isLoadTable" :pagination="pagination" :dictsMap="dictsMap" :columnsMap="columnsMap" :pagedTable="pagedTable" @size-change="handleSizeChange" @current-change="handleCurrentChange" is-mutiple-selection>
        <template slot="before-columns">
          <el-table-column label="ID" width="90px">
            <template slot-scope="scope">
              <div>{{scope.row.id}}</div>
            </template>
          </el-table-column>
          <el-table-column label="站名">
            <template slot-scope="scope">
              <div>{{scope.row.siteName}}</div>
            </template>
          </el-table-column>
        </template>
        <el-table-column prop="operation" label="操作" width="250" fixed="right">
          <template slot-scope="scope">
            <operation-wrapper>
              <iep-button @click="handleCulomn(scope.row)" type="primary" plain>栏目管理</iep-button>
              <iep-button @click="handleAttribute(scope.row)">推荐位管理</iep-button>
              <el-dropdown size="medium">
                <iep-button type="default">
                  <i class="el-icon-more-outline"></i>
                </iep-button>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item v-if="info_site_edit" @click.native="handleEdit(scope.row)">编辑</el-dropdown-item>
                  <el-dropdown-item v-if="info_site_del" @click.native="handleDelete(scope.row)">删除</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </operation-wrapper>
          </template>
        </el-table-column>
      </iep-table>
    </basic-container>
    <dialog-form ref="DialogForm" @load-page="loadPage"></dialog-form>
  </div>
</template>
<script>
import { getStationManagementPage, postStationManagementCreate, deleteStationManagement, updateStationManagement } from '@/api/conm/index'
import mixins from '@/mixins/mixins'
import { columnsMap, initSearchForm, dictsMap } from './options'
import DialogForm from './DialogForm'
import { mapGetters } from 'vuex'
export default {
  mixins: [mixins],
  components: { DialogForm },
  data () {
    return {
      dictsMap,
      columnsMap,
      paramForm: initSearchForm(),
      statistics: [20],
      replaceText: (data) => `（共${data[0]}条）`,
      pagedTable: [
      ],
      info_site_add: false,
      info_site_edit: false,
      info_site_del: false,
    }
  },
  created () {
    this.info_site_add = this.permissions['info_site_add']
    this.info_site_edit = this.permissions['info_site_edit']
    this.info_site_del = this.permissions['info_site_del']
    this.loadPage()
  },
  computed: {
    ...mapGetters([
      'permissions',
    ]),
  },
  methods: {
    handleAdd () {
      this.$refs['DialogForm'].formRequestFn = postStationManagementCreate
      this.$refs['DialogForm'].dialogShow = true
      this.$refs['DialogForm'].methodName = '新增'
    },
    handleEdit (row) {
      this.$refs['DialogForm'].id = row.id
      this.$refs['DialogForm'].formRequestFn = updateStationManagement
      this.$refs['DialogForm'].dialogShow = true
      this.$refs['DialogForm'].loadTypeList()
      this.$refs['DialogForm'].methodName = '编辑'
    },
    handleDelete (row) {
      this._handleGlobalDeleteById(row.id, deleteStationManagement)
    },
    handleCulomn (row) {
      this.$router.push({
        path: `/comn/column_management/${row.id}`,
      })
    },
    handleAttribute (row) {
      this.$router.push({
        path: `/comn/attribute_management/${row.id}`,
      })
    },
    async loadPage (param = this.searchForm) {
      const data = await this.loadTable(param, getStationManagementPage)
      this.$set(this.statistics, 0, data.total)
    },
  },
}
</script>