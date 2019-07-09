<template>
  <div>
    <basic-container>
      <iep-page-header title="项目列表"></iep-page-header>
      <operation-container>
        <template slot="left">
          <iep-select
            v-show="isAbled"
            size="small"
            v-model="orgIds"
            autocomplete="off"
            prefix-url="admin/org/all"
            @change="listPage()"
            placeholder="所有"
          ></iep-select>
        </template>
        <template slot="right">
          <operation-search @search-page="searchPage" advance-search  prop="projectName">
            <advance-search @search-page="searchPage"></advance-search>
          </operation-search>
        </template>
      </operation-container>
      <iep-table
        :isLoadTable="isLoadTable"
        :columnsMap="columnsMap"
        :pagination="pagination"
        :pagedTable="pagedTable"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      >
        <template slot="before-columns">
          <el-table-column label="项目名称" width="300px">
            <template slot-scope="scope">
             <div style="cursor: pointer;width: 100%;" @click="handleDetail(scope.row)">
              <span>{{ scope.row.projectName }}</span>
            </div>
            </template>
          </el-table-column>
        </template>
        <el-table-column label="发布时间" width="150">
          <template slot-scope="scope">
            <span>{{ scope.row.publisherTime }}</span>
          </template>
        </el-table-column>
      </iep-table>
    </basic-container>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import mixins from '@/mixins/mixins'
import { getProjectList } from '@/api/gpms/index'
import AdvanceSearch from './AdvanceSearch'
const columnsMap = [
  {
    prop: 'projectStage',
    label: '项目阶段',
  },
  {
    prop: 'projectManager',
    label: '项目经理',
  },
  {
    prop: 'projectLevel',
    label: '项目等级',
  },
  {
    prop: 'publisherName',
    label: '发布人',
  },
]
// const initForm = () => {
//   return {
//     projectStage: '',
//     projectManager: '',
//     projectLevel: '',
//     publisherName: '',
//   }
// }
export default {
  mixins: [mixins],
  components: {AdvanceSearch},
  data () {
    return {
      orgIds: '',
      columnsMap,
      pagedTable: [],
      searchForm: {},
      isLoadTable: false,
    }
  },
  computed: {
    ...mapGetters([
      'userInfo',
      'dictGroup',
    ]),
    // ...mapState({
    //   orgId: state => state.user.userInfo.orgIds,
    // }),
    isAbled () {
      return this.userInfo.userId === 1 || this.userInfo.userId === 2 || this.userInfo.userId === 3 || this.userInfo.userId === 451
    },
  },
  created () {
    this.loadPage()
  },
  methods: {
    loadPage (param = {}) {
      this.loadTable(Object.assign({ orgId: this.orgIds }, param, this.searchForm), getProjectList)
    },
    listPage () {
      this.loadPage()
    },
    searchPage (val) {
      this.loadPage(val)
    },
    handleDetail (row) {
      this.$router.push(`/app/project_details/${row.id}`)
    },
  },
}
</script>


