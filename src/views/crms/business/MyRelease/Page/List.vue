<template>
  <div class="contract">
    <operation-container>
      <template slot="left">
        <iep-button @click="handleCreate" size="small" type="danger">新增</iep-button>
      </template>
      <template slot="right">
        <operation-search @search="searchPage" advance-search>

          <el-form :model="paramForm" label-width="80px" size="mini">
            <el-form-item label="客户名称">
              <el-input v-model="paramForm.clientName" placeholder="关键字"></el-input>
            </el-form-item>
            <el-form-item label="项目名称">
              <el-input v-model="paramForm.projectName" placeholder="关键字"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="searchPage">搜索</el-button>
              <el-button @click="clearSearchParam">清空</el-button>
            </el-form-item>
          </el-form>

        </operation-search>
      </template>
    </operation-container>
    <iep-table :isLoadTable="isLoadTable" :pagination="pagination" :dictsMap="dictsMap" :columnsMap="columnsMap" :pagedTable="pagedTable" @size-change="handleSizeChange" @current-change="handleCurrentChange" is-index>
      <el-table-column prop="operation" label="操作" min-width="160">
        <template slot-scope="scope">
          <operation-wrapper>
            <iep-button @click="handleEdit(scope.row)" size="small" type="warning">编辑</iep-button>
            <iep-button @click="handleDeleteById(scope.row)" size="small">删除</iep-button>
          </operation-wrapper>
        </template>
      </el-table-column>
    </iep-table>
  </div>
</template>

<script>
import mixins from '@/mixins/mixins'
import { allTableOption, dictsMap, initSearchForm } from '../options'
import { myBusinessList, createData, deleteDataById, refuseClaim } from '@/api/crms/business'
export default {
  name: 'business',
  mixins: [mixins],
  data () {
    return {
      dictsMap,
      columnsMap: allTableOption,
      paramForm: initSearchForm(),
    }
  },
  methods: {
    loadPage (param) {
      this.loadTable(param, myBusinessList, m => {
        return Object.assign(m, { businessTypeC: m.businessType.map(m => m.commonName).join('，') })
      })
    },
    clearSearchParam () {
      this.paramForm = initSearchForm()
      this.$emit('clear-search-param')
    },
    searchPage () {
      this.loadTable(this.paramForm, myBusinessList)
    },
    handleAdd () {
      this.$refs['mainDialog'].methodName = '新增'
      this.$refs['mainDialog'].formRequestFn = createData
      this.$refs['mainDialog'].dialogShow = true
    },
    // 编辑
    handleEdit (row) {
      this.$emit('onEdit', { ...row })
    },
    // 新增
    handleCreate () {
      this.$emit('onCreat')
    },


    handleDeleteById (row) {
      let ids = [row.opportunityId]
      this._handleGlobalDeleteById(ids, deleteDataById)
    },
    handleRefuse (row) {
      this.$confirm('是否确定拒绝认领此数据？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }).then(() => {
        refuseClaim(row.id).then(res => {
          if (res.data.data) {
            this.$message.success('操作成功!')
          } else {
            this.$message.info(`操作失败，${res.data.msg}`)
          }
          this.loadPage()
        })
      })
    },
  },
  created () {
    this.loadPage()
  },
}
</script>
