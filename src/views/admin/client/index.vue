<template>
  <div class="execution">
    <basic-container>
      <iep-page-header title="终端管理"></iep-page-header>
      <operation-container>
        <template slot="left">
          <iep-button v-if="sys_client_add" type="primary" @click="handleAdd()" icon="el-icon-plus" plain>新增</iep-button>
        </template>
      </operation-container>
      <iep-table :isLoadTable="isLoadTable" :pagination="pagination" :columnsMap="columnsMap" :pagedTable="pagedTable" @size-change="handleSizeChange" @current-change="handleCurrentChange">
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
              <iep-button v-if="sys_client_edit" @click="handleEdit(scope.row, scope.index)" plain>编辑</iep-button>
              <iep-button v-if="sys_client_del" @click="handleDel(scope.row)" plain>删除</iep-button>
            </operation-wrapper>
          </template>
        </el-table-column>
      </iep-table>
    </basic-container>
    <dialog-form ref="DialogForm" @load-page="loadPage"></dialog-form>
  </div>
</template>

<script>
import { addObj, delObj, fetchList, putObj } from '@/api/admin/client'
import { mapGetters } from 'vuex'
import mixins from '@/mixins/mixins'
import DialogForm from './DialogForm'
import { columnsMap, initForm } from './options'

export default {
  name: 'Client',
  components: { DialogForm },
  mixins: [mixins],
  data () {
    return {
      columnsMap,
      sys_client_add: false,
      sys_client_edit: false,
      sys_client_del: false,
    }
  },
  created () {
    this.sys_client_add = this.permissions['sys_client_add']
    this.sys_client_edit = this.permissions['sys_client_edit']
    this.sys_client_del = this.permissions['sys_client_del']
    this.loadPage()
  },
  computed: {
    ...mapGetters(['permissions']),
  },
  methods: {
    handleShow (row) {
      this.$refs['DialogForm'].form = this.$mergeByFirst(initForm(), row)
      this.$refs['DialogForm'].methodName = '查看'
      this.$refs['DialogForm'].disabled = true
      this.$refs['DialogForm'].dialogShow = true
      this.$refs['DialogForm'].disEdit = false
    },
    handleAdd () {
      this.$refs['DialogForm'].methodName = '添加'
      this.$refs['DialogForm'].formRequestFn = addObj
      this.$refs['DialogForm'].disabled = false
      this.$refs['DialogForm'].dialogShow = true
      this.$refs['DialogForm'].disEdit = true
    },
    handleEdit (row) {
      this.$refs['DialogForm'].form = this.$mergeByFirst(initForm(), row)
      this.$refs['DialogForm'].methodName = '编辑'
      this.$refs['DialogForm'].formRequestFn = putObj
      this.$refs['DialogForm'].disabled = false
      this.$refs['DialogForm'].dialogShow = true
      this.$refs['DialogForm'].disEdit = true
    },
    handleDel (row) {
      this._handleGlobalDeleteById(row.clientId, delObj)
    },
    async loadPage (param = this.searchForm) {
      await this.loadTable(param, fetchList)
    },
  },
}
</script>
