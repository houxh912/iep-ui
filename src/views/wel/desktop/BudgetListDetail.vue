<template>
  <div>
    <basic-container>
      <page-header title="项目列表"></page-header>
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
          <operation-search @search-page="searchPage">
            <!-- <advance-search @search-page="searchPage"></advance-search> -->
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
          <el-table-column label="项目名称" width="300">
            <template slot-scope="scope">
              <span>{{ scope.row.projectName.slice(0, 10) }}</span>
            </template>
          </el-table-column>
        </template>
        <el-table-column label="发布时间" width="150">
          <template slot-scope="scope">
            <span>{{ scope.row.publisherTime.slice(0, 10) }}</span>
          </template>
        </el-table-column>
      </iep-table>
    </basic-container>
  </div>
</template>
<script>
import { mapGetters, mapState } from 'vuex'
import mixins from '@/mixins/mixins'
import { getProjectList } from '@/api/gpms/index'
const columnsMap = [
  {
    prop: 'projectName',
    label: '项目名称',
  },
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
export default {
  mixins: [mixins],
  data () {
    return {
      orgIds: '',
      columnsMap,
    }
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
      return this.userInfo.userId === 1 || this.userInfo.userId === 2 || this.userInfo.userId === 3 || this.userInfo.userId === 451
    },
  },
  methods: {
    loadPage (param = {}) {
      this.loadTable(Object.assign({}, param, this.searchForm), getProjectList)
    },
  },
}
</script>


