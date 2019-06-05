<template>
  <div class="execution">
    <basic-container>
      <page-header title="终端管理"></page-header>
      <operation-container>
        <template slot="left">
          <iep-button type="primary" @click="handleAdd()" icon="el-icon-plus" plain>新增</iep-button>
        </template>
      </operation-container>
      <iep-table :isLoadTable="isLoadTable" :pagination="pagination" :columnsMap="columnsMap" :pagedTable="pagedTable" @size-change="handleSizeChange" @current-change="handleCurrentChange" @selection-change="handleSelectionChange">
        <template slot="before-columns">
          <el-table-column label="序号" width="90px">
            <template slot-scope="scope">
              <span>{{scope.$index+1}}</span>  
            </template>
          </el-table-column>
        </template>
        <el-table-column prop="operation" label="操作" width="220">
          <template slot-scope="scope">
            <operation-wrapper>
              <iep-button type="warning" @click="handleShow(scope.row)" plain>查看</iep-button>
              <iep-button v-if="permissions.sys_dict_edit" @click="handleEdit(scope.row, scope.index)" plain>编辑</iep-button>
              <iep-button v-if="permissions.sys_dict_del" @click="handleDel(scope.row)" plain>删除</iep-button>
            </operation-wrapper>
          </template>
        </el-table-column>
      </iep-table>
    </basic-container>
    <dialog-form ref="DialogForm" @load-page="loadPage"></dialog-form>
  </div>
</template>

<script>
import { addObj,delObj, fetchList, putObj } from '@/api/admin/client'
import { mapGetters } from 'vuex'
import mixins from '@/mixins/mixins'
import DialogForm from './DialogForm'
import { columnsMap, initMemberForm } from './options'

export default {
  name: 'Client',
  components: { DialogForm },
  mixins: [mixins],
  data () {
    return {
      columnsMap,
      currentId: 1,
      tableLoading: false,
      dialogShow: false,
    }
  },
  created () {
    this.loadPage()
  },
  mounted: function () { },
  computed: {
    ...mapGetters(['permissions']),
  },
  methods: {
    handleShow (row) {
      this.$refs['DialogForm'].form = this.$mergeByFirst(initMemberForm(), row)
      this.$refs['DialogForm'].methodName = '查看'
      this.$refs['DialogForm'].disabled = true
      this.$refs['DialogForm'].dialogShow = true
      this.$refs['DialogForm'].disEdit = false
    },
    handleAdd (){
      this.$refs['DialogForm'].methodName = '添加'
      this.$refs['DialogForm'].formRequestFn = addObj
      this.$refs['DialogForm'].disabled = false
      this.$refs['DialogForm'].dialogShow = true
      this.$refs['DialogForm'].disEdit = true
    },
    handleEdit (row) {
      this.$refs['DialogForm'].form = this.$mergeByFirst(initMemberForm(), row)
      this.$refs['DialogForm'].methodName = '编辑'
      this.$refs['DialogForm'].formRequestFn = putObj
      this.$refs['DialogForm'].disabled = false
      this.$refs['DialogForm'].dialogShow = true
      this.$refs['DialogForm'].disEdit = true
    },
    handleSelectionChange (val) {
      this.multipleSelection = val.map(m => m.userId)
    },
    handleDel (row) {
      this._handleGlobalDeleteById(row.userId,delObj)
    },
    async loadPage (param = this.searchForm) {
      await this.loadTable(param, fetchList)
    },
  },
}
</script>

<style lang="scss" scoped></style>
