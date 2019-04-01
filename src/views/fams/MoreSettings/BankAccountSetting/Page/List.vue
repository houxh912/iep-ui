<template>
  <div class="set-containter">
    <basic-container>
      <page-header title="银行户头设置"></page-header>
      <operation-container>
        <template slot="left">
          <iep-button @click="dialogFormVisible = true" type="danger" icon="el-icon-plus" size="small" plain>新增</iep-button>
          <el-dialog title="新增" :visible.sync="dialogFormVisible">
            <el-form :model="form" size="small">
              <el-form-item label="银行户头名称" :label-width="formLabelWidth">
                <el-input v-model="form.name" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="户头所属公司" :label-width="formLabelWidth">
                <el-select v-model="form.region" placeholder="请选择">
                  <el-option label="浙江蟠桃会网络信息技术有限公司" value="shanghai"></el-option>
                  <el-option label="国脉海洋信息发展有限公司" value="beijing"></el-option>
                </el-select>
              </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
              <el-button type="primary" @click="dialogFormVisible = false" size="small">确 定</el-button>
              <el-button @click="dialogFormVisible = false" size="small">取 消</el-button>
            </div>
          </el-dialog>
        </template>
        <template slot="right">
          <operation-search @search="searchPage" advance-search>
            <el-form :model="paramForm" label-width="100px" size="mini">
              <el-form-item label="线下公司：">
                <el-input v-model="paramForm.company"></el-input>
              </el-form-item>
              <el-form-item label="银行户头：">
                <el-input v-model="paramForm.account"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="searchPage">搜索</el-button>
                <el-button>取消</el-button>
              </el-form-item>
            </el-form>
          </operation-search>
        </template>
      </operation-container>
      <iep-table :isLoadTable="isLoadTable" :pagination="pagination" :columnsMap="columnsMap" :pagedTable="pagedTable" @size-change="handleSizeChange" @current-change="handleCurrentChange" @selection-change="handleSelectionChange" is-mutiple-selection>
        <template slot="before-columns">
          <el-table-column label="银行户头" width="90px">
            <template slot-scope="scope">
              <iep-table-link @click="handleDetail(scope.row)">{{scope.row.name}}</iep-table-link>
            </template>
          </el-table-column>
        </template>
      </iep-table>
    </basic-container>
  </div>
</template>
<script>
import { getTalentPoolPage } from '@/api/hrms/talent_pool'
import mixins from '@/mixins/mixins'
import { columnsMap, initSearchForm } from '../options'
export default {
  mixins: [mixins],
  data () {
    return {
      columnsMap,
      paramForm: initSearchForm(),
      value: '',
      dialogFormVisible: false,
      form: {
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: '',
      },
      formLabelWidth: '120px',
    }
  },
  created () {
    this.loadPage()
  },
  methods: {
    handleSelectionChange (val) {
      this.multipleSelection = val.map(m => m.id)
    },
    handleDetail (row) {
      this.$emit('onDetail', row)
    },
    // handleRejected (row) {
    //   console.log(row)
    //   this.$refs['RejectedDialog'].dialogShow = true
    // },
    loadPage (param = this.paramForm) {
      this.loadTable(param, getTalentPoolPage)
    },
  },
}
</script>
<style lang="css" scoped>
.set-containter >>> .el-dialog {
  width: 40%;
}
.set-containter >>> .el-dialog__footer {
  text-align: center;
}
.set-containter >>> .el-dialog__header .el-dialog__title {
  font-size: 16px;
}
.set-containter >>> .el-dialog__header {
  border-bottom: 1px solid #ebeef5;
}
</style>
