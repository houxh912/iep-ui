<template>
  <div>
    <operation-container>
      <template slot="left">
        <iep-button icon="el-icon-check" plain @click="handleApply">认证</iep-button>
        <iep-button icon="el-icon-delete" @click="handleMoreDelete">删除</iep-button>
      </template>
      <template slot="right">
        <operation-search prop="orgName" advance-search @search-page="searchPage" placeholder="请输入机构名称进行搜索">
          <advance-search @search-page="searchPage"></advance-search>
        </operation-search>
      </template>
    </operation-container>
    <iep-table :isLoadTable="isLoadTable" :pagination="pagination" :columnsMap="columnsMap" :pagedTable="pagedTable" @size-change="handleSizeChange" @current-change="handleCurrentChange" isMutipleSelection :dictsMap="dictsMap" @selection-change="selectionChange">
      <template slot="before-columns">
        <el-table-column label="机构名称">
          <template slot-scope="scope">
            <div class="box">
              <span class="main-name">{{scope.row.orgName}}</span>
              <span v-if="scope.row.claimStatus==='2'" class="claim">认</span>
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
      <el-table-column label="申请对象">
        <template slot-scope="scope">
          <span>{{scope.row.applyUserName}}</span>
        </template>
      </el-table-column>
      <el-table-column label="申请时间">
        <template slot-scope="scope">
          <span>{{scope.row.applyTime|parseToDay}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="operation" label="操作" width="220">
        <template slot-scope="scope">
          <operation-wrapper>
            <iep-button @click="handleClaim(scope.row)">认证</iep-button>
          </operation-wrapper>
        </template>
      </el-table-column>
    </iep-table>
    <dialog-form ref="DialogForm"></dialog-form>
  </div>
</template>>
<script>
import { columnsPendingMap, dictsMap } from '../options'
import mixins from '@/mixins/mixins'
import DialogForm from './DialogForm'
import AdvanceSearch from './AdvanceSearch'
import { getPage, applyPass, deletePage } from '@/api/crms/organization_list'
import { mapGetters } from 'vuex'
export default {
  mixins: [mixins],
  components: { AdvanceSearch, DialogForm },
  data () {
    return {
      isLoadTable: false,
      dictsMap,
      columnsMap: columnsPendingMap,
      multipleSelection: [],
    }
  },
  computed: {
    ...mapGetters([
      'userInfo',
      'dictGroup',
    ]),
  },
  created () {
    this.loadPage()
  },
  methods: {
    selectionChange (val) {
      this.multipleSelection = val.map(m => m.orgId)
    },
    handleApply () {
      this.$confirm('此操作将批量认证该数据, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }).then(() => {
        applyPass(this.multipleSelection).then(res => {
          if (res.data.data) {
            this.$message({
              type: 'success',
              message: '认证成功!',
            })
          } else {
            this.$message({
              type: 'info',
              message: `认证失败，${res.data.msg}`,
            })
          }
          this.loadPage()
        })
      })
    },
    handleMoreDelete () {
      deletePage(this.multipleSelection).then(() => {
        this.loadPage()
      })
    },
    handleClaim (row) {
      this.$refs['DialogForm'].dialogShow = true
      this.$refs['DialogForm'].id = row.orgId
      this.$refs['DialogForm'].loadPage()
    },
    async loadPage (param = this.searchForm) {
      await this.loadTable({ ...param, sort: 'apply' }, getPage)
    },
  },
}
</script>>
<style lang="scss" scoped>
.box {
  display: flex;
}
.main-name {
  width: 100px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  margin-right: 5px;
}
.claim {
  color: #cf3f26;
  font-size: 16px;
}
</style>