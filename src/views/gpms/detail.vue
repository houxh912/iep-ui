<template>
  <div class="see-project">
    <keep-alive>
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
                <el-col :span="24" class="item">
                  <el-form-item label="项目名称：">
                    {{formData.projectName}}
                    <span v-if="formData.projectType==1" class="name-span">内部项目</span>
                    <span v-else class="name-span">外部项目</span>
                  </el-form-item>
                </el-col>
                <el-col :span="24" class="item">
                  <el-form-item label="项目标签：">
                    <el-tag type='info' v-for="(item, index) in formData.projectTagList" :key="index">{{item}}</el-tag>
                  </el-form-item>
                </el-col>
                <el-col :span="12" class="item">
                  <el-form-item label="项目编号：">
                    {{formData.serialNo}}
                  </el-form-item>
                </el-col>
                <el-col :span="12" class="item" v-show="formData.projectType==1">
                  <el-form-item label="委托组织：">
                    {{formData.attendeeByName}}
                  </el-form-item>
                </el-col>
                <el-col :span="12" class="item" v-show="formData.projectType==2">
                  <el-form-item label="客户名称：">
                    {{formData.relatedClientName}}
                  </el-form-item>
                </el-col>
                <el-col :span="12" class="item">
                  <el-form-item label="项目阶段：">
                    <span v-if="formData.projectStage==1">初步意向</span>
                    <span v-else-if="formData.projectStage==2">方案提交</span>
                    <span v-else-if="formData.projectStage==3">正在执行</span>
                    <span v-else>项目完结</span>
                  </el-form-item>
                </el-col>
                <el-col :span="12" class="item">
                  <el-form-item label="项目等级：">
                    <span v-if="formData.projectLevel==1">重要项目</span>
                    <span v-else-if="formData.projectLevel==2">中级项目</span>
                    <span v-else>一般项目</span>
                  </el-form-item>
                </el-col>
                <el-col :span="12" class="item">
                  <el-form-item label="立项时间：">
                    <!-- <span v-if="formData.approvalTime==''">{{formData.projectTime|parseToDay}}</span>
                    <span v-else>{{formData.approvalTime|parseToDay}}</span> -->
                    <span>{{formData.projectTime|parseToDay}}</span>
                  </el-form-item>
                </el-col>
                <el-col :span="12" class="item">
                  <el-form-item label="结束时间：">
                    <span v-if="formData.endTime==''">--</span>
                    <span v-else>{{formData.endTime|parseToDay}}</span>
                  </el-form-item>
                </el-col>
                <el-col :span="12" class="item">
                  <el-form-item label="签订时间：">
                    <span v-if="formData.estimatedSigntime==''">--</span>
                    <span v-else>{{formData.estimatedSigntime|parseToDay}}</span>
                  </el-form-item>
                </el-col>
                <el-col :span="12" class="item">
                  <el-form-item label="相关产品：">
                    <span v-if="formData.productList.length==0">无（{{formData.notRelevanceProductReason}}）</span>
                    <span v-else v-for="(item, index) in formData.productList" :key="index" class="people">{{item.name}}</span>
                  </el-form-item>
                </el-col>
                <el-col :span="12" class="item" v-if="formData.contractList.length > 0">
                  <el-form-item label="合同金额：">
                    {{formData.contractAmount}}
                  </el-form-item>
                </el-col>
                <el-col :span="12" class="item" v-else>
                  <el-form-item label="项目预算：">
                    {{formData.projectAmount}}
                  </el-form-item>
                </el-col>
                <el-col :span="12" class="item">
                  <el-form-item label="外部合作：">
                    {{formData.groupExternalCooperatePartnerName}}
                  </el-form-item>
                </el-col>
                <el-col :span="24" class="item">
                  <el-form-item label="项目说明：">
                    {{formData.projectExplain}}
                  </el-form-item>
                </el-col>
              </el-row>
              <hr>
              <el-row>
                <el-col :span="12" class="item">
                  <el-form-item label="项目经理：">
                    {{formData.projectManagerName}}
                  </el-form-item>
                </el-col>
                <el-col :span="12" class="item">
                  <el-form-item label="项目督导：">
                    <span v-if="formData.projectMentorList.length==0">无</span>
                    <span v-for="a in formData.projectMentorList" :key="a.id" class="people">{{a.name}}</span>
                    <!-- <iep-button type="danger" plain size="mini" @click="transferMentor(formData.projectMentorList)">变更</iep-button> -->
                  </el-form-item>
                </el-col>
                <el-col :span="12" class="item">
                  <el-form-item label="市场经理：">
                    <span v-if="formData.mktManagerList.length==0">无</span>
                    <span v-for="a in formData.mktManagerList" :key="a.id" class="people">{{a.name}}</span>
                  </el-form-item>
                </el-col>
                <el-col :span="12" class="item">
                  <el-form-item label="协作负责人：">
                    <span v-if="formData.projectHandlesList.length==0">无</span>
                    <span v-for="a in formData.projectHandlesList" :key="a.id" class="people">{{a.name}}</span>
                    <!-- <iep-button type="danger" plain size="mini" @click="transferHandles(formData.projectHandlesList)">变更</iep-button> -->
                  </el-form-item>
                </el-col>
                <el-col :span="12" class="item">
                  <el-form-item label="团队成员：">
                    <span v-if="formData.membersList.length==0">无</span>
                    <span v-for="a in formData.membersList" :key="a.id" class="people">{{a.name}}</span>
                  </el-form-item>
                </el-col>
                <!-- <el-col :span="12" class="item">
                <el-form-item label="相关产品：">
                  {{formData.relatedProductList}}
                </el-form-item>
              </el-col>
              <el-col :span="12" class="item">
                <el-form-item label="项目核算：">
                  {{formData.serialNo}}
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
        <!-- 关联合同 -->
        <div class="contianBox">
          <el-row class="title">
            <el-col :span="20" class="data">关联合同</el-col>
          </el-row>
          <el-row class="topBot">
            <el-form label-width="150px">
              <el-row>
                <el-col :span="20" class="item">
                  <el-form-item>
                    <contract-table :dataList="formData.contractList"></contract-table>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-form>
          </el-row>
        </div>
        <!-- 关联项目 -->
        <div class="contianBox">
          <el-row class="title">
            <el-col :span="20" class="data">关联项目</el-col>
          </el-row>
          <el-row class="topBot">
            <el-form label-width="150px">
              <el-row>
                <el-col :span="20" class="item">
                  <el-form-item>
                    <project-table :dataList="formData.projectList"></project-table>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-form>
          </el-row>
        </div>
        <!-- 收款计划 -->
        <div class="contianBox">
          <el-row class="title">
            <el-col :span="20" class="data">项目成本预算</el-col>
          </el-row>
          <el-row class="topBot">
            <el-form label-width="150px">
              <el-row>
                <el-col :span="20" class="item">
                  <el-form-item>
                    <p>注：外包费用、佣金、项目总预算为必填项，<span style="color: #f00;">如不填，则不发项目提成</span></p>
                    <collection-table :dataList="[formData.projectBudgetList]"></collection-table>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-form>
          </el-row>
        </div>
        <!-- 预计回款时间 -->
        <div class="contianBox">
          <el-row class="title">
            <el-col :span="20" class="data">项目回款计划</el-col>
          </el-row>
          <el-row class="topBot">
            <el-form label-width="150px">
              <el-row>
                <el-col :span="20" class="item">
                  <el-form-item>
                    <p>项目回款计划：单位（元），查看<span style="color: #f00;">收款奖惩措施</span></p>
                    <payback-table :dataList="formData.paymentRelations"></payback-table>
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
        <div class="contianBox" v-show="projectStatus!='1'&&projectStatus!='2'">
          <el-row class="title">
            <el-col :span="20" class="data">审批意见</el-col>
          </el-row>
          <el-row class="topBot">
            <el-form label-width="150px">
              <el-row>
                <el-col :span="20" class="item" style="height:200px;">
                  <el-form-item class="center-box">
                    <el-radio-group v-model="projectStatus" class="projectStatus" :disabled="isApprove.isApprove!=true">
                      <el-radio :label="'3'">审核通过</el-radio>
                      <el-radio :label="'4'">审核不通过</el-radio>
                    </el-radio-group>
                    <iep-input-area v-if="projectStatus === '4'" class="content" v-model="content" :disabled="isApprove.isApprove!=true">
                    </iep-input-area>
                  </el-form-item>
                </el-col>
                <el-col :span="20" class="data" v-show="isApprove.isApprove==true">
                  <el-form-item>
                    <iep-button type="primary" @click="handleSubmit" :disabled="isApprove.isApprove!=true">提交</iep-button>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-form>
          </el-row>
        </div>
      </basic-container>
    </keep-alive>
  </div>
