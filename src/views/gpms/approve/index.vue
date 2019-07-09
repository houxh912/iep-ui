<template>
  <div>
    <basic-container>
      <iep-page-header title="项目审批" :back-option="backOption"></iep-page-header>
      <operation-container>
        <template slot="left">
          <iep-button >批量审核</iep-button>
        </template>
        <template slot="right">
          <operation-search @search-page="searchPage" advance-search placeHolder="请输入项目名称" prop="projectName">
            <!--title-->
            <!-- <el-row class="search">
              <el-col :span="23">高级搜索</el-col>
              <el-col :span="1">
                <i class="iconfon el-icon-plus" @click="closeDialog" style="cursor: pointer;"></i>
              </el-col>
            </el-row> -->
            <!--表单-->
            <!-- <search-form></search-form> -->
          </operation-search>
        </template>
      </operation-container>
      <iep-table :isLoadTable="false" :pagination="pagination" :columnsMap="columnsMap" :dictsMap="dictsMap" :pagedTable="pagedTable" @size-change="handleSizeChange" @current-change="handleCurrentChange" is-mutiple-selection>
        <el-table-column label="项目名称" slot="before-columns" width="300px">
          <template slot-scope="scope">
            <div style="cursor: pointer;width: 100%;" @click="handleDetail(scope.row)">
              <span>{{ scope.row.projectName }}</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <operation-wrapper>
              <iep-button size="small" type="danger" v-if="scope.row.approvalStatus==1">立项审核</iep-button>
              <iep-button size="small" v-if="scope.row.approvalStatus==2">锁定</iep-button>
              <iep-button size="small" v-if="scope.row.approvalStatus==3">启用</iep-button>
            </operation-wrapper>
          </template>
        </el-table-column>
      </iep-table>

    </basic-container>
  </div>
</template>

<script>
import mixins from '@/mixins/mixins'
// import { getDataDetail } from '@/api/gpms/index'
import { columnsMap, dictsMap } from './option.js'
import { getApprovalList } from '@/api/gpms/index'

export default {
  mixins: [mixins],
  data () {
    return {
      columnsMap,
      dictsMap,
      backOption: {
        isBack: true,
        backPath: null,
        backFunction: () => {
          this.close()
        },
      },
    }
  },
  created () {
    this.loadPage()
  },
  methods: {
    close () {
      this.$router.history.go(-1)
    },
    searchPage (val) {
      this.searchForm = Object.assign({}, this.searchForm, val)
      this.loadPage()
    },
    loadPage ( param = this.searchForm ) {
      this.loadTable({approvalStatus:0,param}, getApprovalList)
    },
    handleDetail (row) {
      this.$router.push(`/gpms_spa/project/detail_test/${row.id}`)
    },
  },
}
</script>

<style lang="scss" scoped>
.head {
  margin-bottom: 20px;
  display: flex;
  .item {
    font-size: 18px;
    cursor: pointer;
  }
  .item-select {
    color: #ba1b21;
  }
  .middle {
    width: 30px;
    text-align: center;
    font-size: 18px;
  }
}
</style>