<template>
  <div>
    <basic-container>
      <iep-page-header title="我的证书"></iep-page-header>
      <operation-container>
        <template slot="right">
          <operation-search @search-page="searchPage">
          </operation-search>
        </template>
      </operation-container>
      <iep-table :columnsMap="columnsMap" :isLoadTable="isLoadTable" :pagination="pagination" :pagedTable="pagedTable" @size-change="handleSizeChange" @current-change="handleCurrentChange" is-index>
        <el-table-column prop="operation" label="操作" width="150">
          <template slot-scope="scope">
            <operation-wrapper>
              <iep-button type="warning" plain @click="handleView(scope.row)">查看</iep-button>
            </operation-wrapper>
          </template>
        </el-table-column>
      </iep-table>
      <el-dialog title="查看证书" :visible.sync="dialogVisible" :close-on-click-modal="false" width="700px" @close="dialogVisible = false">
        <el-form ref="form" :model="form" label-width="100px" :rules="rules" style="margin-right:30px">
          <el-form-item label="科目：" prop="subject">
            <el-input readonly v-model="form.subject"></el-input>
          </el-form-item>
          <el-form-item label="名称：" prop="title">
            <el-input :maxlength="80" v-model="form.title"></el-input>
          </el-form-item>
          <el-form-item label="级别：" prop="levelName">
            <el-input :maxlength="80" v-model="form.levelName"></el-input>
          </el-form-item>
          <el-form-item label="编发机构：" prop="deptName">
            <el-input :maxlength="80" v-model="form.deptName"></el-input>
          </el-form-item>
        </el-form>
      </el-dialog>
    </basic-container>
  </div>
</template>
<script>
import { getCertificatePage } from '@/api/exam/review'
import mixins from '@/mixins/mixins'
const columnsMap = [
  {
    label: '科目',
    prop: 'subject',
    width: 150,
  },
  {
    label: '证书名称',
    prop: 'title',
  },
  {
    label: '级别',
    prop: 'levelName',
    width: 150,
  },
  {
    label: '颁发机构',
    prop: 'deptName',
    width: 200,
  },
]
export default {
  mixins: [mixins],
  data () {
    return {
      columnsMap,
      dialogVisible: false,
      form: {},
      rules: {},
    }
  },
  created () {
    this.loadPage()
  },
  methods: {
    /**
     * 获取证书分页数据
     */
    loadPage (param = this.searchForm) {
      this.loadTable(param, getCertificatePage)
    },

    handleView (row) {
      this.dialogVisible = true
      this.form = { ...row }
    },
  },
}
</script>