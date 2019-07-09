<template>
  <div>
    <basic-container>
      <iep-page-header title="查看项目" :backOption="backOption"></iep-page-header>
      <!-- 项目基本信息 -->
      <div class="contianBox">
        <el-row class="title">
          <el-col :span="24" class="data">项目基本信息</el-col>
        </el-row>
        <el-row class="topBot">
          <el-form label-width="150px">
            <el-row>
              <el-col :span="12" class="item">
                <el-form-item label="项目名称：">
                  {{this.formData.projectName}}
                </el-form-item>
              </el-col>
              <el-col :span="12" class="item">
                <el-form-item label="项目编号：">
                  {{this.formData.serialNo}}
                </el-form-item>
              </el-col>
              <el-col :span="12" class="item">
                <el-form-item label="项目类型：">
                  <span v-if="this.formData.projectType==1">内部项目</span>
                  <span v-else>外部项目</span>
                </el-form-item>
              </el-col>
              <el-col :span="12" class="item">
                <el-form-item label="项目标签：">
                  <el-tag type='info' v-for="(item, index) in formData.projectTag" :key="index">{{item}}</el-tag>
                </el-form-item>
              </el-col>
              <el-col :span="12" class="item" v-show="this.formData.projectType==2">
                <el-form-item label="客户名称：">
                  {{this.formData.relatedClient}}
                </el-form-item>
              </el-col>
              <el-col :span="12" class="item">
                <el-form-item label="项目等级：">
                  <span v-if="this.formData.projectLevel==1">重要项目</span>
                  <span v-else-if="this.formData.projectLevel==2">中级项目</span>
                  <span v-else>一般项目</span>
                </el-form-item>
              </el-col>
              <el-col :span="12" class="item">
                <el-form-item label="相关产品：">
                  {{this.formData.relatedProduct}}
                </el-form-item>
              </el-col>
              <el-col :span="12" class="item">
                <el-form-item label="项目预算：">
                  {{this.formData.projectBudget}}
                </el-form-item>
              </el-col>
            </el-row>
              <hr>
            <el-row>
              <el-col :span="12" class="item">
                <el-form-item label="项目经理：">
                  {{this.formData.projectManagerName}}
                </el-form-item>
              </el-col>
              <el-col :span="12" class="item">
                <el-form-item label="项目督导：">
                  <span v-if="formData.projectMentorList.length==0">无</span>
                  <span v-for="a in formData.projectMentorList" :key="a.id">{{a.name}}</span>
                  <!-- <iep-button type="danger" plain size="mini" @click="transferMentor(formData.projectMentorList)">变更</iep-button> -->
                </el-form-item>
              </el-col>
              <el-col :span="12" class="item">
                <el-form-item label="市场经理：">
                  <span v-if="formData.mktManagerList.length==0">无</span>
                  <span v-for="a in formData.mktManagerList" :key="a.id">{{a.name}}</span>
                </el-form-item>
              </el-col>
              <el-col :span="12" class="item">
                <el-form-item label="执行项目经理：">
                  <span v-if="formData.projectHandlesList.length==0">无</span>
                  <span v-for="a in formData.projectHandlesList" :key="a.id">{{a.name}}</span>
                  <!-- <iep-button type="danger" plain size="mini" @click="transferHandles(formData.projectHandlesList)">变更</iep-button> -->
                </el-form-item>
              </el-col>
              <!-- <el-col :span="12" class="item">
                <el-form-item label="外部合作伙伴：">
                  {{this.formData.groupExternalCooperatePartnerName}}
                </el-form-item>
              </el-col> -->
              <el-col :span="12" class="item">
                <el-form-item label="团队成员：">
                  <span v-if="formData.membersList.length==0">无</span>
                  <span v-for="a in formData.membersList" :key="a.id">{{a.name}}</span>
                </el-form-item>
              </el-col>
              <!-- <el-col :span="12" class="item">
                <el-form-item label="相关产品：">
                  {{this.formData.relatedProductList}}
                </el-form-item>
              </el-col>
              <el-col :span="12" class="item">
                <el-form-item label="项目核算：">
                  {{this.formData.serialNo}}
                </el-form-item>
              </el-col> -->
            </el-row>
          </el-form>
        </el-row>
      </div>
      <!-- 关联材料 -->
      <div class="contianBox">
        <el-row class="title">
          <el-col :span="20" class="data">关联材料</el-col>
        </el-row>
        <el-row class="topBot">
          <el-form label-width="150px">
            <el-row>
              <el-col :span="12" class="item">
              </el-col>
            </el-row>
          </el-form>
        </el-row>
      </div>
      <!-- 收款计划 -->
      <div class="contianBox">
        <el-row class="title">
          <el-col :span="20" class="data">收款计划</el-col>
        </el-row>
        <el-row class="topBot">
          <el-form label-width="150px">
            <el-row>
              <el-col :span="12" class="item">
              </el-col>
            </el-row>
          </el-form>
        </el-row>
      </div>
      <!-- 流转记录 -->
      <div class="contianBox">
        <el-row class="title">
          <el-col :span="20" class="data">流转记录</el-col>
        </el-row>
        <el-row class="topBot">
          <el-form label-width="150px">
            <el-row>
              <el-col :span="24" class="item">
                <el-form-item v-for="(item,index) in formData.circulationRecordList.slice(0,5)" :key="index">
                  <span style="margin-right:10px;">{{item.createTime}}</span>
                  <span style="margin-right:10px;">{{item.realName}}</span>
                  <span style="margin-right:10px;">{{item.content}}</span>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </el-row>
      </div>
      <!-- 审批意见 -->
      <div class="contianBox">
        <el-row class="title">
          <el-col :span="20" class="data">审批意见</el-col>
        </el-row>
        <el-row class="topBot">
          <el-form label-width="150px">
            <el-row>
              <el-col :span="12" class="item">
              </el-col>
            </el-row>
          </el-form>
        </el-row>
      </div>
    </basic-container>
    <transfer-dialog-form ref="TransferDialogForm" @load-page="getDetailData"></transfer-dialog-form>
  </div>
