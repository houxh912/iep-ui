<template>
  <div class="staff-week">
    <basic-container>
      <operation-container>
        <template slot="left">
          <iep-select v-show="isAbled" v-model="orgIds" autocomplete="off" prefix-url="admin/org/all" @change="searchPage()" placeholder="舟山国脉海洋有限公司"></iep-select>
        </template>
        <template slot="right">
          <operation-search @search-page="searchPage"></operation-search>
        </template>
      </operation-container>
      <iep-table :isLoadTable="isLoadTable" :pagination="pagination" :columnsMap="columnsMap" :pagedTable="pagedTable" @size-change="handleSizeChange" @current-change="handleCurrentChange" :cell-style="mixinsCellPointerStyle" isMutipleSelection>
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
import {getOrgTableData} from '@/api/mlms/leader_report/'
import mixins from '@/mixins/mixins'
import { mapGetters,mapState } from 'vuex'
import {columnsMap} from './options'
export default {
   mixins: [mixins],
  data () {
    return {
      columnsMap,
      orgIds:'',
    }
  },
  created () {
    this.loadPage()
    
  },
  props: {
    record: {
      type: Object,
      default: () => { },
    },
  },
  computed: {
    ...mapGetters([
      'userInfo',
      'dictGroup',
    ]),
    ...mapState({
      orgId: state => state.user.userInfo.orgIds,
    }),
    isAbled () {
      return this.userInfo.userId === 1||this.userInfo.userId === 2||this.userInfo.userId === 3||this.userInfo.userId === 451
    },
  },
  methods: {
    loadPage (param = this.searchForm) {
      this.loadTable({orgId:this.orgIds,reportType: 0,...param}, getOrgTableData)
    },
  },
  searchPage () {
    this.loadPage()
  },
}
</script>
<style scoped>
.staff-week>>>.basic-container{
  padding:20px 0;
}
</style>
