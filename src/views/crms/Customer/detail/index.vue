<template>
  <div class="edit-wrapper">
    <el-card class="edit-card" shadow="hover">
      <div slot="header" class="title">
        <span>{{formData.clientName}}</span>
        <span class="person">市场经理：{{formData.marketManager}}</span>
        <span class="person">协作人：<span v-for="(item,index) in formData.collaborations" :key="index" class="assist">{{item.commonName}}</span>胡浩</span>
      </div>
      <!-- <div class="head-info">
        <p class="dept">{{formData.deptName}}</p>
        <p class="title">市场经理：<span class="person">{{formData.marketManager}}</span></p>
        <p class="title">协作人：<span class="person">{{formData.xiezuoren}}</span></p>
      </div> -->
      <div class="head-button">
        <!-- <iep-button class="tabs" type="danger" size="small">暂无需求</iep-button>
        <iep-button class="tabs" type="danger" size="small" @click="transfer">转移给他人</iep-button>
        <iep-button class="tabs" type="danger" size="small" @click="handleUpdate">编辑</iep-button>
        <iep-button class="tabs" type="danger" size="small" @click="handleDelete">删除</iep-button> -->
      </div>
      <el-tabs v-model="tabName" @tab-click="change">
        <el-tab-pane label="客户全景" name="detail">
          <detail-dialog :formData="formData"></detail-dialog>
        </el-tab-pane>
        <el-tab-pane label="联系人" name="contacts">
          <contacts-dislog :list="formData" :record="record" v-if="tabName=='contacts'"></contacts-dislog>
        </el-tab-pane>
        <el-tab-pane label="拜访日志" name="visitLog">
          <visit-log-dialog :record="record" :list="formData" v-if="tabName=='visitLog'"></visit-log-dialog>
        </el-tab-pane>
        <el-tab-pane label="方案" name="programme">
          <programme-dialog :record="record" :list="formData" v-if="tabName=='programme'"></programme-dialog>
        </el-tab-pane>
        <el-tab-pane label="合同" name="contract">
          <contract-dialog :list="formData" v-if="tabName=='contract'"></contract-dialog>
        </el-tab-pane>
        <el-tab-pane label="资讯" name="consultation">
          <consultation-dialog :list="formData" v-if="tabName=='consultation'"></consultation-dialog>
        </el-tab-pane>
      </el-tabs>
      <footer-tool-bar>
        <iep-button type="info" @click="handleGoBack">返回</iep-button>
        <iep-button type="primary" @click="submitForm">提交</iep-button>
      </footer-tool-bar>
    </el-card>
  </div>
</template>

<script>
import DetailDialog from './detailDialog'
import ContactsDislog from './contactsDislog'
import VisitLogDialog from './visitLogDialog'
import ProgrammeDialog from './programmeDialog'
import ContractDialog from './contractDialog'
import ConsultationDialog from './consultationDialog'
import FooterToolBar from '@/components/FooterToolbar'
import mixins from '@/mixins/mixins'
import { deleteDataById, fertchInfo } from '@/api/crms/custom'
export default {
  name: 'detail',
  mixins: [mixins],
  components: { DetailDialog, ContactsDislog, VisitLogDialog, ConsultationDialog, ProgrammeDialog, ContractDialog, FooterToolBar },
  data () {
    return {
      dialogShow: false,
      tabName: 'detail',
      formData: {},
    }
  },
  props: {
    record: {
      type: Object,
      default: () => { },
    },
  },
  created () {
    this.load()
  },
  methods: {
    handleGoBack () {
      this.$emit('onGoBack')
    },
    open (row) {
      this.formData = row
      this.dialogShow = true
      // 模拟数据
      this.formData = {
        deptName: '厦门市信息中心标准规划部',
        jingli: '李凯',
        xiezuoren: '胡浩',
      }
    },
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.formRequestFn(this.formData).then(() => {
            this.$notify({
              title: '成功',
              message: `${this.methodName}成功`,
              type: 'success',
              duration: 2000,
            })
            this.loadPage()
            this.dialogShow = false
          })
        } else {
          return false
        }
      })
    },
    load () {
      fertchInfo(this.record.clientId).then((res) => {
        this.formData = res.data.data
        console.log(this.formData)
      })
    },
    change () { },
    closed () {
      this.dialogShow = false
    },
    // 转移
    transfer () {
      this.$message('转移给他人')
    },
    // 编辑
    handleUpdate () {
      this.$emit('update-form', this.formData)
    },
    // 删除
    handleDelete (row) {
      this._handleGlobalDeleteById(row.id, deleteDataById)
    },
  },
}
</script>
<style scoped>
.edit-wrapper >>> .el-collapse-item__wrap {
  padding: 30px 70px 0 70px;
  border: none;
}
.edit-wrapper >>> .el-collapse {
  border: none;
}
.edit-wrapper >>> .el-collapse-item__header {
  background-color: #f8f8f8;
  font-size: 15px;
  font-weight: 700;
  padding-left: 20px;
  margin: 5px;
  border-radius: 5px;
  border: none;
}
</style>

<style lang="scss" scoped>
.edit-wrapper {
  margin: 5px 5px 50px 5px;
  .form-half {
    width: 50%;
    display: inline-block;
  }
  .edit-card {
    .title {
      height: 50px;
      line-height: 50px;
      font-weight: 600;
      font-size: 18px;
      display: flex;
    }
  }
}
.person {
  font-size: 13px;
  font-weight: 200;
  margin-left: 30px;
  align-items: center;
  line-height: 50px;
}
.assist {
  margin-right: 10px;
}
</style>