</template>

<script>
import { getDataDetail } from '@/api/gpms/index'
import TransferDialogForm from './TransferDialogForm'
export default {
  components: {
    TransferDialogForm,
  },
  data () {
    return {
      formData: {},
      backOption: {
        isBack: true,
        backPath: null,
        backFunction: () => {
          this.close()
        },
      },
    }
  },
  created () {
    this.getDetailData()
  },
  methods:{
    close () {
      this.$router.history.go(-1)
    },
    getDetailData () {
      getDataDetail(this.$route.params.id).then(({data}) => {
        let list = [
          // { name: 'projectMentorName', list: 'projectMentorList' },
          { name: 'approverName', list: 'approverList' },
          { name: 'inChargeDeptName', list: 'inChargeDeptList' },
          { name: 'coopDeptName', list: 'coopDeptList' },
          { name: 'publisherName', list: 'publisherList' },
          { name: 'relatedClientName', list: 'relatedClientList' },
          { name: 'groupExternalCooperatePartnerName', list: 'groupExternalCooperatePartnerList' },//外部伙伴
          { name: 'marketManagerName', list: 'marketManagerList' },
          // { name: 'projectHandlesName', list: 'projectHandlesList' },
          { name: 'projectManagerName', list: 'projectManagerList' },//负责人
        ]
        for (let item of list) {
          if (data.data[item.list]) {
            data.data[item.name] = data.data[item.list].name
          } else {
            data.data[item.name] = '无'
          }
        }
        this.formData = data.data
      })
    },
    // transferMentor (val) {
    //   this.$refs['TransferDialogForm'].form.projectMentorList = val
    //   this.$refs['TransferDialogForm'].methodName = '项目指导人'
    //   this.$refs['TransferDialogForm'].formRequestFn = transferMentorList
    //   this.$refs['TransferDialogForm'].dialogShow = true
    //   this.$refs['TransferDialogForm'].type = 'mentor'
    // },
    // transferHandles (val) {
    //   this.$refs['TransferDialogForm'].form.projectHandlesList = val
    //   this.$refs['TransferDialogForm'].methodName = '执行项目经理'
    //   this.$refs['TransferDialogForm'].formRequestFn = transferHandlesList
    //   this.$refs['TransferDialogForm'].dialogShow = true
    //   this.$refs['TransferDialogForm'].type = 'handles'
    // },
  },
}
</script>

<style lang="scss" scoped>
.contianBox {
  .title {
    background-color: #f5f5f5;
    border-radius: 5px;
    .data {
      padding: 10px 15px;
    }
    .edit {
      float: right;
      right: 0;
      width: 30px;
      line-height: 40px;
      cursor: pointer;
    }
  }
  .topBot {
    margin: 20px 0 30px;
    .el-tag {
      margin-right: 10px;
    }
  }
  .item {
    line-height: 20px;
    // margin-bottom: 10px;
  }
  .footer {
    margin: 20px 0 0 60px;
  }
}
.el-form-item {
  margin-bottom: 0;
}

</style>