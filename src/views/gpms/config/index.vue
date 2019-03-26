<template>
  <div>
    <basic-container>
      <div v-show="hidsadd">
        <page-header title="我的配置" :replaceText="replaceText" :data="[16]"></page-header>
        <operation-container>
          <template slot="left">
            <iep-button @click="add()" type="danger" icon="el-icon-plus">新增</iep-button>
          </template>
          <template slot="right">
            <operation-search @search="searchPage"></operation-search>
          </template>
        </operation-container>
        <iep-table :isLoadTable="isLoadTable" :pagination="pagination" :columnsMap="columnsMap" :pagedTable="pagedTable" @size-change="handleSizeChange" @current-change="handleCurrentChange" is-mutiple-selection>
          <el-table-column prop="operation" label="操作" width="220">
            <template slot-scope="scope">
              <operation-wrapper>
                <el-button type="text" @click="details(scope.row)" size="small">详情</el-button>
                <el-button type="text" @click="update(scope.row)" size="small">编辑</el-button>
                <el-button type="text" @click="deletes(scope.row)" size="small">删除</el-button>
              </operation-wrapper>
            </template>
          </el-table-column>
        </iep-table>
      </div>
      <!-- 新增 -->
      <div class="addDia" v-show='!hidsadd'>
        <el-row type="flex" class="row-bg" justify="space-between">
          <el-col class="cent" :span="9"><p class="addFont sixsix">新增</p></el-col>
          <el-col :span="9" class="cent">
            <iep-button class="callbackAdd" @click='goindex'>返回</iep-button>
          </el-col>
        </el-row>
        <el-row type="flex" justify="center">
          <el-col :span="15">
            <el-form :label-position="'top'" :model="formLabelAlign" :rules="rules" ref="ruleForm">
              <el-form-item label="名称" prop='name'>
                <el-input v-model="formLabelAlign.name" placeholder="请输入名称"></el-input>
              </el-form-item>
              <el-form-item label="具体说明" prop='explain'>
                <el-input v-model="formLabelAlign.explain" placeholder="请输入说明"></el-input>
              </el-form-item>
              <el-form-item label="是否必填" prop='whether'>
                <el-select v-model="formLabelAlign.whether" placeholder="请选择是否必填">
                  <el-option label="是" value="shi"></el-option>
                  <el-option label="否" value="fou"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="项目类型" prop='objType'>
                <el-select v-model="formLabelAlign.objType" placeholder="请选择项目类型">
                  <el-option label="内部项目" value="nei"></el-option>
                  <el-option label="外部项目" value="wai"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="业务类型" prop='type'>
                <el-select v-model="formLabelAlign.type" placeholder="请选择业务类型">
                  <el-option label="咨询" value="zixun"></el-option>
                  <el-option label="产品" value="chanpin"></el-option>
                  <el-option label="数据" value="shuju"></el-option>
                  <el-option label="外包" value="waibao"></el-option>
                  <el-option label="会议培训" value="huiyi"></el-option>
                  <el-option label="平台" value="pingtai"></el-option>
                  <el-option label="技术服务" value="jishu"></el-option>
                  <el-option label="其他" value="qita"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="排序值" prop='num'>
                <el-input v-model="formLabelAlign.num" placeholder="请输入排序值（数字）"></el-input>
              </el-form-item>
              <el-form-item label="URL链接" prop='links'>
                <el-input v-model="formLabelAlign.links" placeholder="请输入URL链接"></el-input>
              </el-form-item>
              <el-form-item>
                <el-row>
                  <el-col :span="6" :push="10">
                    <el-button plain type="danger" @click="submitForm('ruleForm')">保存</el-button>
                    <el-button @click='goindex'>返回</el-button>
                  </el-col>
                </el-row>
              </el-form-item>
            </el-form>
          </el-col>
        </el-row>
      </div>
    </basic-container>
      
  </div>
</template>

<script>
import { getTrainingRecordPage } from '@/api/hrms/training_record'
import mixins from '@/mixins/mixins'
import { columnsMap, initSearchForm } from './options'
export default {
  mixins: [mixins],
  data () {
    return {
      dialogShow:false,
      columnsMap,
      paramForm: initSearchForm(),
      replaceText: (data) => `（共${data[0]}项资源)`,
      dateVal: '',
      hidsadd:true,
      formLabelAlign:{
        name:'',
        explain:'',
        whether:'',
        objType:'',
        type:'',
        num:'',
        links:'',
      },
      rules:{
        name:[
          { required: true, message: '请输入名称', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' },
        ],
        objType: [
          { required: true, message: '请选择项目类型', trigger: 'change' },
        ],
        type: [
          { required: true, message: '请选择业务类型', trigger: 'change' },
        ],
        num: [
          { required: true, message: '请输入排序值', trigger: 'blur' },
        ],
        links: [
          { required: true, message: '请输入URL', trigger: 'blur' },
        ],
      },
    }
  },
  created () {
    this.loadPage()
  },
  methods: {
    clearSearchParam () {
      this.paramForm = initSearchForm()
      this.$emit('clear-search-param')
    },
    loadPage (param = this.paramForm) {
      this.loadTable(param, getTrainingRecordPage)
    },
    searchPage () {
      this.$emit('search-page', this.paramForm)
    },
    add (){
      this.hidsadd = false
    },
    details (){
    },
    update (row){
      console.log(row)
    },
    deletes (row){
      console.log(row)
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }).then(() => {
        this.$message({
          type: 'success',
          message: '删除成功!',
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除',
        })       
      })
    },
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert('submit!')
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    goindex (){
      this.hidsadd = !this.hidsadd
      this.$refs['ruleForm'].resetFields()
    },
  },
}
</script>

<style lang="scss" scoped>
  .addDia{
    width: 100%;
    background-color: #fff;
  }
  .row-bg{
    padding: 0 20px;
    border-bottom: 1px solid #f8f8f8;
  }
  .callbackAdd{
    float: right;
    margin-top: 15px;
  }
  .addFont{
    font-weight: bold;
    font-size: 18px;
  }
  .cent{
    margin: 0;
  }
  .sixsix{
    color: #666666;
  }
</style>


