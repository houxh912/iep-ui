<template>
  <div>
    <operation-container>
      <template slot="left">
        <iep-button type="danger" @click="handleDeleteAll">批量删除</iep-button>
        <iep-button type="danger" plain>导出</iep-button>
        <iep-button @click="handleEdit">阅卷进度</iep-button>
        <iep-button class="tip">当前已选择<span>{{Value}}</span>项</iep-button>
        <iep-button class="empty" @click="handleEmpty">清空</iep-button>
      </template>
      <template slot="right">
        <operation-search @search-page="searchPage">
        </operation-search>
      </template>
    </operation-container>

    <iep-table :columnsMap="columnsMap" :isLoadTable="isLoadTable" :pagination="pagination"
      :pagedTable="pagedTable" @size-change="handleSizeChange" @current-change="handleCurrentChange"
      @selection-change="selectionChange" is-mutiple-selection is-index>
      <el-table-column prop="state" label="判分状态">
        <template slot-scope="scope">
          <el-tag type="warning" size="medium" v-if="scope.row.state === 1">未阅卷</el-tag>
          <el-tag type="success" size="medium" v-if="scope.row.state === 2">正在阅卷</el-tag>
          <el-tag type="success" size="medium" v-if="scope.row.state === 3">未完成阅卷</el-tag>
          <el-tag type="success" size="medium" v-if="scope.row.state === 4">已阅卷</el-tag>
          <el-tag type="success" size="medium" v-if="scope.row.state === 5">完成阅卷</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="operation" label="操作" width="150">
        <template slot-scope="scope">
          <operation-wrapper>
            <!-- <iep-button @click="handleWritten(scope.row)">笔试阅卷</iep-button> -->
            <!-- <iep-button @click="handleChoice(scope.row)">选择题判分</iep-button> -->
            <!-- <iep-button @click="handleInterview(scope.row)" v-if="permissionInterview">面试判分</iep-button> -->
            <iep-button type="warning" size="small" plain @click="handleCertificate(scope.row)">发放证书</iep-button>
            <!-- <iep-button type="danger" plain @click="handleDelete(scope.row)">删除</iep-button> -->

            <el-dropdown size="medium">
              <iep-button type="default"><i class="el-icon-more-outline"></i></iep-button>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item @click.native="handleWritten(scope.row)" v-if="permissionWritten">笔试阅卷</el-dropdown-item>
                <el-dropdown-item @click.native="handleInterview(scope.row)" v-if="permissionInterview">面试判分</el-dropdown-item>
                <el-dropdown-item @click.native="handleDelete(scope.row)">删除</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </operation-wrapper>
        </template>
      </el-table-column>
    </iep-table>

    <iep-dialog :dialog-show="dialogProgress" title="阅卷进度" width="900px" @close="loadPage()" center>
      <progress-form :formData="InterviewData" @close="loadPage()"></progress-form>
    </iep-dialog>

    <el-dialog class="titleDialogs" title="笔试判分" :visible.sync="dialogWritten" width="90%" @close="loadPage()">
      <writte-form :formData="InterviewData" v-if="dialogWritten" @close="loadPage()"></writte-form>
    </el-dialog>

    <iep-dialog :dialog-show="dialogChoice" title="选择题判分" width="550px" @close="loadPage()" center>
      <choice-form :formData="InterviewData" @close="loadPage()"></choice-form>
    </iep-dialog>

    <iep-dialog :dialog-show="dialogInterview" title="面试判分" width="550px" @close="loadPage()"
      center>
      <interview-form :formData="InterviewData" @close="loadPage()"></interview-form>
    </iep-dialog>

  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import { getExamReadingList, judgeWrittenById } from '@/api/exam/examLibrary/examReading/examReading'
