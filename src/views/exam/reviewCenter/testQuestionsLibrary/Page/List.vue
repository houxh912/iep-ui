<template>
  <div>
    <basic-container>
      <iep-page-header title="试题库管理" :data="[10, 5]"></iep-page-header>
      <operation-container>
        <template slot="left">
          <iep-button @click="handleAdd" icon="el-icon-plus" type="primary" plain v-if="exam_question_add">新增试题</iep-button>
          <iep-button @click="handleBatchExamine ">批量审核</iep-button>
          <iep-button @click="handleDeleteAll" v-if="exam_question_del">批量删除</iep-button>
        </template>
        <template slot="right">
          <operation-search @search-page="searchPage" :params="searchForm.title" prop="title" advanceSearch>
            <advance-search @search-page="searchPage"></advance-search>
          </operation-search>
        </template>
      </operation-container>
      <div class="table">
        <iep-table :isLoadTable="isLoadTable" :pagination="pagination" :pagedTable="pagedTable" @size-change="handleSizeChange" @current-change="handleCurrentChange" @selection-change="handleSelectChange" is-mutiple-selection>
          <el-table-column prop="title" label="题目" width="410">
            <template slot-scope="scope">
              <span class="hiddenOverText" :title="scope.row.title">{{scope.row.title}}</span>
              <span class="overText" v-if="JSON.stringify(scope.row.title).length > 87">......</span>
            </template>
          </el-table-column>
          <el-table-column prop="fieldName" label="科目" min-width="89">
            <template slot-scope="scope">
              {{scope.row.fieldName}}
            </template>
          </el-table-column>
          <el-table-column prop="questionTypeName" label="题型">
            <template slot-scope="scope">
              {{scope.row.questionTypeName}}
            </template>
          </el-table-column>
          <el-table-column prop="kindName" label="题类">
            <template slot-scope="scope">
              {{scope.row.kindName}}
            </template>
          </el-table-column>
          <!-- <el-table-column prop="title" label="内容" min-width="80">
            <template slot-scope="scope">
              {{scope.row.title}}
            </template>
          </el-table-column> -->
          <el-table-column prop="difficultyName" label="难度">
            <template slot-scope="scope">
              {{scope.row.difficultyName}}
            </template>
          </el-table-column>
          <el-table-column prop="associatedState" label="关联">
            <template slot-scope="scope">
              <el-tag type="success" size="medium" v-if="scope.row.associatedState === 0">不限
              </el-tag>
              <el-tag type="warning" size="medium" v-if="scope.row.associatedState === 1">限考试
              </el-tag>
            </template>
          </el-table-column>
          <el-table-column prop="status" label="状态">
            <template slot-scope="scope">
              <el-tag type="info" size="medium" v-if="scope.row.status === 0">审核中</el-tag>
              <el-tag type="success" size="medium" v-if="scope.row.status === 1">通过</el-tag>
              <el-tooltip effect="dark" placement="top-start" v-if="scope.row.status === 2">
                <div slot="content">未通过原因：<br />{{scope.row.reason}}</div>
                <el-tag type="warning" size="medium">未通过</el-tag>
              </el-tooltip>
            </template>
          </el-table-column>
          <el-table-column prop="username" label="创建者" min-width="89">
            <template slot-scope="scope">
              {{scope.row.username}}
            </template>
          </el-table-column>
          <el-table-column prop="creatTime" label="创建时间" min-width="98">
            <template slot-scope="scope">
              {{scope.row.creatTime | setDate}}
            </template>
          </el-table-column>
          <el-table-column prop="operation" label="操作" min-width="130">
            <template slot-scope="scope">
              <operation-wrapper>
                <iep-button type="warning" :disabled="scope.row.status != 0" plain @click="handleExamine(scope.row)" v-if="exam_question_review">审核</iep-button>
                <el-dropdown size="medium">
                  <iep-button type="default"><i class="el-icon-more-outline"></i></iep-button>
                  <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item @click.native="handleShow(scope.row)">查看</el-dropdown-item>
                    <el-dropdown-item @click.native="handleModify(scope.row)" v-if="exam_question_edit">修改</el-dropdown-item>
                    <el-dropdown-item @click.native="handleDelete(scope.row)" v-if="exam_question_del">删除</el-dropdown-item>
                  </el-dropdown-menu>
                </el-dropdown>
              </operation-wrapper>
            </template>
          </el-table-column>
        </iep-table>
      </div>

    </basic-container>

    <iep-dialog :dialog-show="dialogModify" title="修改试题" width="500px" @close="handleModifyCancel" center>
      <el-form :label-position="labelPosition" label-width="100px" :model="reForm">
        <div class="select">
          <el-form-item style="padding-right: 25px;" label="科目：" prop="field">
            <el-select class="select" v-model="reForm.field" size="small" @change="dialogModifyChange">
              <el-option v-for="(item, index) in res.exms_subjects" :key="index" :label="item.label" :value="item.id"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item class="titleList" label="题型：" prop="questionType">
            <el-select v-model="reForm.questionType" size="small" @change="dialogModifyChange">
              <el-option v-for="(item, index) in res.exms_question_type" :key="index" :label="item.label" :value="item.id"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item class="titleList" label="题类：" prop="kind">
            <el-select v-model="reForm.kind" size="small" @change="dialogModifyChange">
              <el-option v-for="(item, index) in res.exms_question_category" :key="index" :label="item.label" :value="item.id"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item class="titleList" label="难度：" prop="difficulty">
            <el-select v-model="reForm.difficulty" size="small" @change="dialogModifyChange">
              <el-option v-for="(item, index) in res.exms_difficulty" :key="index" :label="item.label" :value="item.id"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item class="titleList" label="关联：" prop="associatedState">
            <el-select v-model="reForm.associatedState" size="small" @change="dialogModifyChange">
              <el-option v-for="(item, index) in associatedStateList" :key="index" :label="item.label" :value="item.id"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item class="titleList" label="内容：" prop="title">
            <el-input type="textarea" :rows="4" v-model="reForm.title" @change="dialogModifyChange">
            </el-input>
          </el-form-item>
          <el-form-item class="titleList" label="关联标签：" prop="tagLists">
            <mutiply-tag-select v-model="reForm.tagKeyWords" :select-objs="reForm.tagKeyWords">
            </mutiply-tag-select>
          </el-form-item>
        </div>
      </el-form>
      <template slot="footer">
        <operation-wrapper>
          <iep-button :disabled="isModifyChange" type="primary" @click="handleModifySave">提交
          </iep-button>
          <iep-button @click="handleModifyCancel">取消</iep-button>
        </operation-wrapper>
      </template>
    </iep-dialog>

    <iep-dialog :dialog-show="dialogExamine" title="批量审核试题" width="520px" @close="handleExamineCancel" center>
      <div style="margin-bottom:16px">
        <span class="explain">说明： </span>
        <span class="explainTxt">每过审入库 1 题，奖励出题人 5 贝 !</span>
      </div>
      <div>
        <el-radio-group v-model="states">
          <el-radio :label="0">审核通过</el-radio>
          <el-radio :label="1" v-if="notPass">审核不通过</el-radio>
        </el-radio-group>
        <el-input v-if="states === 1" v-model="examineContent" type="textarea" maxlength="250" rows="4" style="margin-top:25px;" placeholder="请输入理由，字数不超过 250 ！" show-word-limit>
        </el-input>
      </div>
      <template slot="footer">
        <operation-wrapper>
          <iep-button type="primary" @click="handleSubmit">提交</iep-button>
          <iep-button @click="handleExamineCancel">取消</iep-button>
        </operation-wrapper>
      </template>
    </iep-dialog>

  </div>
