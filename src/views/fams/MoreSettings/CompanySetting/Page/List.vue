<template>
  <div class="set-containter">
    <basic-container>
      <page-header title="线下公司设置"></page-header>
      <operation-container>
        <template slot="left">
          <iep-button @click="dialogFormVisible = true" type="primary" icon="el-icon-plus" size="small" plain>新增</iep-button>
          <el-dialog title="新增" :visible.sync="dialogFormVisible">
            <el-form :model="form" size="small">
              <el-form-item label="线下公司：" :label-width="formLabelWidth">
                <el-input v-model="form.name" autocomplete="off" placeholder="请输入线下公司名称"></el-input>
              </el-form-item>
              <el-form-item label="户头所属公司：" :label-width="formLabelWidth">
                <el-tag :key="tag" v-for="tag in dynamicTags" closable :disable-transitions="false" @close="handleClose(tag)">
                  {{tag}}
                </el-tag>
                <el-input class="input-new-tag" v-if="inputVisible" v-model="inputValue" ref="saveTagInput" size="small" @keyup.enter.native="handleInputConfirm" @blur="handleInputConfirm">
                </el-input>
                <el-button v-else class="button-new-tag" size="small" @click="showInput">添加</el-button>
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
              <el-form-item label="公司名称">
                <el-input v-model="paramForm.company"></el-input>
              </el-form-item>
              <el-form-item label="关联部门">
                <el-input v-model="paramForm.department"></el-input>
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
          <el-table-column label="公司名称" width="90px">
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
      dynamicTags: ['国脉研发中心', '国脉产品中心'],
      inputVisible: false,
      inputValue: '',
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
    loadPage (param = this.searchForm) {
      this.loadTable(param, getTalentPoolPage)
    },
    handleClose (tag) {
      this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1)
    },
    showInput () {
      this.inputVisible = true
      this.$nextTick(
        this.$refs.saveTagInput.$refs.input.focus()
      )
    },
    handleInputConfirm () {
      let inputValue = this.inputValue
      if (inputValue) {
        this.dynamicTags.push(inputValue)
      }
      this.inputVisible = false
      this.inputValue = ''
    },
  },
}
</script>
<style lang="css" scoped>
.set-containter >>> .el-dialog {
  width: 40%;
}
.el-tag + .el-tag {
  margin-left: 10px;
}
.button-new-tag {
  margin-left: 10px;
  height: 32px;
  line-height: 30px;
  padding-top: 0;
  padding-bottom: 0;
}
.input-new-tag {
  width: 140px;
  margin-left: 10px;
  vertical-align: bottom;
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