// import { getExamReadingList, sendCertificateById, deleteById, deleteIdAll } from '@/api/exam/examLibrary/examReading/examReading'
import WritteForm from './writte-form'
import ChoiceForm from './choice-form'
import InterviewForm from './interview-form'
import ProgressForm from './progress-form'
import mixins from '@/mixins/mixins'
const columnsMap = [
  {
    label: '姓名',
    prop: 'userName',
  },
  {
    label: '准考证号',
    prop: 'examinationNumber',
  },
  {
    label: '笔试分数',
    prop: 'field',
    // type: 'dict',
  },
  {
    label: '面试分数',
    prop: 'field',
  },
  {
    label: '面试人',
    prop: 'field',
  },
  {
    label: '剩余时间',
    prop: 'remainingTime',
  },
]
function initForm () {
  return {
    id: '',
    deptId: '',
  }
}
export default {
  mixins: [mixins],
  props: ['record'],
  components: { WritteForm, ChoiceForm, InterviewForm, ProgressForm },
  data () {
    return {
      columnsMap,
      Value: 0,
      selectValue: false,
      selectionValue: '',
      dialogProgress: false,
      dialogWritten: false,
      dialogChoice: false,
      dialogInterview: false,
      labelPosition: 'right',
      InterviewData: initForm(),
    }
  },
  computed: {
    ...mapGetters(['userInfo']),
    permissionInterview () {
      const { faceUserIdsArray } = this.record.row.iepExaminationOperateVO
      return faceUserIdsArray.map(Number).includes(this.userInfo.userId)
    },
    permissionWritten () {
      const { writeUsedWriteUsedArray } = this.record.row.iepExaminationOperateVO
      return writeUsedWriteUsedArray.map(Number).includes(this.userInfo.userId)
    },
  },
  created () {
    this.loadPage()
  },
  methods: {
    /**
     * 权限设置
     */
    // permissionInterview () {
    //   console.log(this.record)
    //   const { iepExaminationOperateVO } = this.record.row
    //   return iepExaminationOperateVO.faceUserIdsArray.map(Number).includes(this.userInfo.userId)
    // },
    /**
     * 获取列表分页数据
     */
    loadPage () {
      this.dialogProgress = false
      this.dialogWritten = false
      this.dialogChoice = false
      this.dialogInterview = false
      const param = {
        examinationId: this.record.row.id,
      }
      this.loadTable({ ...param }, getExamReadingList)
      // this.loadTable(param, getExamReadingList)
    },

    /**
     * 阅卷进度按钮
     */
    handleEdit () {
      // console.log('redd',this.record)
      this.dialogProgress = true
      this.InterviewData = { ...this.record }
      //console.log('kkk', this.InterviewData)
      // this.InterviewData = initForm()
    },

    /**
     * 笔试判分
     */
    handleWritten (row) {
      row.judgeId = this.userInfo.userId
      this.InterviewData = { ...row }          //传到子组件的数据
      const params = {
        examId: row.examId,
      }
      judgeWrittenById(params).then(res => {   //首次进入页面先判断后台返回信息
        const resjudge = res.data.data         //true 可阅卷
        if (resjudge === true) {               //false code=0  有老师在阅卷
          this.dialogWritten = true            //false code=2  不可阅卷
        } else {
          if (resjudge === false && res.data.code === 0) {
            this.$confirm(res.data.msg, '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning',
            }).then(() => {
              this.dialogWritten = true
            }).catch(() => {
              this.$message({
                type: 'info',
                message: '已取消',
              })
            })
          } else {
            this.$message({
              type: 'warning',
              message: res.data.msg,
            })
          }
        }
      })
    },

    /**
     * 选择题判分
     */
    handleChoice (row) {
      this.dialogChoice = true
      this.InterviewData = { ...row }
    },

    /**
     * 面试判分
     */
    handleInterview (row) {
      this.dialogInterview = true
      this.InterviewData = { ...row }
    },

    /**
     * 发放证书
     */
    handleCertificate (row) {
      //   this._handleComfirm([row.id], sendCertificateById, '方法证书')
      console.log(row.id)
    },

    /**
     * 删除
     */
    handleDelete (row) {
      // this._handleComfirm([row.id], deleteById, '删除')
      console.log(row.id)
    },

    /**
     * 选择多项时，判断是否选择
     */
    selectionChange (val) {
      this.Value = val.length
      if (val.map(m => m.id) == '') {
        this.selectValue = false
        return
      }
      else {
        this.selectValue = true
        this.selectionValue = val.map(m => m.id)
        return
      }
    },

    /**
     * 批量删除
     */
    handleDeleteAll () {
      if (this.selectValue == false) {
        this.$message.error('请至少选择一项试题！')
        return
      }
      if (this.selectValue == true) {
        // deleteIdAll(this.selectionValue).then(() => {
        //   this.$message({
        //     message: '操作成功',
        //     type: 'success',
        //   })
        //   this.loadPage()
        // })
      }
    },

    /**
     * 清空选择
     */
    handleEmpty () {
      this.Value = 0
      console.log(22)
    },
  },
}
</script>
<style lang="scss" scoped>
.tip {
  border: 0px solid #ccc;
  &:hover {
    background-color: #fff;
  }
  span {
    color: #419fff;
    font-size: 20px;
    margin: 3px 6px;
  }
}
.empty {
  border: 0px solid #ccc;
  color: #419fff;
  &:hover {
    background-color: #fff;
  }
}
</style>
<style scoped>
.titleDialogs >>> .el-dialog__title {
  display: none;
}
</style>