</template>

<script>
import { getDataDetail, approvalById } from '@/api/gpms/index'
import collectionTable from './collectionTable'
import materialTable from './materialTable'
import paybackTable from './paybackTable'
import contractTable from './contractTable'
import projectTable from './projectTable'
// import { initFormData } from './project/Total/const'
export default {
  components: {
    collectionTable,
    materialTable,
    paybackTable,
    contractTable,
    projectTable,
  },
  props: {
    record: {
      type: Object,
      default: () => { },
    },
  },
  activated () {
    this.getDetailData4()
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
      projectStatus: '3',
      content: '',
      id: this.$route.params.id,
    }
  },
  created () {
    this.getDetailData()
  },
  computed: {
    isApprove () {
      return this.$route.query
    },
  },
  methods: {
    close () {
      if (this.$route.params.id) {
        this.$router.history.go(-1)
      }
      else {
        this.$emit('onGoBack')
      }
    },
    getDetailData () {
      if (!this.id) {
        this.id = this.record.id
      }
      getDataDetail(this.id).then(({ data }) => {
        let list = [
          { name: 'relatedClientName', list: 'relatedClientList' },
          { name: 'projectManagerName', list: 'projectManagerList' },//负责人
          { name: 'groupExternalCooperatePartnerName', list: 'groupExternalCooperatePartnerList' },//外部合作
        ]
        for (let item of list) {
          if (data.data[item.list]) {
            data.data[item.name] = data.data[item.list].name
          } else {
            data.data[item.name] = '无'
          }
        }
        this.formData = data.data
        this.projectStatus = this.formData.projectStatus
        this.content = this.formData.content
        for (var i in data.data.reportList) {
          data.data.reportList[i].type = '周报'
        }
        for (var j in data.data.summaryList) {
          data.data.summaryList[j].type = '会议纪要'
        }
        for (var k in data.data.materialList) {
          data.data.materialList[k].type = '材料'
        }
        this.formData.materialList = data.data.materialList.concat(data.data.reportList, data.data.summaryList)
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
    .name-span {
      background-color: #ba1b21;
      color: #fff;
      padding: 2px 4px;
      font-size: 12px;
      border-radius: 4px;
      margin-left: 5px;
    }
  }
  .item {
    line-height: 20px;
    // margin-bottom: 10px;
    .people {
      margin-right: 10px;
      padding-right: 5px;
      position: relative;
      display: inline-block;
      &:after {
        content: "、";
        position: absolute;
        right: -12px;
        top: -2px;
      }
      &:last-child:after {
        content: "";
        position: absolute;
        right: -12px;
        top: -2px;
      }
    }
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
.contianBox >>> .el-form-item__content {
  text-align: left;
}
.contianBox >>> .center-box .content {
  padding: 0;
}
.see-project >>> ::-webkit-scrollbar {
  border-radius: 10px;
  width: 6px;
  background-color: #fff;
}
.see-project >>> ::-webkit-scrollbar-track {
  border-radius: 10px;
  background-color: #fff;
  -webkit-transition: 0.3s background-color;
  transition: 0.3s background-color;
}
.see-project >>> ::-webkit-scrollbar-thumb {
  border-radius: 10px;
  background-color: #ddd;
  -webkit-transition: 0.3s background-color;
  transition: 0.3s background-color;
  display: none;
  -webkit-transition: all 0.5s;
  transition: all 0.5s;
}
.see-project >>> :hover::-webkit-scrollbar-thumb {
  display: block;
}
</style>
