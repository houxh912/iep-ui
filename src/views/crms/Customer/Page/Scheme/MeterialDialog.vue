<template>
  <iep-dialog :dialog-show="dialogShow" title="添加关联材料" width="50%" @close="close">
    <div class="search">
      <el-input placeholder="请输入内容" v-model="materialName" maxlength="100" size="small">
        <template slot="append">
          <el-button @click="search" size="mini">搜索</el-button>
        </template>
      </el-input>
    </div>
    <iep-table :isLoadTable="isLoadTable" :pagination="pagination" :columnsMap="columnsMap" :pagedTable="pagedTable" @size-change="handleSizeChange" @current-change="handleCurrentChange">
      <template slot="before-columns">
        <el-table-column label="名称">
          <template slot-scope="scope">
            <div class="custom-name">{{scope.row.name}}</div>
            <el-col class="custom-tags">
              <el-tag type="info" size="mini" v-for="(item, index) in scope.row.code" :key="index">{{item}}</el-tag>
            </el-col>
          </template>
        </el-table-column>
      </template>
      <el-table-column prop="operation" label="操作">
        <template slot-scope="scope">
          <operation-wrapper>
            <iep-button type="warning" plain @click="select(scope.row)">添加</iep-button>
          </operation-wrapper>
        </template>
      </el-table-column>
    </iep-table>
  </iep-dialog>
</template>

<script>
import mixins from '@/mixins/mixins'
import { tableOption } from './options'
import { getTableData } from '@/api/mlms/material/datum/material'
export default {
  mixins: [mixins],
  data () {
    return {
      dialogShow: false,
      columnsMap: tableOption,
      materialName: '',
    }
  },
  created () {
    this.loadPage()
  },
  methods: {
    close () {
      // this.formData = initForm()
      this.dialogShow = false
      // this.$emit('load-page')
    },
    loadPage (param) {
      this.loadTable(param, getTableData)
    },
    select (row) {
      this.$confirm('此操作将关联该材料至方案, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }).then(() => {
        this.dialogShow = false
        this.$emit('add', row)
      })
    },
    search () {
      this.loadTable({ materialName: this.materialName }, getTableData)
    },
  },
}
</script>

<style scoped>
.search {
  margin-bottom: 10px;
}
</style>
