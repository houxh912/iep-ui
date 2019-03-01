<template>
  <iep-dialog :dialog-show="dialogShow" :title="'客户'" width="80%" @close="closed">
    <div class="head-info">
      <p class="dept">{{formData.deptName}}</p>
      <p class="title">市场经理：<span class="person">{{formData.jingli}}</span></p>
      <p class="title">协作人：<span class="person">{{formData.xiezuoren}}</span></p>
    </div>
    <div class="head-button">
      <el-button class="tabs" type="danger" size="small">暂无需求</el-button>
      <el-button class="tabs" type="danger" size="small" @click="transfer">转移给他人</el-button>
      <el-button class="tabs" type="danger" size="small" @click="handleUpdate">编辑</el-button>
      <el-button class="tabs" type="danger" size="small" @click="handleDelete">删除</el-button>
    </div>
    <el-tabs v-model="tabName" @tab-click="change">
      <el-tab-pane label="客户全景" name="detail">
        <detail-dialog :list="formData"></detail-dialog>
      </el-tab-pane>
      <el-tab-pane label="联系人" name="contacts">
        <contacts-dislog :list="formData" v-if="tabName=='contacts'"></contacts-dislog>
      </el-tab-pane>
      <el-tab-pane label="拜访日志" name="visitLog">
        <visit-log-dialog :list="formData" v-if="tabName=='visitLog'"></visit-log-dialog>
      </el-tab-pane>
      <el-tab-pane label="方案" name="programme">
        <programme-dialog :list=formData v-if="tabName=='programme'"></programme-dialog>
      </el-tab-pane>
      <el-tab-pane label="合同" name="contract">
        <contract-dialog :list="formData"></contract-dialog>
      </el-tab-pane>
      <el-tab-pane label="资讯" name="consultation">
        <consultation-dialog :list="formData" v-if="tabName=='consultation'"></consultation-dialog>
      </el-tab-pane>
    </el-tabs>
  </iep-dialog>
</template>

<script>
import IepDialog from '@/components/IepDialog/'
import DetailDialog from './detailDialog'
import ContactsDislog from './contactsDislog'
import VisitLogDialog from './visitLogDialog'
import ProgrammeDialog from './programmeDialog'
import ContractDialog from './contractDialog'
import ConsultationDialog from './consultationDialog'
import mixins from '@/mixins/mixins'
import { deleteDataById } from '@/api/crms/custom'
export default {
  name: 'detail',
  mixins: [ mixins ],
  components: { IepDialog, DetailDialog, ContactsDislog, VisitLogDialog, ConsultationDialog, ProgrammeDialog, ContractDialog },
  data () {
    return {
      dialogShow: false,
      tabName: 'detail',
      formData: {},
    }
  },
  methods: {
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
    change () {},
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

<style lang="scss" scoped>
.head-info {
  display: flex;
  margin-bottom: 20px;
  .dept {
    font-size: 16px;
    font-weight: 700;
    margin: 0 15px 0 0;
    line-height: 20px;
  }
  .title {
    margin: 0 15px 0 0;
    height: 20px;
    line-height: 22px;
    .person {
      font-weight: 700;
    }
  }
}
.head-button {
  margin-bottom: 25px;
  .tabs {
    margin-right: 15px;
    background-color: #fff;
    color: #f00;
  }
}
</style>
