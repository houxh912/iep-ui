<template>
  <div class="staff-week">
    <basic-container>
      <operation-container>
        <template slot="left">
          <el-dropdown>
            <iep-button plain>
              舟山国脉海洋有限公司<i class="el-icon-arrow-down el-icon--right"></i>
            </iep-button>
            <el-dropdown-menu slot="dropdown">
            </el-dropdown-menu>
          </el-dropdown>
        </template>
        <template slot="right">
          <operation-search @search-page="searchPage"></operation-search>
        </template>
      </operation-container>
      <iep-table :isLoadTable="isLoadTable" :pagination="pagination" :columnsMap="columnsMap" :pagedTable="pagedTable" @size-change="handleSizeChange" is-mutiple-selection>
        <el-table-column prop="operation" label="操作" width="200">
          <template>
            <iep-button>查看</iep-button>
          </template>
        </el-table-column>
      </iep-table>
    </basic-container>
  </div>
</template>
<script>
import {getTableData} from '@/api/mlms/leader_report/'
import mixins from '@/mixins/mixins'
import {columnsMap} from './options'
export default {
  mixins: [mixins],
  data () {
    return {
      columnsMap,
      // pagedTable:[
      //   {title:'第二十一周日报，前台展示页',releaseTime:'2019-02-20',发布人:'王大锤',subordinateDepartments:'内网2.0小组'},
      //   {title:'第二十一周日报，前台展示页',releaseTime:'2019-02-20',发布人:'王大锤',subordinateDepartments:'内网2.0小组'},
      //   {title:'第二十一周日报，前台展示页',releaseTime:'2019-02-20',发布人:'王大锤',subordinateDepartments:'内网2.0小组'},
      //   {title:'第二十一周日报，前台展示页',releaseTime:'2019-02-20',发布人:'王大锤',subordinateDepartments:'内网2.0小组'},
      // ],
    }
  },
  created () {
    this.loadPage()
  },
  methods: {
    loadPage (param = this.searchForm) {
      this.loadTable({reportType:0,...param}, getTableData)
    },
  },
}
</script>
<style scoped>
.staff-week>>>.basic-container{
  padding:20px 0;
}
</style>
