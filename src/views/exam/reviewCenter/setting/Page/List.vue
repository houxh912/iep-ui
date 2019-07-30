<template>
  <div>
    <basic-container>
      <iep-page-header title="考试设置" :data="[10, 5]"></iep-page-header>
      <operation-container>
        <template slot="left">
          <iep-button size="small" type="primary" icon="el-icon-plus" plain @click="handleAdd()">新增
          </iep-button>
        </template>
        <template slot="right">
          <operation-search @search-page="searchPage" advance-search>
            <advance-search @search-page="searchPage"></advance-search>
          </operation-search>
        </template>
      </operation-container>
      <iep-table :isLoadTable="isLoadTable" :pagination="pagination" :columnsMap="columnsMap"
        :pagedTable="pagedTable" @size-change="handleSizeChange"
        @current-change="handleCurrentChange" is-index>
        <el-table-column prop="operation" label="操作" width="220">
          <template slot-scope="scope">
            <operation-wrapper>
              <iep-button type="warning" @click="handleChild(scope.row, scope.index)"
                icon="el-icon-plus" plain>子项
              </iep-button>
              <iep-button @click="handleEdit(scope.row)" plain
                v-if="scope.row.id!=1 &&  scope.row.id!=3 &&  scope.row.id!=5">编辑
              </iep-button>
              <iep-button @click="handleDeleteById(scope.row)" plain
                v-if="scope.row.id!=1 && scope.row.id!=3 &&  scope.row.id!=5">删除
              </iep-button>
            </operation-wrapper>
          </template>
        </el-table-column>
      </iep-table>
    </basic-container>
    <setting-dialog ref="settingForm" @load-page="loadPage"></setting-dialog>
    <child-form ref="childForm" @load-page="loadPage"></child-form>
  </div>
</template>

<script>
import SettingDialog from './SettingDialog'
import mixins from '@/mixins/mixins'
import { columnsMap, initMemberForm } from './options'
import { dictList, addObj, putObj, delObj } from '@/api/exam/setting/setting'
import ChildForm from './ChildForm'
import AdvanceSearch from './AdvanceSearch'
export default {
  mixins: [mixins],
  components: { SettingDialog, ChildForm, AdvanceSearch },
  data () {
    return {
      columnsMap,
    }
  },
  created () {
    this.loadPage()
  },
  methods: {
    //加载列表
    async loadPage (param = this.searchForm) {
      await this.loadTable(param, dictList)
    },
    //新增
    handleAdd () {
      const { settingForm } = this.$refs
      settingForm.methodName = '创建'
      settingForm.dialogShow = true
      settingForm.formRequestFn = addObj
    },
    //编辑
    handleEdit (row) {
      const { settingForm } = this.$refs
      settingForm.methodName = '编辑'
      settingForm.dialogShow = true
      settingForm.formRequestFn = putObj
      settingForm.form = this.$mergeByFirst(initMemberForm(), row)
    },
    //删除
    handleDeleteById (row) {
      this._handleGlobalDeleteById(row.id, delObj)
    },

    //添加子项
    handleChild (row) {
      this.$refs['childForm'].id = row.id
      this.$refs['childForm'].dialogShow = true
      this.$refs['childForm'].loadPage()
    },
  },
}
</script>
<style lang="scss" scoped>
</style>