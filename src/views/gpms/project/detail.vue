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
                  <el-tag type='info' v-for="(item, index) in formData.projectTagList" :key="index">{{item}}</el-tag>
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
              <el-col :span="20" class="item">
                <el-form-item>
                  <material-table :dataList="formData.materialList"></material-table>
                </el-form-item>
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
              <el-col :span="20" class="item">
                <el-form-item>
                  <collection-table :dataList="[formData.projectBudgetList]"></collection-table>
                </el-form-item>
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
              <el-col :span="20" class="item" style="height:200px;">
                <el-form-item class="center-box">
                  <el-radio-group v-model="projectStatus" class="projectStatus" :disabled="isApprove.isApprove==false">
                    <el-radio :label="3">审核通过</el-radio>
                    <el-radio :label="4">审核不通过</el-radio>
                  </el-radio-group>
                  <iep-input-area v-if="projectStatus === 4" class="content" v-model="content">
                  </iep-input-area>
                </el-form-item>
              </el-col>
              <el-col :span="20" class="data">
                <el-form-item>
                  <iep-button type="primary" @click="handleSubmit">提交</iep-button>
                </el-form-item>
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
import { getDataDetail, approvalById } from '@/api/gpms/index'
import TransferDialogForm from './TransferDialogForm'
import collectionTable from './collectionTable'
import materialTable from './materialTable'
export default {
  components: {
    TransferDialogForm,
    collectionTable,
    materialTable,
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
      projectStatus:3,
      content:'',
    }
  },
  created () {
    this.getDetailData()
  },
  computed: {
    id () {
      return this.$route.params.id ? +this.$route.params.id : null
    },
    isApprove () {
      return this.$route.query
    },
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
    handleSubmit () {
      approvalById({
        ids: [this.id],
        projectStatus: this.projectStatus, // 用来变更状态
        content: this.content,
      }).then(({ data }) => {
        if (data.data) {
          this.$message({
            message: '成功',
            type: 'success',
          })
        } else {
          this.$message({
            message: data.msg,
            type: 'warning',
          })
        }
        this.close()
      })
    },
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
.center-box {
  text-align: center;
  padding: 0 20px;
  .projectStatus {
    margin-bottom: 20px;
  }
  .content {
    box-sizing: border-box;
    margin-bottom: 10px;
    padding: 0 20px;
  }
}
</style>
<style scoped>
.contianBox >>> .el-form-item__content{
  text-align: left;
}
.contianBox >>> .center-box .content{
  padding:0;
}
</style>
