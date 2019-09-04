<template>
  <div>
    <basic-container>
      <iep-page-header title="组合系统"></iep-page-header>
      <operation-container>
        <template slot="left">
          <iep-button v-if="cpms_products_add" @click="handleAdd" type="primary" icon="el-icon-plus" plain>新增</iep-button>
          <el-checkbox-group v-model="checkList" @change="handleChangeMe">
            <el-checkbox label="1">只看我登记的</el-checkbox>
            <el-checkbox label="2">只看我负责的</el-checkbox>
          </el-checkbox-group>
        </template>
        <template slot="right">
          <operation-search @search-page="searchPage">
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
              <iep-button v-if="scope.row.status===1" @click="handleProductClick(scope.row.id)">加入定制</iep-button>
            </operation-wrapper>
          </template>
        </el-table-column>
      </iep-table>
    </basic-container>
  </div>
</template>

<script>
import { putProductById } from '@/api/app/cpms/custom_module'
import { getProductPage, deleteProductById, passProduct, rejectProduct } from '@/api/cpms/product'
import { mapGetters } from 'vuex'
import mixins from '@/mixins/mixins'
import { dictsMap, columnsMap } from '../options'
export default {
  mixins: [mixins],
  data () {
    return {
      dictsMap,
      columnsMap,
      checkList: [],
      isMine: null,
      cpms_products_add: false,
      cpms_products_view: false,
      cpms_products_edit_del: false,
      cpms_products_review: false,
    }
  },
  computed: {
    ...mapGetters([
      'userInfo',
      'permissions',
    ]),
  },
  created () {
    this.cpms_products_add = this.permissions['cpms_products_add']
    this.cpms_products_view = this.permissions['cpms_products_view']
    this.cpms_products_edit_del = this.permissions['cpms_products_edit_del']
    this.cpms_products_review = this.permissions['cpms_products_review']
    this.loadPage()
  },
  methods: {
    _isNeedApproval (row) {
      if (row.status !== 0) {
        return false
      } else {
        if (this.cpms_products_review) {
          return true
        }
        return false
      }
    },
    async handlePass (row) {
      await passProduct(row.id)
      this.loadPage()
    },
    async handleReject (row) {
      await rejectProduct(row.id)
      this.loadPage()
    },
    isEditDelPermissions (row) {
      return !(this.cpms_products_edit_del || this.userInfo.userId === row.creatorId || row.userRelationCharges.map(m => m.id).includes(this.userInfo.userId))
    },
    handleProductClick (productId) {
      putProductById(productId).then(() => {
        this.$message({
          type: 'success',
          message: '加入成功',
        })
      })
    },
    isViewPermissions (row) {
      return this.cpms_products_view || this.userInfo.userId === row.creatorId
    },
    handleAdd () {
      this.$router.push({
        path: '/cpms_spa/product_edit/0',
      })
    },
    handleEdit (row) {
      this.$router.push({
        path: `/cpms_spa/product_edit/${row.id}`,
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
    handleChangeMe (value) {
      const isMine = value.join(',')
      this.isMine = isMine
      this.loadPage()
    },
    handleDelete (row) {
      this._handleGlobalDeleteById(row.id, deleteProductById)
    },
    loadPage (param = this.searchForm) {
      this.loadTable({ ...param, isMine: this.isMine }, getProductPage)
    },
  },
}
</script>
