<template>
  <div class="contract">
    <div v-if="pageState">
      <div class="head">
        <iep-button type="danger" @click="handleCreate"><i class="el-icon-plus"></i> 新增</iep-button>
      </div>
      <iep-table :isLoadTable="isLoadTable" :pagination="pagination" :columnsMap="columnsMap" :pagedTable="pagedTable" @size-change="handleSizeChange" @current-change="handleCurrentChange">
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
    <main-dialog ref="dialog" @onGoBack="resetForm" v-else></main-dialog>

  </div>
</template>

<script>
import mixins from '@/mixins/mixins'
import { fetchList, updateData, createData, deleteDataById, getDataById } from '@/api/crms/contract'
import MainDialog from '@/views/crms/contract/MyContract/Page/Edit'
const columnsMap = [
  { label: '合同名称', prop: 'contractName' },
  { label: '业务类型', prop: 'businessType' },
  { label: '合同金额', prop: 'contractAmount' },
  { label: '合同状态', prop: 'contractStatus' },
  { label: '回款率', prop: 'odds' },
]

export default {
  name: 'contract',
  mixins: [mixins],
  components: { MainDialog },
  data () {
    return {
      pageState: true,
      columnsMap,
      formData: {},
      methodName: '',
      submitFn: () => { },
    }
  },
  props: {
    record: {
      type: Object,
      default: () => { },
    },
  },
  methods: {
    loadPage (param) {
      this.loadTable(param, fetchList)
    },
    handleCreate () {
      this.pageState = false
      this.$nextTick(() => {
        this.$refs['dialog'].methodName = '新增'
        this.$refs['dialog'].pageState = false
        this.$refs['dialog'].resetForm('form')
        this.$refs['dialog'].formRequestFn = createData
      })
    },
    handleEdit (row) {
      getDataById(row.id).then(({data}) => {
        this.pageState = false
        this.$nextTick(() => {
          this.$refs['dialog'].methodName = '编辑'
          this.$refs['dialog'].pageState = false
          this.$refs['dialog'].formData = data.data
          this.$refs['dialog'].formRequestFn = updateData
        })
      })
    },
    handleDeleteById (row) {
      this._handleGlobalDeleteById(row.id, deleteDataById)
    },
    resetForm () {
      this.pageState = true
      this.loadPage()
    },
  },
  created () {
    this.loadPage()
  },
}
</script>

<style lang="scss" scoped>
.contract {
  .head {
    margin-bottom: 10px;
  }
  .add-contract {
    text-align: center;
    height: 40px;
    line-height: 40px;
    border-bottom: 1px solid #ececec;
    cursor: pointer;
  }
  .recommend {
    .item {
      padding: 5px 15px;
      cursor: pointer;
    }
  }
}
</style>
