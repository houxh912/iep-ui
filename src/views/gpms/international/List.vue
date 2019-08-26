<template>
  <basic-container>
    <iep-page-header title="项目公海"></iep-page-header>
    <operation-container>
      <template slot="left">
      </template>
      <template slot="right">
        <operation-search @search-page="searchPage" advance-search placeHolder="请输入项目名称" prop="projectName">
          <advance-search @search-page="searchPage"></advance-search>
        </operation-search>
      </template>
    </operation-container>
    <iep-table :isLoadTable="isLoadTable" :pagination="pagination" :columnsMap="columnsMap" :dictMap="dictMap" :pagedTable="pagedTable" @size-change="handleSizeChange" @current-change="handleCurrentChange">
      <el-table-column label="项目名称" slot="before-columns">
        <template slot-scope="scope">
          <div style="cursor: pointer;width: 100%;" @click="handleDetail(scope.row)">
            <span class="grade" v-show="scope.row.projectLevel==1">重要</span>
            <span class="grade" v-show="scope.row.projectLevel==2">中级</span>
            <span class="grade" v-show="scope.row.projectLevel==3">一般</span>
            <span class="stage">{{dictMap.projectStage[scope.row.projectStage]}}</span>
            <span>{{ scope.row.projectName }}</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="项目金额" slot="before-columns" width="180px">
        <template slot-scope="scope">
          <span v-if="scope.row.contractAmount">{{ scope.row.contractAmount }}（合同）</span>
          <span v-else>{{ scope.row.projectBudget }}（预算）</span>
        </template>
      </el-table-column>
      <el-table-column label="立项时间" width="140px">
        <template slot-scope="scope">
          <span>{{ scope.row.approvalTime | parseToDay }}</span>
        </template>
      </el-table-column>
      <el-table-column label="项目状态" width="120px">
        <template slot-scope="scope">
          <span v-if="scope.row.projectStatus==1">待提交</span>
          <span v-if="scope.row.projectStatus==2">待审核</span>
          <span v-if="scope.row.projectStatus==3">已立项</span>
          <span v-if="scope.row.projectStatus==4">审核未通过</span>
          <span v-if="scope.row.projectStatus==5">锁定</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="100px">
        <template slot-scope="scope">
          <iep-button @click="handleDefine(scope.row)" type="warning" plain>认领</iep-button>
        </template>
      </el-table-column>
    </iep-table>
    <detail ref="detail"></detail>
  </basic-container>
</template>
<script>
import mixins from '@/mixins/mixins'
import { getProjectPage, statusDefine } from '@/api/gpms/fas'
import { columnsMap, dictMap } from './option'
import AdvanceSearch from './AdvanceSearch'
import detail from '../detail'

export default {
  components: { AdvanceSearch, detail },
  mixins: [mixins],
  data () {
    return {
      // replaceText: (data) => `[共${data[0]}条数据]`,
      columnsMap,
      dictMap,
    }
  },
  created () {
  },
  methods: {
    async loadPage (params = {}) {
      await this.loadTable(Object.assign({}, params, this.searchForm), getProjectPage)
      // this.statistics = data.total
    },
    searchPage (val) {
      this.searchForm = Object.assign({}, this.searchForm, val)
      this.loadPage()
    },
    handleDefine (row) {
      this.$confirm('是否确认认领此数据?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
      }).then(() => {
        statusDefine([row.id]).then(() => {
          this.$message.success('认领成功！')
          this.loadPage()
        })
      })
    },
    handleDetail (row) {
      this.$emit('onEdit', {
        id: row.id,
      })
    },
  },
  mounted () {
    this.searchForm.listType = 3
    this.loadPage()
  },
}
</script>
<style scoped>
.grade,
.stage {
  color: #fff;
  font-size: 12px;
  padding: 2px 6px;
  height: 18px;
  line-height: 18px;
  margin-right: 4px;
  margin-top: 10px;
}
.grade {
  background-color: #b91b21;
}
.stage {
  background-color: #b5b5b5;
  margin-right: 10px;
}
</style>
