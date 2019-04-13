<template>
  <div>
    <basic-container>
      <page-header title="模块清单"></page-header>
      <operation-container>
        <template slot="left">
          <iep-button @click="handleAdd" type="primary" icon="el-icon-plus" plain>新增</iep-button>
          <el-checkbox-group v-model="checkList" @change="handleChangeMe">
            <el-checkbox label="1">只看我登记的</el-checkbox>
          </el-checkbox-group>
        </template>
        <template slot="right">
          <operation-search @search-page="searchPage">
          </operation-search>
        </template>
      </operation-container>
      <iep-table :isLoadTable="false" :pagination="pagination" :pagedTable="pagedTable" @size-change="handleSizeChange" @current-change="handleCurrentChange">
        <el-table-column label="名称" min-width="200px">
          <template slot-scope="scope">
            <IepTableLinkImgDesc :img="scope.row.imageUrl" :desc="scope.row.synopsis" :name="scope.row.name" @click.native="handleDetail(scope.row)"></IepTableLinkImgDesc>
          </template>
        </el-table-column>
        <el-table-column label="负责人">
          <template slot-scope="scope">
            <iep-detail-tag :value="scope.row.chargeNames"></iep-detail-tag>
          </template>
        </el-table-column>
        <el-table-column label="上线时间">
          <template slot-scope="scope">
            {{scope.row.onlineTime}}
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <operation-wrapper>
              <iep-button type="warning" plain @click="handleEdit(scope.row)">编辑</iep-button>
              <iep-button @click="handleShare(scope.row)">分享</iep-button>
            </operation-wrapper>
          </template>
        </el-table-column>
      </iep-table>
    </basic-container>
  </div>
</template>

<script>
import { getModulePage, postModule, putModule } from '@/api/cpms/module'
import mixins from '@/mixins/mixins'
export default {
  mixins: [mixins],
  data () {
    return {
      checkList: [],
      type: null,
    }
  },
  created () {
    this.loadPage()
  },
  methods: {
    handleAdd () {
      this.$emit('onEdit', {
        formRequestFn: postModule,
        methodName: '新增',
        id: false,
      })
    },
    handleEdit (row) {
      this.$emit('onEdit', {
        formRequestFn: putModule,
        methodName: '修改',
        id: row.id,
      })
    },
    handleDetail (row) {
      this.$router.push({
        path: '/cpms_spa/product_detail',
        query: {
          id: row.id,
        },
      })
    },
    handleChangeMe (value) {
      if (value.length) {
        this.type = value[0]
      } else {
        this.type = undefined
      }
      this.loadPage()
    },
    handleShare () {
      this.$message.success('功能开发中')
    },
    loadPage (param) {
      this.loadTable({ ...param, type: this.type }, getModulePage)
    },
  },
}
</script>
