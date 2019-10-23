<template>
  <div>
    <operation-container>
      <template slot="left">
        <iep-button icon="el-icon-delete" @click="handleMoreDelete">删除</iep-button>
      </template>
      <template slot="right">
        <operation-search prop="orgName" @search-page="searchPage" advance-search placeholder="请输入机构名称进行搜索">
          <advance-search @search-page="searchPage"></advance-search>
        </operation-search>
      </template>
    </operation-container>
    <iep-table :isLoadTable="isLoadTable" :pagination="pagination" :columnsMap="columnsMap" :pagedTable="pagedTable" @size-change="handleSizeChange" @current-change="handleCurrentChange" isMutipleSelection :dictsMap="dictsMap" @selection-change="selectionChange">
      <template slot="before-columns">
        <el-table-column label="机构名称">
          <template slot-scope="scope">
            <div class="box">
              <span v-if="scope.row.claimStatus==='1'" class="claim">认</span>
              <span class="main-name">{{scope.row.orgName}}</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="机构分类">
          <template slot-scope="scope">
            <span>{{dictsMap.type[scope.row.type]}}</span>
          </template>
        </el-table-column>
        <el-table-column label="行业">
          <template slot-scope="scope">
            <span>{{dictGroup['POLICY_INDUSTRY'].map(m => m.label)[scope.row.line]}}</span>
          </template>
        </el-table-column>
      </template>
      <el-table-column prop="operation" label="操作" width="220">
        <template slot-scope="scope">
          <operation-wrapper>
            <iep-button @click="handleRecover(scope.row)" type="primary" plain>撤销</iep-button>
            <iep-button @click="handleDelete(scope.row)">删除</iep-button>
          </operation-wrapper>
        </template>
      </el-table-column>
    </iep-table>
  </div>
</template>>
<script>
import { columnsMap, dictsMap } from '../options'
import mixins from '@/mixins/mixins'
import AdvanceSearch from '../List/AdvanceSearch'
import { getRecyclePage, deleteRecyclePage, recoverRecyclePage } from '@/api/crms/organization_list'
import { mapGetters } from 'vuex'
export default {
  components: { AdvanceSearch },
  mixins: [mixins],
  data () {
    return {
      isLoadTable: false,
      dictsMap,
      columnsMap,
      multipleSelection: [],
    }
  },
  created () {
    this.loadPage()
  },
  computed: {
    ...mapGetters([
      'dictGroup',
    ]),
  },
  methods: {
    selectionChange (val) {
      this.multipleSelection = val.map(m => m.orgId)
    },
    handleMoreDelete () {
      deleteRecyclePage(this.multipleSelection).then(() => {
        this.loadPage()
      })
    },
    handleDelete (row) {
      this.$confirm('此操作将删除该数据, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }).then(() => {
        deleteRecyclePage([row.orgId]).then(() => {
          this.loadPage()
        })
      })
    },
    handleRecover (row) {
      recoverRecyclePage([row.orgId]).then(({ data }) => {
        if (data.data) {
          this.$message({
            message: '撤销成功',
            type: 'success',
          })
          this.loadPage()
        } else {
          this.$message(data.msg)
        }
      })
    },
    async loadPage (param = this.searchForm) {
      await this.loadTable(param, getRecyclePage)
    },
  },
}
</script>>