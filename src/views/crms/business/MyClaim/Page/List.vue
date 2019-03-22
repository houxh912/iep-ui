<template>
  <div class="contract">
    <operation-container>
      <template slot="left">
        <!-- <iep-button @click="handleEdit" size="small" type="danger">新增</iep-button> -->
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
      <el-table-column prop="operation" label="操作" min-width="80">
        <template slot-scope="scope">
          <operation-wrapper>
            <!-- <iep-button @click="handleCustom(scope.row)" size="small">创建客户</iep-button> -->
            <iep-button @click="handleRefuse(scope.row)" size="small">取消认领</iep-button>
          </operation-wrapper>
        </template>
      </el-table-column>
    </iep-table>
    <main-form-dialog ref="mainDialog" @load-page="loadPage"></main-form-dialog>
  </div>
</template>

<script>
import mixins from '@/mixins/mixins'
import { allTableOption, dictsMap, initSearchForm } from '../options'
import { businessList, createData, deleteDataById, cancelClaim, businessById } from '@/api/crms/business'
import mainFormDialog from '../../dialogs/mainDialog'
export default {
  name: 'business',
  mixins: [mixins],
  components: { mainFormDialog },
  data () {
    return {
      dictsMap,
      columnsMap: allTableOption,
      paramForm: initSearchForm(),
      type: 3,
    }
  },
  methods: {
    // loadPage (param) {
    //   this.loadTable(param, myReceiveList)
    // },
    loadPage (param = { type: this.type }) {
      this.loadTable(param, businessList, m => {
        return Object.assign(m, { businessTypeC: m.businessType.map(m => m.commonName).join('，') })
      })
    },
    clearSearchParam () {
      this.paramForm = initSearchForm()
      this.$emit('clear-search-param')
    },
    searchPage () {
      this.loadTable({ ...this.paramForm, type: this.type }, businessList)
    },
    handleAdd () {
      this.$refs['mainDialog'].methodName = '新增'
      this.$refs['mainDialog'].formRequestFn = createData
      this.$refs['mainDialog'].dialogShow = true
    },
    handleEdit () {
      this.$emit('onEdit')
    },
    handleDeleteById (row) {
      this._handleGlobalDeleteById(row.id, deleteDataById)
    },
    handleRefuse (row) {
      this.$confirm('是否确定取消认领此数据？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }).then(() => {
        businessById(row.opportunityId).then(res => {
          console.log(res)
          let state = res.data.data.data.statusKey
          let id = res.data.data.data.opportunityId
          let claim = {
            opportunityId: id,
            status: state,
          }
          cancelClaim({ ...claim }).then(res => {
            if (res.status == 200) {
              this.$message.success('操作成功!')
            } else {
              this.$message.info(`操作失败，${res.data.msg}`)
            }
            this.loadPage()
          })
        })
      })
    },
    handleCustom (row) {
      this.$message.success(`创建客户${row.name}`)
    },
  },
  created () {
    this.loadPage()
  },
}
</script>
