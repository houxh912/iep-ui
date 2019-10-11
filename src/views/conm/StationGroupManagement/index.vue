<template>
  <div>
    <basic-container>
      <iep-page-header title="站群管理" :replaceText="replaceText" :data="statistics"></iep-page-header>
      <operation-container>
        <template slot="left">
          <iep-button v-if="info_site_add" type="primary" plain @click="handleAdd" icon="el-icon-plus">新增</iep-button>
        </template>
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
              <iep-table-link @click="handleDetail(scope.row)">{{scope.row.siteName}}</iep-table-link>
            </template>
          </el-table-column>
        </template>
        <el-table-column prop="operation" label="操作" width="250" fixed="right">
          <template slot-scope="scope">
            <operation-wrapper>
              <iep-button v-if="info_site_edit" @click="handleEdit(scope.row)">编辑</iep-button>
              <iep-button v-if="info_site_del" @click="handleDelete(scope.row)">删除</iep-button>
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
      statistics: [0],
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
    handleDetail (row) {
      this.$router.push({
        path: `/comn/station_management_detail/${row.id}`,
      })
    },
    handleDelete (row) {
      this._handleGlobalDeleteById(row.id, deleteStationManagement)
    },
    async loadPage (param = this.searchForm) {
      const data = await this.loadTable(param, getStationManagementPage)
      this.$set(this.statistics, 0, data.total)
    },
  },
}
</script>