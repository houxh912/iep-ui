<template>
  <div class="execution">
    <basic-container>
      <iep-page-header title="密钥管理"></iep-page-header>
      <operation-container>
        <template slot="left">
          <iep-button v-if="sys_social_details_add" type="primary" @click="handleAdd()" icon="el-icon-plus" plain>新增</iep-button>
        </template>
        <template slot="right">
          <operation-search @search-page="searchPage">
          </operation-search>
        </template>
      </operation-container>
      <iep-table :isLoadTable="isLoadTable" :pagination="pagination" :columnsMap="columnsMap" :pagedTable="pagedTable" @size-change="handleSizeChange" @current-change="handleCurrentChange">
        <el-table-column prop="operation" label="操作" width="220">
          <template slot-scope="scope">
            <operation-wrapper>
              <iep-button type="warning" @click="handleChild(scope.row, scope.index)" icon="el-icon-plus" plain>子项
              </iep-button>
              <iep-button v-if="sys_social_details_edit" @click="handleEdit(scope.row)" plain>编辑
              </iep-button>
              <iep-button v-if="sys_social_details_del" @click="handleDel(scope.row, scope.index)" plain>删除
              </iep-button>
            </operation-wrapper>
          </template>
        </el-table-column>
      </iep-table>
    </basic-container>
    <dialog-form ref="DialogForm" @load-page="loadPage"></dialog-form>
  </div>
</template>

<script>
import {
  addObj,
  delObj,
  fetchList,
  putObj,
} from '@/api/admin/sys-social-details'
import { mapGetters } from 'vuex'
import mixins from '@/mixins/mixins'
import DialogForm from './DialogForm'
import { columnsMap, initForm } from './options'

export default {
  name: 'SysSocialDetails',
  components: { DialogForm },
  mixins: [mixins],
  data () {
    return {
      columnsMap,
      sys_social_details_add: false,
      sys_social_details_edit: false,
      sys_social_details_del: false,
    }
  },
  computed: {
    ...mapGetters(['permissions']),
  },
  created () {
    this.sys_social_details_add = this.permissions['sys_social_details_add']
    this.sys_social_details_edit = this.permissions['sys_social_details_edit']
    this.sys_social_details_del = this.permissions['sys_social_details_del']
    this.loadPage()
  },
  methods: {
    handleAdd () {
      this.$refs['DialogForm'].methodName = '添加'
      this.$refs['DialogForm'].formRequestFn = addObj
      this.$refs['DialogForm'].disabled = false
      this.$refs['DialogForm'].dialogShow = true
    },
    handleDel (row) {
      this._handleGlobalDeleteById(row.userId, delObj)
    },
    handleEdit (row) {
      this.$refs['DialogForm'].form = this.$mergeByFirst(initForm(), row)
      this.$refs['DialogForm'].methodName = '编辑'
      this.$refs['DialogForm'].formRequestFn = putObj
      this.$refs['DialogForm'].disabled = false
      this.$refs['DialogForm'].dialogShow = true
    },
    async loadPage (param = this.searchForm) {
      await this.loadTable(param, fetchList)
    },
  },
}
</script>
