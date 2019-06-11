<template>
  <el-form :model="ruleForm" ref="ruleForm" :rules="rules" :label-position="labelPosition" label-width="100px">
    <div class="top">
      <p>阅卷完毕人数</p>
      <p style="margin-left: 50px;"><span style="color:#409eff">{{resdata.done}}</span>/<span>{{resdata.all}}</span></p>
      <el-button icon="el-icon-warning" class="tip"></el-button>
      <p class="award">每位阅卷老师阅卷一题，奖励<el-button style="margin:0px 10px;border-radius:0px;">{{money}}</el-button>贝</p>
    </div>

    <div class="container" v-if="resdata.faceUsers">
      <div class="title">
        <p class="line"></p>
        <p>面试题</p>
        <p style="margin-left: 50px;"><span style="color:#409eff">{{resdata.done}}</span>/<span>{{resdata.all}}</span></p>
      </div>
      <div class="details-fu">
        <div class="details" v-for="(item, idx) in resdata.faceUsers" :key="idx">
          <el-button size="mini" type="info" plain>{{item}}</el-button>
        </div>
      </div>
    </div>

    <div class="container" v-if="resdata.writeUsers">
      <div class="title">
        <p class="line"></p>
        <p>简答题</p>
        <p style="margin-left: 50px;"><span style="color:#409eff">{{resdata.done}}</span>/<span>{{resdata.all}}</span></p>
      </div>
      <div class="details-fu">
        <div class="details" v-for="(item, idx) in resdata.writeUsers" :key="idx">
          <el-button size="mini" type="info" plain>{{item}}</el-button>
        </div>
      </div>
    </div>

    <div class="container" v-if="resdata.operateUsers">
      <div class="title">
        <p class="line"></p>
        <p>实操题</p>
        <p style="margin-left: 50px;"><span style="color:#409eff">{{resdata.done}}</span>/<span>{{resdata.all}}</span></p>
        <P style="margin-left: 50px;">
          <el-switch class="switch-switch" v-model="switchValue" active-text="多选1模式" active-color="#409eff"> </el-switch>
        </P>
      </div>
      <div class="details-fu">
        <div class="details" v-for="(item, idx) in resdata.operateUsers" :key="idx">
          <el-button size="mini" type="info" plain>{{item}}</el-button>
        </div>
      </div>
    </div>

    <div class="bottom">
      <el-form-item style="margin-bottom:5px">
        <el-button class="button" @click="handleRollingPaper">一键收卷</el-button>
        <el-button class="button" @click="handlePaper">完成阅卷</el-button>
      </el-form-item>
      <el-form-item>
        <el-button class="button" @click="sendResult">发送成绩</el-button>
        <el-button class="button" @click="sendCertificate">放送证书</el-button>
      </el-form-item>
    </div>

  </el-form>
</template>
<script>
import { getPaperProcessById, rollingPaperById, overPapersById, sendResultById, sendCertificateById } from '@/api/exam/examLibrary/examReading/examReading'

//校验规则
const allRules = {
  // mark: [{ required: true, message: '请输入面试成绩', trigger: 'blur' }],
}
export default {
  components: {},
  props: ['formData'],
  data () {
    return {
      labelPosition: 'right',
      ruleForm: {
        // mark: '',
      },
      resdata: {},
      rules: allRules,
      money: 5,
      inputVisible: false,
      inputValue: '',
      switchValue: true,
    }
  },
  created () {
    this.loadPage()
  },
  methods: {
    /**
     * 获取阅卷进度列表分页数据
     */
    loadPage () {
      getPaperProcessById(this.formData.row.id).then(res => {
        const record = res.data.data
        this.resdata = record
      })
    },

    /**
     * 一键收卷
     */
    handleRollingPaper () {
      const param = {
        examinationmanagementId: this.formData.row.id,
      }
      this.$confirm('此操作将一键试卷, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }).then(() => {
        rollingPaperById(param).then(res => {
          this.$message({
            type: 'success',
            message: res.data.msg,
          })
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消收卷',
        })
      })
    },

    /**
     * 完成阅卷
     */
    handlePaper () {
      const param = {
        examinationmanagementId: this.formData.row.id,
      }
      this.$confirm('此操作将完成阅卷, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }).then(() => {
        overPapersById(param).then(res => {
          this.$message({
            type: 'success',
            message: res.data.msg,
          })
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消完成阅卷',
        })
      })
    },

    /**
     * 发送成绩
     */
    sendResult () {
      const param = {
        examinationmanagementId: this.formData.row.id,
      }
      this.$confirm('此操作将发送成绩, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }).then(() => {
        sendResultById(param).then(res => {
          this.$message({
            type: 'success',
            message: res.data.msg,
          })
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消发送',
        })
      })
    },

    /**
     * 发送证书
     */
    sendCertificate () {
      const param = {
        sendCertificateById: this.formData.row.id,
      }
      this.$confirm('此操作将发送证书, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }).then(() => {
        sendCertificateById(param).then(res => {
          this.$message({
            type: 'success',
            message: res.data.msg,
          })
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消发送',
        })
      })
    },
  },
}
</script>
<style lang="scss" scoped>
.top {
  display: flex;
  .tip {
    margin-top: -8px;
    margin-left: 250px;
    border: 0px solid #fff;
    &:hover {
      background-color: #fff;
    }
  }
  .award {
    margin-top: -7px;
  }
}
.container {
  margin-top: 10px;
  margin-bottom: 40px;
  .title {
    display: flex;
    .line {
      height: 26px;
      width: 4px;
      background-color: #409eff;
      margin-right: 10px;
    }
  }
  .details-fu {
    display: flex;
    .details {
      margin-right: 5px;
    }
  }
}
.bottom {
  padding-top: 20px !important;
  margin-left: 200px;
  .button {
    color: #fff;
    background-color: #d4d4d4;
    border: 0px solid #d4d4d4;
    font-size: 18px;
    margin-right: 10px;
  }
}
</style>
<style scoped>
.switch-switch >>> .el-switch__label.is-active {
  color: #409eff !important;
}
</style>
