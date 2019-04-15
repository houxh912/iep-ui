<template>
  <div>
    <basic-container>
      <page-header title="技术应用"></page-header>
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
        <el-table-column label="操作">
          <template slot-scope="scope">
            <operation-wrapper>
              <iep-button type="warning" plain @click="handleEdit(scope.row)">编辑</iep-button>
              <iep-button @click="handleDelete(scope.row)">删除</iep-button>
            </operation-wrapper>
          </template>
        </el-table-column>
      </iep-table>
    </basic-container>
  </div>
</template>

<script>
import { getTechnologyPage, postTechnology, putTechnology, deleteTechnologyById } from '@/api/cpms/technology'
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
        formRequestFn: postTechnology,
        methodName: '新增',
        id: false,
      })
    },
    handleEdit (row) {
      this.$emit('onEdit', {
        formRequestFn: putTechnology,
        methodName: '修改',
        id: row.id,
      })
    },
    handleDetail (row) {
      this.$router.push({
        path: '/cpms_spa/technology_detail',
        query: {
          id: row.id,
          redirect: this.$route.fullPath,
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
    handleDelete (row) {
      this._handleGlobalDeleteById(row.id, deleteTechnologyById)
    },
    loadPage (param) {
      this.loadTable({ ...param, type: this.type }, getTechnologyPage)
    },
  },
}
</script>
