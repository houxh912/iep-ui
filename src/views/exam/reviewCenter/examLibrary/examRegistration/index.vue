<template>
  <div>
    <operation-container>
      <template slot="left">
        <iep-button @click="handleAuditAll" icon="el-icon-plus" type="primary" plain>批量审核</iep-button>
        <iep-button @click="handleDeleteAll">批量删除</iep-button>
        <span v-show="selectValue">当前表格已选择 {{selectTotal}} 项</span>
      </template>
      <template slot="right">
        <operation-search @search-page="searchPage">
          <!-- <advance-search @search-page="searchPage"></advance-search> -->
        </operation-search>
      </template>
    </operation-container>
    <iep-table :isLoadTable="isLoadTable" :pagination="pagination"
      :pagedTable="pagedTable" @size-change="handleSizeChange" @current-change="handleCurrentChange"
      isMutipleSelection @selection-change="selectionChange" is-mutiple-selection is-index>
      <el-table-column prop="examineeId" label="姓名">
        <template slot-scope="scope">
          {{scope.row.examineeId}}
        </template>
      </el-table-column>
      <el-table-column prop="examineeNumber" label="工号">
        <template slot-scope="scope">
          {{scope.row.examineeNumber}}
        </template>
      </el-table-column>
      <el-table-column prop="department" label="部门" width="110">
        <template slot-scope="scope">
          {{scope.row.department}}
        </template>
      </el-table-column>
      <el-table-column prop="examinationNumber" label="准考证号" min-width="110">
        <template slot-scope="scope">
          {{scope.row.examinationNumber}}
        </template>
      </el-table-column>
      <el-table-column prop="signupTime" label="报名时间" min-width="150">
        <template slot-scope="scope">
          {{scope.row.signupTime}}
        </template>
      </el-table-column>
      <el-table-column prop="state" label="报名状态">
        <template slot-scope="scope">
          <el-tag
            type="warning"
            size="medium"
            v-if="scope.row.state === 2"
          >取消资格</el-tag>
          <el-tag
            type="success"
            size="medium"
            v-if="scope.row.state === 1"
          >报名成功</el-tag>
          <el-tag
            type="info"
            size="medium"
            v-if="scope.row.state === 0"
          >报名中</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="报名资质">
        <template>
          <iep-button size="small">查看资质</iep-button>
        </template>
      </el-table-column>
      <el-table-column prop="operation" label="操作" width="190">
        <template slot-scope="scope">
          <operation-wrapper style="padding-top: 4px;">
            <iep-button type="warning" size="small" plain @click="handlePass(scope.row)">审核通过</iep-button>
            <iep-button size="small" plain @click="handleCancel(scope.row)">撤销资格</iep-button>
          </operation-wrapper>
        </template>
      </el-table-column>
    </iep-table>
  </div>
</template>

<script>
import mixins from '@/mixins/mixins'
import { getExamRegistrationList,passExamerById,cancelExamerById } from '@/api/exam/examLibrary/examRegistration/examRegistration'

export default {
  mixins: [mixins],
  props: ['record'],
  data () {
    return {
      selectTotal: '',
      selectValue: false,
      selectionValue: '',
      paramForm: {},
      selectList: [],
    }
  },
  created () {
    this.loadPage()
    this.setPermission()
  },
  methods: {
    loadPage (param) {
      console.log('record',this.record)
      const params = {
        examinationId: this.record.row.id,
      }
      this.loadTable({...param, ...params}, getExamRegistrationList)
    },
    setPermission () {
      // this.permission_edit = this.permissions['mlms_datum_edit']
      this.permission_edit = true
    },
    // 清空搜索
    clearSearchParam () { },
    /**
     * 审核通过按钮
     */
    handlePass (row) {
      this._handleComfirm([row.id], passExamerById,'通过审核')
    },
    /**
     * 取消资格按钮
     */
    handleCancel (row){
      this._handleComfirm([row.id], cancelExamerById,'撤销资格')
    },
    /**
     * 批量审核按钮
     */
    handleAuditAll (){
      if (this.selectValue == false){
        this.$message.error('请至少选择一名报名人员！')
        return
      }
      if (this.selectValue == true){
        // deleteSelectDate (this.selectionValue).then(() => {
        //   this.$message({
        //     message: '操作成功',
        //     type: 'success',
        //   })
        //   this.loadPage()
        // })
        this.$message.success('功能开发中！')
      }
    },
    /**
     * 批量删除按钮
     */
    handleDeleteAll (){
      if (this.selectValue == false){
        this.$message.error('请至少选择一名报名人员！')
        return
      }
      if (this.selectValue == true){
        // deleteSelectDate (this.selectionValue).then(() => {
        //   this.$message({
        //     message: '操作成功',
        //     type: 'success',
        //   })
        //   this.loadPage()
        // })
        this.$message.success('功能开发中！')
      }
    },
    /**
     * 选择试题
     */
    selectionChange (val) {
      // console.log(val.map(m => m.id))
      if (val.map(m => m.id) == ''){
        this.selectValue = false
        return
      }
      else{
        this.selectValue = true
        this.selectionValue = val.map(m => m.id)
        console.log(this.selectionValue)
        this.selectTotal = this.selectionValue.length
        return
      }
    },
  },
}
</script>
