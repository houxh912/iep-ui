<template>
  <div>
    <basic-container>
      <iep-page-header title="产品模块"></iep-page-header>
      <operation-container>
        <template slot="left">
          <iep-button v-if="cpms_modules_add" @click="handleAdd" type="primary" icon="el-icon-plus" plain>新增</iep-button>
          <el-checkbox-group v-model="checkList" @change="handleChangeMe">
            <el-checkbox label="1">只看我登记的</el-checkbox>
            <el-checkbox label="2">只看我负责的</el-checkbox>
          </el-checkbox-group>
        </template>
        <template slot="right">
          <operation-search @search-page="searchPage" advance-search>
            <advance-search @search-page="searchPage"></advance-search>
          </operation-search>
        </template>
      </operation-container>
      <iep-table :isLoadTable="isLoadTable" :pagination="pagination" :pagedTable="pagedTable" :dictsMap="dictsMap" :columnsMap="columnsMap" @size-change="handleSizeChange" @current-change="handleCurrentChange">
        <template slot="before-columns">
          <el-table-column label="名称" min-width="200px">
            <template slot-scope="scope">
              <iep-table-link-img-desc :img="scope.row.imageUrl" :desc="scope.row.synopsis" :name="scope.row.name" @m-click="handleDetail(scope.row)"></iep-table-link-img-desc>
            </template>
          </el-table-column>
          <el-table-column label="负责人">
            <template slot-scope="scope">
              <iep-div-detail :value="scope.row.chargeNames.join('、')"></iep-div-detail>
            </template>
          </el-table-column>
        </template>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <operation-wrapper>
              <iep-button v-if="_isNeedApproval(scope.row)" @click="handlePass(scope.row)">通过</iep-button>
              <iep-button v-if="_isNeedApproval(scope.row)" @click="handleReject(scope.row)">驳回</iep-button>
              <iep-button :disabled="isEditDelPermissions(scope.row)" type="warning" plain @click="handleEdit(scope.row)">编辑</iep-button>
              <iep-button :disabled="isEditDelPermissions(scope.row)" @click="handleDelete(scope.row)">删除</iep-button>
              <iep-button v-if="scope.row.status===1" @click="handleModuleClick(scope.row.id)">加入定制</iep-button>
            </operation-wrapper>
          </template>
        </el-table-column>
      </iep-table>
    </basic-container>
  </div>
</template>

<script>
import { putModuleById } from '@/api/app/cpms/custom_module'
import { getModulePage, deleteModuleById, passModule, rejectModule } from '@/api/cpms/module'
import mixins from '@/mixins/mixins'
import AdvanceSearch from './AdvanceSearch'
import { dictsMap, columnsMap } from '../options'
import { mapGetters } from 'vuex'
export default {
  mixins: [mixins],
  components: { AdvanceSearch },
  data () {
    return {
      dictsMap,
      columnsMap,
      checkList: [],
      isMine: null,
      cpms_modules_add: false,
      cpms_modules_view: false,
      cpms_modules_edit_del: false,
      cpms_modules_review: false,
    }
  },
  computed: {
    ...mapGetters([
      'userInfo',
      'permissions',
    ]),
  },
  created () {
    this.cpms_modules_add = this.permissions['cpms_modules_add']
    this.cpms_modules_view = this.permissions['cpms_modules_view']
    this.cpms_modules_edit_del = this.permissions['cpms_modules_edit_del']
    this.cpms_modules_review = this.permissions['cpms_modules_review']
    this.loadPage()
  },
  methods: {
    _isNeedApproval (row) {
      if (row.status !== 0) {
        return false
      } else {
        if (this.cpms_modules_review) {
          return true
        }
        return false
      }
    },
    async handlePass (row) {
      await passModule(row.id)
      this.loadPage()
    },
    async handleReject (row) {
      await rejectModule(row.id)
      this.loadPage()
    },
    isEditDelPermissions (row) {
      return !(this.cpms_modules_edit_del || this.userInfo.userId === row.creatorId)
    },
    isViewPermissions (row) {
      return this.cpms_modules_view || this.userInfo.userId === row.creatorId
    },
    handleAdd () {
      this.$router.push({
        path: '/cpms_spa/module_edit/0',
      })
    },
    handleEdit (row) {
      this.$router.push({
        path: `/cpms_spa/module_edit/${row.id}`,
      })
    },
    handleDetail (row) {
      if (!this.isViewPermissions(row)) {
        return
      }
      this.$emit('onDetail', {
        id: row.id,
      })
    },
    handleModuleClick (moduleId) {
      putModuleById(moduleId).then((data) => {
        const resData = data.data.data
        if (resData) {
          this.$message({
            message: '操作成功',
            type: 'success',
          })
        } else {
          this.$message({
            message: '已经加入定制了，亲，请不要重复订购',
            type: 'warming',
          })
        }
      })
    },
    handleChangeMe (value) {
      const isMine = value.join(',')
      this.isMine = isMine
      this.loadPage()
    },
    handleDelete (row) {
      this._handleGlobalDeleteById(row.id, deleteModuleById)
    },
    loadPage (param = this.searchForm) {
      this.loadTable({ ...param, isMine: this.isMine }, getModulePage)
    },
  },
}
</script>
