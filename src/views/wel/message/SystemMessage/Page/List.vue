<template>
  <div>
    <basic-container>
      <page-header title="系统消息" :replaceText="replaceText"></page-header>
      <operation-container>
        <template slot="left">
          <el-button-group>
            <el-button class="iconfont icon-yanjing" size="small"></el-button>
            <el-button class="iconfont icon-biaoqian" size="small"></el-button>
            <el-button class="iconfont icon-shanchu" size="small"></el-button>
          </el-button-group>
        </template>
        <template slot="right">
          <operation-search @search="searchPage" advance-search>
            <advance-search :form="paramForm" @search-page="searchPage" @clear-search-param="clearSearchParam"></advance-search>
          </operation-search>
        </template>
      </operation-container>
      <iep-table :isLoadTable="isLoadTable" :pagination="pagination" :dictsMap="dictsMap" :columnsMap="currentColumnsMap" :pagedTable="pagedTable" @size-change="handleSizeChange" @current-change="handleCurrentChange" is-mutiple-selection>
        <template slot="before-columns">
          <el-table-column label="主题">
            <template slot-scope="scope">
              <iep-table-link @click="handleDetail(scope.row)">{{scope.row.name}}</iep-table-link>
            </template>
          </el-table-column>
        </template>
      </iep-table>
    </basic-container>
  </div>
</template>
<script>
import { getEmployeeProfilePage } from '@/api/hrms/employee_profile'
import mixins from '@/mixins/mixins'
import keyBy from 'lodash/keyBy'
import { columnsMap, dictsMap } from '../options'
import AdvanceSearch from './AdvanceSearch'
export default {
  mixins: [mixins],
  components: { AdvanceSearch },
  data () {
    return {
      dictsMap,
      columnsMap,
      defaultColumnsLabel: columnsMap.filter(m => !m.hidden).map(m => m.label),
    }
  },
  computed: {
    currentColumnsMap () {
      const keyByColumns = keyBy(columnsMap, 'label')
      return this.defaultColumnsLabel.map(m => {
        return keyByColumns[m]
      })
    },
  },
  created () {
    this.loadPage()
  },
  methods: {
    setHeaderSetting (col) {
      this.defaultColumnsLabel = col
    },
    handleOpenGrowthFile (row) {
      this.$router.push({
        path: `/info/growth_file/${row.id}`,
        query: { redirect: this.$route.fullPath },
      })
    },
    handleUpdate (row) {
      this.$router.push({
        path: `/info/information_management/${row.id}`,
        query: { redirect: this.$route.fullPath },
      })
    },
    loadPage (param = this.paramForm) {
      this.loadTable(param, getEmployeeProfilePage)
    },
    handleChange () {
      this.$emit('onEdit')
    },
    handleDetail (row) {
      console.log(row)
      this.$emit('onDetail')
    },
  },
}
</script>
