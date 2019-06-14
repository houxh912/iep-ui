<template>
  <div class="staff-month">
    <basic-container>
      <operation-container>
        <template slot="left">
          <iep-select v-show="isAbled" v-model="orgIds" autocomplete="off" prefix-url="admin/org/all" @change="listPage()" placeholder="所有"></iep-select>
        </template>
        <template slot="right">
          <operation-search @search-page="searchPage" prop="realName" placeholder="根据姓名进行搜索"></operation-search>
        </template>
      </operation-container>
      <iep-table :isLoadTable="false" :pagination="pagination" :columnsMap="columnsMap" :pagedTable="pagedTable" @size-change="handleSizeChange" @current-change="handleCurrentChange" :cell-style="mixinsCellPointerStyle" isMutipleSelection>
        <el-table-column prop="operation" label="操作" width="200">
          <template>
            <iep-button :disabled="true" @click="handleClick">查看</iep-button>
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
      realName:'',
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
      this.loadTable({realName: this.realName,orgId: this.orgIds,reportType: 1,...param}, getOrgTableData)
    },
     handleClick () {
      this.$router.push('/wel/material/report')
    },
    listPage () {
      this.realName = ''
      this.loadPage()
    },
    searchPage (val) {
      if (val.realName == '') {
        // this.$message.error('请输入搜索内容')
        // return
        this.loadPage()
      }
      this.realName = val.realName
      this.loadPage()
    },
  },
}
</script>
<style scoped>
.staff-month>>>.basic-container{
  padding:20px 0;
}
</style>