</template>

<script>
import AdvanceSearch from './AdvanceSearch'
import { getTestList, deleteApprovalById, getTestOption, postModify, postExaminePass, postExamineFalse } from '@/api/exam/createExam/newTest/newTest'
import MutiplyTagSelect from '@/components/deprecated/mutiply-tag-select'
import mixins from '@/mixins/mixins'
import { mapGetters } from 'vuex'
export default {
  mixins: [mixins],
  components: { AdvanceSearch, MutiplyTagSelect },
  computed: {
    ...mapGetters(['permissions']),
  },
  props: [
    'record',
  ],
  data () {
    return {
      states: 0,//批量审核状态
      examineContent: '',//批量审核原因
      dialogExamine: false,//批量审核弹窗
      isModifyChange: true,//是否被修改
      selectValue: false,
      selectionValue: '',
      res: {},
      labelPosition: 'right',
      content: '',
      flag: false,
      dialogModify: false,
      reForm: {
        field: '',
        questionType: '',
        kind: '',
        difficulty: '',
        title: '',
        tagLists: [],
        associatedState: '',
      },
      associatedStateList: [
        { id: 0, label: '不限' },
        { id: 1, label: '限考试' },
      ],
      exam_question_add: false,
      exam_question_edit: false,
      exam_question_del: false,
      exam_question_review: false,
      notPass:false,
    }
  },
  filters: {
    /**
     * 时间只精确到天
     */
    setDate (val) {
      val = val.substring(0, 10)
      return val
    },
  },
  created () {
    /**
     * 当没点击查看或修改
     */
    if (!this.record) {
      this.loadPage()
    }
    /**
     * 当点击查看或修改后返回
     */
    if (this.record) {
      const param = {
        title: this.record.search,
      }
      this.pageOption.current = this.record.current
      this.pageOption.size = this.record.size
      this.searchForm.title = param.title
      this.loadTable({ ...param, ...this.pageOption }, getTestList)
    }
    this.getTestOption()
    this.exam_question_add = this.permissions['exam_question_add']
    this.exam_question_edit = this.permissions['exam_question_edit']
    this.exam_question_del = this.permissions['exam_question_del']
    this.exam_question_review = this.permissions['exam_question_review']
  },
  methods: {
    /**
     * 获取试题数据
     */
    async getTestOption () {
      const params = {
        numberList: [
          'exms_subjects',//考试科目
          'exms_question_type',//题型
          'exms_question_category',//题类
          'exms_difficulty',//难度
        ],
      }
      const { data } = await getTestOption(params)
      this.res = data
    },
    /**
     * 获取试题数据
     */
    loadPage (param = this.searchForm) {
      this.loadTable(param, getTestList)
    },
    /**
     * 新增试题
     */
    handleAdd () {
      // this.$router.push('/exam/createExam/newTest/')
      this.$emit('onEdit', {
        methodName: '创建新',
        id: '',
        edit: false,
      })
    },
    /**
     * 审核按钮
     */
    // handleExamine (row) {
    //   this.dialogExamine = true
    //   this.examine = row.id
    // },
    handleExamine (row) {
      this.$emit('onEdit', {
        methodName: '审核',
        id: row.id,
        edit: true,
        examine: true,
        current: this.pageOption.current,
        size: this.pageOption.size,
        search: this.searchForm.title,
      })
    },
    /**
     * 查看按钮
     */
    handleShow (row) {
      this.$emit('onEdit', {
        methodName: '查看',
        id: row.id,
        edit: true,
        current: this.pageOption.current,
        size: this.pageOption.size,
        search: this.searchForm.title,
      })
    },
    /**
     * 修改按钮
     */
    handleModify (rows) {
      this.$emit('onEdit', {
        methodName: '修改',
        id: rows.id,
        edit: false,
        current: this.pageOption.current,
        size: this.pageOption.size,
        search: this.searchForm.title,
      })
      // this.dialogModify = true
      // const param ={
      //   id: rows.id,
      // }
      // getExamMsg(param).then( res => {
      //   this.reForm = res.data.data
      // })
    },
    /**
     * 删除按钮
     */
    handleDelete (row) {
      this._handleComfirm([row.id], deleteApprovalById, '删除')
      //console.log(row.id)
    },
    /**
     * 选择试题
     */
    handleSelectChange (val) {
      if (val.map(m => m.id) == '') {
        this.selectValue = false
      }
      else {
        this.selectValue = true
        this.selectionValue = val.map(m => m.id)
      }
    },
    /**
     * 批量删除按钮
     */
    handleDeleteAll () {
      if (this.selectValue == false) {
        this.$message.error('请至少选择一项试题！')
      }
      if (this.selectValue == true) {
        this.$confirm('此操作将删除选中的试题，是否继续？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
        }).then(() => {
          deleteApprovalById(this.selectionValue).then(res => {
            if (res.data.data == true) {
              let type = res.data.msg == '删除成功' ? 'success' : 'error'
              this.$message({
                message: res.data.msg,
                type: type,
              })
              this.loadPage()
            }
          })
        })
      }
    },
    /**
     * 修改取消
     */
    handleModifyCancel () {
      this.dialogModify = false
      this.states = 0
      this.content = ''
      this.isModifyChange = true
      // this.$refs['reform'].resetFields()
    },
    /**
     * 是否修改选项
     */
    dialogModifyChange () {
      this.isModifyChange = false
    },
    /**
     * 保存修改
     */
    handleModifySave () {
      var postModifyList = this.reForm
      postModifyList = JSON.stringify(postModifyList)
      postModify(postModifyList).then(res => {
        if (res.data.data == true) {
          this.dialogModify = false,
            this.$message({
              message: '修改成功',
              type: 'success',
            }),
            this.loadPage()
        }
      })
    },
    /**
     * 批量审核
     */
    handleBatchExamine () {
      if (this.selectValue == false) {
        this.$message.error('请至少选择一项试题！')
      }
      if (this.selectValue == true) {
        this.$confirm('此操作将审核选中的试题，是否继续？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
        }).then(() => {
          this.dialogExamine = true
          // BatchExamineSubject(this.selectionValue).then(res => {
          //   if (res.data.data == true) {
          //     this.$message({
          //       message: '操作成功',
          //       type: 'success',
          //     })
          //     this.loadPage()
          //   }
          // })
        })
      }
    },

    /**
     * 批量审核取消
     */
    handleExamineCancel () {
      this.dialogExamine = false
      this.states = 0
      this.examineContent = ''
    },
    /**
     * 批量审核提交
     */
    handleSubmit () {
      this.examine = this.selectionValue
      if (this.states === 0) {
        // let postExaminePassList = {
        //   id: null,
        // }
        // postExaminePassList.id = this.examine
        postExaminePass(this.examine).then(res => {
          if (res.data.data == true) {
            this.dialogExamine = false,
              this.$message({
                message: '该试题审核通过',
                type: 'success',
              }),
              this.loadPage()
          }
        })
      }
      if (this.states === 1 && this.examineContent != '') {
        let postExamineFalseList = {
          id: null,
          reason: '',
        }
        postExamineFalseList.id = this.examine
        postExamineFalseList.reason = this.examineContent
        postExamineFalseList = JSON.stringify(postExamineFalseList)
        postExamineFalse(postExamineFalseList).then(res => {
          if (res.data.data == false) {
            this.dialogExamine = false,
              this.$message({
                message: '该试题审核不通过',
                type: 'success',
              }),
              this.$emit('onGoBack', {
                current: this.record.current,
                size: this.record.size,
                search: this.record.search,
              })
          }
        })
      }
      if (this.states === 1 && this.examineContent == '') {
        this.$message({
          message: '请填写理由！',
          type: 'warning',
        })
      }
    },
  },
}
</script>
<style lang="scss" scoped>
.titleList {
  margin-top: -21px;
  padding-right: 23px;
}
</style>
<style scoped>
.table >>> th > .cell {
  line-height: 32px;
}
.select >>> .el-input .el-select__caret {
  line-height: 2.9;
}
.hiddenOverText {
  max-height: 70px;
  overflow: hidden;
  text-overflow: ellipsis;
}
.overText {
  position: absolute;
  bottom: 3px;
  left: 10px;
}
</style>

