<template>
  <div class="abs iep-page-form">
    <basic-container>
      <iep-page-header :title="`${methodName}项目`" :backOption="backOption"></iep-page-header>
      <div class="main">
      <el-form :model="formData" :rules="rules" size="small" ref="form" label-width="200px" class="form form-detail">
        <el-row>
          <el-col :span="12">
            <el-form-item label="项目名称：" prop="projectName">
              <el-input v-model="formData.projectName" :placeholder="tipContent.projectName"></el-input>
            </el-form-item>
            <iep-button class="recom-btn" @click="cRecommendType('project')">荐</iep-button>
          </el-col>
          <el-col :span="12">
            <el-form-item label="项目类型：" prop="projectType">
              <iep-dict-select v-model="formData.projectType" dict-name="prms_project_type"></iep-dict-select>
            </el-form-item>
          </el-col>
          <el-col :span="12" v-if="formData.projectType == 2">
            <el-form-item label="客户名称：" prop="relatedClient">
              <!-- <iep-select prefix-url="crm/customer" v-model="formData.relatedClient"></iep-select> -->
              <IepCrmsSelect v-model="formData.relatedClient" :option="[{id: formData.relatedClientList.id, name: formData.relatedClientList.name}]" prefixUrl="crm/customer/all/list">
              </IepCrmsSelect>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="项目标签：" prop="projectTagList">
              <span slot="label">
                项目标签
                <iep-tip :content="tipContent.projectTagList"></iep-tip>：
              </span>
              <iep-tag v-model="formData.projectTagList"></iep-tag>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="项目总负责人：" prop="projectManagerList">
              <iep-contact-select v-model="formData.projectManagerList" :is-show-contact-btn="false"></iep-contact-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="市场经理：" prop="mktManagerList">
              <span slot="label">
                市场经理
                <iep-tip :content="tipContent.mktManagerList"></iep-tip>：
              </span>
              <iep-contact-multiple-user v-model="formData.mktManagerList" :is-show-contact-btn="false"></iep-contact-multiple-user>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="项目指导与审核人：" prop="projectMentorList">
              <span slot="label">
                项目指导与审核人
                <iep-tip :content="tipContent.projectMentorList"></iep-tip>：
              </span>
              <iep-contact-multiple-user v-model="formData.projectMentorList" :is-show-contact-btn="false"></iep-contact-multiple-user>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="项目成员：" prop="membersList">
              <span slot="label">
                项目成员：
                <!-- <iep-tip :content="tipContent.membersList"></iep-tip>： -->
              </span>
              <iep-contact-multiple-user v-model="formData.membersList" :is-show-contact-btn="false"></iep-contact-multiple-user>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="项目经理：" prop="projectHandlesList">
              <span slot="label">
                项目经理：
                <!-- <iep-tip :content="tipContent.projectHandlesList"></iep-tip>： -->
              </span>
              <iep-contact-multiple-user v-model="formData.projectHandlesList" :is-show-contact-btn="false"></iep-contact-multiple-user>
            </el-form-item>
            <iep-button class="recom-btn" @click="cRecommendType('projectHandles')">荐</iep-button>
          </el-col>
          <el-col :span="12">
            <el-form-item label="项目预算：" prop="projectBudget">
              <span slot="label">
                项目预算(元)
                <iep-tip :content="tipContent.projectBudget"></iep-tip>：
              </span>
              <el-input v-model="formData.projectBudget" readonly @click.native="handleBudget" placeholder="点击填写项目预算"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="项目等级：" prop="projectLevel">
              <span slot="label">
                项目等级：
                <!-- <iep-tip :content="tipContent.relatedClient"></iep-tip>： -->
              </span>
              <iep-dict-select v-model="formData.projectLevel" dict-name="prms_project_level"></iep-dict-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="立项时间:" prop="projectTime">
              <span slot="label">
                立项时间：
              </span>
              <iep-date-picker v-model="formData.projectTime" type="date" placeholder="立项时间"></iep-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="结束时间：" prop="endTime">
              <span slot="label">
                结束时间：
              </span>
              <iep-date-picker v-model="formData.endTime" type="date" placeholder="结束时间"></iep-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="集团外部合作伙伴：" prop="groupExternalCooperatePartner">
              <span slot="label">
                集团外部合作伙伴
                <iep-tip :content="tipContent.groupExternalCooperatePartner"></iep-tip>：
              </span>
              <IepCrmsSelect v-model="formData.groupExternalCooperatePartner" :option="[{id: formData.groupExternalCooperatePartnerList.id, name: formData.groupExternalCooperatePartnerList.name}]" prefixUrl="crm/customer/all/list">
              </IepCrmsSelect>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="预计签订时间：" prop="estimatedSigntime">
              <IepDatePicker v-model="formData.estimatedSigntime"></IepDatePicker>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item :label="`${formData.contractList.length > 0 ? '合同' : '项目'}金额：`" prop="projectAmount">
              <el-input 
                v-model="formData.projectAmount" 
                type="number" 
                placeholder="请正确输入非负金额" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="项目阶段：" prop="projectStage">
              <iep-dict-select v-model="formData.projectStage" dict-name="prms_project_stage"></iep-dict-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="所属组织：" prop="orgId">
              <span slot="label">
                所属组织：
              </span>
              <iep-select v-model="formData.orgId" autocomplete="off" prefix-url="admin/org/all" placeholder="请选择组织"></iep-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="放入公海库：" prop="isClaim">
              <span style="padding: 0 5px;">否</span>
              <el-switch v-model="formData.isClaim" :active-value="2" :inactive-value="1" active-color="#13ce66"></el-switch>
              <span style="padding: 0 5px;">是</span>
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item label="是否关联产品：" prop="isRelevanceProduct">
          <span slot="label">
            是否关联产品
            <iep-tip :content="tipContent.isRelevanceProduct"></iep-tip>：
          </span>
          <el-radio-group v-model="formData.isRelevanceProduct">
            <el-radio v-for="item in dictMap.is_yes" :key="item.value" :label="item.value">{{item.label}}</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="添加关联产品：" v-if="formData.isRelevanceProduct === 1">
          <el-button @click="handleAddProduct">添加关联</el-button>
          <ul class="relevance-list" v-if="formData.productList.length > 0">
            <li class="item" v-for="t in formData.productList" :key="t.id">{{t.name}} <i class="el-icon-close" @click="closeRelation(i, 'productList', 'productIds')"></i></li>
          </ul>
        </el-form-item>
        <el-form-item label="未关联产品理由：" prop="notRelevanceProductReason" v-if="formData.isRelevanceProduct === 2">
          <el-input type="textarea" rows="5" v-model="formData.notRelevanceProductReason"></el-input>
        </el-form-item>
        <el-form-item label="添加其他关联：">
          <el-button @click="handleAdd">添加关联</el-button>
        </el-form-item>
        <div v-for="(item, index) in relatedFormList" :key="index">
          <el-form-item :label="`${item.name}：`" v-if="formData[item.list].length > 0">
            <ul class="relevance-list">
              <li class="item" v-for="(t, i) in formData[item.list]" :key="t.id">{{t.name}} <i class="el-icon-close" @click="closeRelation(i, item.list, item.ids)"></i></li>
            </ul>
          </el-form-item>
        </div>
        <el-form-item label="预计回款时间：" class="table">
          <el-table :data="formData.paymentRelations" style="width: 100%">
            <el-table-column prop="projectPaymentTime" label="月份">
              <template slot-scope="scope">
                <el-date-picker
                  v-model="formData.paymentRelations[scope.$index].projectPaymentTime"
                  type="date"
                  placeholder="选择时间"
                  format="yyyy-MM-dd"
                  value-format="yyyy-MM-dd hh:mm:ss"
                  :readonly="formData.paymentRelations[scope.$index].id?true:false">
                </el-date-picker>
              </template>
            </el-table-column>
            <el-table-column prop="paymentAmount" label="回款金额">
              <template slot-scope="scope">
                <el-input 
                  v-if="selectIndex==scope.$index" 
                  v-model="formData.paymentRelations[scope.$index].paymentAmount" 
                  @blur="()=>{changeNumber(scope.$index);selectIndex=-1}" 
                  maxlength="10" 
                  type="number" 
                  min=0
                  placeholder="请正确输入非负回款金额"
                  :readonly="formData.paymentRelations[scope.$index].id?true:false"></el-input>
                <el-input v-else v-model="scope.row.paymentAmount" @focus="selectIndex=scope.$index" style="min-height: 20px;"></el-input>
              </template>
            </el-table-column>
            <el-table-column prop="menu" label="操作" width="200px">
              <template slot-scope="scope">
                <!-- 0可以延期 -->
                <iep-button size="small" v-if="formData.paymentRelations[scope.$index].timeStatus == 0" @click="handleDelay(scope.$index)">延期</iep-button>
                <iep-button size="small" v-if="formData.paymentRelations[scope.$index].timeStatus == 0" @click="handleDelete(scope.$index)">删除</iep-button>
                <div class="project-select-delay" v-if="selectDelay.index == scope.$index">
                  <el-date-picker
                    v-model="selectDelay.value" 
                    type="date" 
                    placeholder="选择延期时间" 
                    ref="selectDelay" 
                    @change="changeDelay" 
                    @blur="selectDelay.index = -1"
                    format="yyyy-MM-dd"
                    value-format="yyyy-MM-dd hh:mm:ss">
                  </el-date-picker>
                </div>
                <iep-button size="small" v-if="!formData.paymentRelations[scope.$index].id" @click="handleDelete(scope.$index)">删除</iep-button>
              </template>
            </el-table-column>
          </el-table>
          <div class="create" @click="handleCreate"><i class="el-icon-plus"></i> 新增</div>
        </el-form-item>
      </el-form>
      <div class="recommend-project" v-if="this.recommendType=='project'">
        <h4 class="recommend-title">同类项目推荐</h4>
        <div class="recommend-container" v-for="r in recommendProjectList" :key="r.id">
          <span class="name">{{r.projectName}}</span>
          <iep-button class="recommend-container-btn" type="danger" plain @click="referenceName(r.projectName)" size="mini">参考名称</iep-button>
          <span style="display:flex;">
            <div class="grade" v-show="r.projectLevel==1">重</div>
            <div class="grade" v-show="r.projectLevel==2">中</div>
            <div class="grade" v-show="r.projectLevel==3">一</div>
            <div class="stage" v-show="r.projectStage==1">初</div>
            <div class="stage" v-show="r.projectStage==2">方</div>
            <div class="stage" v-show="r.projectStage==3">正</div>
            <div class="stage" v-show="r.projectStage==4">项</div>
            负责人：{{r.projectManagerList.name}}
          </span>
          <span class="sign">
            <div v-for="(s,index) in r.projectTagList" :key="index" @click="openSign(s)">{{s}}</div>
          </span>
        </div>
      </div>
      <div class="recommend-projectHandles" v-if="this.recommendType=='projectHandles'">
        <h4 class="recommend-title">优秀项目经理推荐</h4>
        <div class="recommend-container" v-for="r in recommendHandlesList" :key="r.id">
          <div class="img"><iep-img :src="r.avatar" :alt="r.name" class="img-box"></iep-img></div>
          <div class="right">
            <span class="name">{{r.name}}</span>
            <iep-button class="recommend-container-btn" type="danger" plain @click="referenceHandles(r.name,r.id)" size="mini">设为项目经理</iep-button>
            <span>负责了{{r.id}}个项目 | 参与了{{r.id}}个项目</span>
            <span class="sign">
              <div v-for="(s,index) in r.projectTag" :key="index" @click="openSign(s)">{{s}}</div>
            </span>
          </div>
        </div>
      </div>
      </div>

      <footer-tool-bar>
        <iep-button type="primary" @click="save">保存</iep-button>
        <iep-button @click="close">取消</iep-button>
      </footer-tool-bar>
    </basic-container>
      <relation-dialog ref="relationDialog" @relativeSubmit="relativeSubmit"></relation-dialog>
      <product-relation-dialog ref="productRelationDialog" @relativeSubmit="relativeProductSubmit"></product-relation-dialog>
  </div>
</template>

<script>
import { dictMap, rules, initFormData, relatedFormList } from './Total/const.js'
import { getDataDetail, createData, updateData, getRecommendedProjectList, getRecommendedHandlesList } from '@/api/gpms/index'
import { getCustomerPage } from '@/api/crms/customer'
// import { mapState } from 'vuex'
import { mapGetters } from 'vuex'
import { tipContent } from './option'
import RelationDialog from './Total/relation'
import ProductRelationDialog from './Total/productRelation'

export default {
  name: 'add-dialog',
  components: { RelationDialog, ProductRelationDialog },

  data () {
    return {
      projectTime: '',
      endTime: '',
      tipContent,
      backOption: {
        isBack: true,
        backPath: null,
        backFunction: () => {
          this.close()
        },
      },

      formData: initFormData(),
      rules,
      dictMap,
      type: 'create',
      typeObj: {
        create: {
          requestFn: createData,
          name: '新增',
        },
        update: {
          requestFn: updateData,
          name: '编辑',
        },
      },
      clientList: [],
      typeOptions: dictMap.typeOptions, // 项目类型菜单
      isRelevOptions: dictMap.isRelevOptions, // 是否关联菜单
      workTypeOne: dictMap.workTypeOne, // 业务类型一级菜单
      relatedFormList,
      selectIndex: -1,
      selectDelay: {
        value: '',
        index: -1,
      },
      recommendProjectList:[
        // {id:1,projectName:'',projectLevel:'1',projectStage:'1',projectManagerList:{id:1,name:''},projectTagList:[]},
      ],
      recommendHandlesList:[
      ],
      recommendType:'project',
    }
  },
  computed: {
    ...mapGetters(['dictGroup', 'userInfo']),
    id () {
      return +this.$route.params.id
    },
    methodName () {
      return this.id ? '修改' : '新增'
    },
    tagList () {
      return this.$route.query.allTagList
    },
  },
  created () {
    this.formData.relatedClientList.name =  this.$route.query.clientName
    if (this.id) {
      getDataDetail(this.id).then(({ data }) => {
        this.formData = this.$mergeByFirst(initFormData(), data.data)
      })
      this.type='update'
    }
    getRecommendedProjectList({tagList:this.tagList}).then(({ data }) => {
      this.recommendProjectList = data
    })
    getRecommendedHandlesList({tagList:this.tagList}).then(({ data }) => {
      this.recommendHandlesList = data
    })
    getCustomerPage({ type: 1 }).then(({ data }) => {
      this.clientList = data.data.records
    })
  },
  methods: {
    close () {
      this.$router.history.go(-1)
    },
    returnIndex () {
      this.$router.push({
        path:'/gpms/project',
      })
    },
    open (type, data) {
      this.type = type
      if (!data) { // 新增
        this.formData = initFormData()
      } else { // 修改
        data.relatedClient = parseInt(data.relatedClient)
        data.groupExternalCooperatePartner = parseInt(
          data.groupExternalCooperatePartner
        )
        // 判断是否关联合同，若关联，修改字段，并获取到合同的金额
        if (data.contractList && data.contractList.length > 0) {
          data.projectAmount = data.contractList[0].amount
        }
        this.formData = Object.assign({}, this.formData, data)
        this.methodName = '修改'
      }
    },
    save () {
      this.$refs['form'].validate((valid) => {
        if (valid) {
          // 进行数据的转换先
          let personList = [{
            name: 'mktManager',
            list: 'mktManagerList',
          }, {
            name: 'projectManager',
            list: 'projectManagerList',
          }]
          let mentorList = [
            {
              name: 'projectMentor',
              list: 'projectMentorList',
            },
          ]
          let form = { id:this.id,...this.formData }
          form.memberList = this.formData.membersList.map(m => m.id)
          form.marketManagerList = this.formData.mktManagerList.map(m => m.id)
          form.mentorList = this.formData.projectMentorList.map(m => m.id)
          form.projectHandles = this.formData.projectHandlesList.map(m => m.id)
          form.productIds = this.formData.productList.map(m => m.id)
          for (let item of this.relatedFormList) {
            form[item.ids] = this.formData[item.list].map(m => m.id)
          }
          for (let item of mentorList) {
            form[item.name] = this.formData[item.list].id
          }
          // console.log(personList)
          if (this.formData.mktManager == '') {
            for (let item of personList) {
              form[item.name] = this.userInfo.userId
            }
          } else {
            for (let item of personList) {
              form[item.name] = this.formData[item.list].id
            }
          }
          if (this.formData.projectManager == '') {
            for (let item of personList) {
              form[item.name] = this.userInfo.userId
            }
          } else {
            for (let item of personList) {
              form[item.name] = this.formData[item.list].id
            }
          }
          // 判断签订状态 -- 是否关联合同 -- 已签-1 待签-2
          form.signatureStatus = form.contractIds.length > 0 ? 1 : 2

          // 回款表加上index
          for (let index = 0; index < form.paymentRelations.length; ++index) {
            form.paymentRelations[index].serialNumber = index + 1
          }

          form.inChargeDept = this.formData.inChargeDeptList.id
          form.coopDept = this.formData.coopDeptList.id
          delete form.productList
          delete form.summaryList
          delete form.materialList
          delete form.contractList
          delete form.projectList
          delete form.reportList
          this.typeObj[this.type].requestFn(form).then(() => {
            this.$message({
              message: `${this.methodName}成功`,
              type: 'success',
            })
            this.returnIndex()
          })
        } else {
          return false
        }
      })
    },
    // 业务类型
    businessTypeChange (val) {
      console.log('val: ', val)
    },
    handleAdd () {
      this.$refs['relationDialog'].dialogShow = true
      this.$refs['relationDialog'].loadData({
        summaryList: this.formData.summaryList,
        materialList: this.formData.materialList,
        contractList: this.formData.contractList,
        projectList: this.formData.projectList,
        reportList: this.formData.reportList,
      })
    },
    handleAddProduct () {
      this.$refs['productRelationDialog'].dialogShow = true
      this.$refs['productRelationDialog'].loadData({
        productList: this.formData.productList,
      })
    },
    // 添加其他关联
    relativeSubmit (list) {
      this.formData = Object.assign({}, this.formData, list)
    },
    // 添加关联产品
    relativeProductSubmit (list) {
      this.formData.productList = list.productList
    },
    // 删除关联
    closeRelation (index, list, ids) {
      this.formData[list].splice(index, 1)
      this.formData[ids].splice(index, 1)
    },
    handleCreate () {
      this.formData.paymentRelations.push({
        projectPaymentTime: '',
        paymentAmount: '',
      })
    },
    handleDelete (index) {
      this.formData.paymentRelations.splice(index, 1)
    },
    // 预计回款时间金额调整
    changeNumber (index) {
      this.$nextTick(() => {
        if (this.formData.paymentRelations[index].paymentAmount < 0) {
          this.formData.paymentRelations[index].paymentAmount = 0
        }
      })
    },
    // 延期
    handleDelay (index) {
      this.selectDelay.index = index
      this.$nextTick(() => {
        this.$refs['selectDelay'].focus()
      })
    },
    changeDelay (val) {
      this.formData.paymentRelations[this.selectDelay.index].projectPaymentTime = val
      this.selectDelay.index = -1
    },
    // // 项目预算
    // handleBudget () {
    //   this.$refs['budgetDialog'].open(this.formData.projectBudgetList)
    // },
    budgetSubmit (val) {
      this.formData.projectBudgetList = val
      this.formData.projectBudget = val.projectBudget
    },
    openSign (val) {
      this.$openTagDetail(val)
    },
    referenceName (val) {
      this.formData.projectName = val
    },
    referenceHandles (val,id) {
      const projectHandles=this.formData.projectHandlesList.map(m => {
        return m['id']
      })
      if(projectHandles.includes(id)==false){
        this.formData.projectHandlesList.push({id:id,name:val})
      }
    },
    cRecommendType (val) {
      this.recommendType = val
    },
  },
}
</script>

<style scoped lang="scss">
.abs {
  padding-bottom: 30px;
}
.relevance-list {
  padding: 0;
  .item {
    list-style: none;
    height: 28px;
    i {
      margin-left: 10px;
      cursor: pointer;
    }
  }
}
.table {
  .create {
    text-align: center;
    color: #ba1b21;
    cursor: pointer;
  }
}
.project-select-delay {
  width: 0;
  height: 0;
  input {
    width: 0;
    height: 0;
    border: 0;
  }
  span {
    display: none;
  }
}

</style>
<style lang="scss" scoped>
.main{
  display: grid;
  grid-auto-flow: row dense;
  grid-template-columns: 1fr 400px;
  border-top: 1px solid #eee;
  .recommend-projectHandles,.recommend-project{
    padding: 20px;
    border-left: 1px solid #eee;
    box-shadow:-2px 0px 2px #eee;
    .recommend-title{
      font-size: 16px;
      height: 36px;
      margin-bottom: 20px;
      padding-bottom: 10px;
      border-bottom: 1px solid #eee;
    }
    .recommend-container{
      margin-bottom: 10px;
      padding-bottom: 10px;
      border-bottom: 1px solid #eee;
      position: relative;
      overflow: hidden;
      &:last-child{border:0;}
      .recommend-container-btn{
        position: absolute;
        right: 0;
        top: 5px;
      }
    }
  }
  .recommend-project{
    .recommend-container{
      > span{
        height: 38px;
        line-height: 38px;
      }
      .name{
        width: 260px;
        display: block;
        overflow : hidden;text-overflow: ellipsis;display: -webkit-box;-webkit-line-clamp: 1;-webkit-box-orient: vertical;
      }
      .grade,.stage{
        color: #fff;
        font-size: 12px;
        padding: 0 6px;
        height: 18px;
        line-height: 18px;
        margin-right: 4px;
        margin-top: 10px;
      }
      .grade{
        background-color: #b91b21;
      }
      .stage{
        background-color: #b5b5b5;
        margin-right: 10px;
      }
      .sign{
        overflow: hidden;text-overflow: ellipsis;white-space: nowrap;
        > div{
          color: #999;
          position: relative;
          margin-right: 24px;
          display: inline-block;
          cursor: pointer;
          &:after{
            content: '/';
            position: absolute;
            right: -14px;
            top: 0;
          }
          &:last-child{
            &:after{
              content: '';
            }
          }
        }
      }
    }
  }
  .recommend-projectHandles{
    .img{
      width:80px;
      float: left;
      .img-box{
        width:80px;
      }
    }
    .right{
      width: 260px;
      float: left;
      margin-left: 10px;
      > span{
        height: 22px;
        line-height: 22px;
      }
      .name{
        font-size: 16px;
        height: 34px;
        line-height: 34px;
        width: 240px;
        display: block;
        overflow : hidden;text-overflow: ellipsis;display: -webkit-box;-webkit-line-clamp: 1;-webkit-box-orient: vertical;
      }
      .sign{
        overflow: hidden;text-overflow: ellipsis;white-space: nowrap;
        > div{
          color: #999;
          position: relative;
          margin-right: 24px;
          display: inline-block;
          cursor: pointer;
          &:after{
            content: '/';
            position: absolute;
            right: -14px;
            top: 0;
          }
          &:last-child{
            &:after{
              content: '';
            }
          }
        }
      }
    }
  }
  .recom-btn{
    position: absolute;
    right: -70px;
    top: 0;
  }
}
</style>
<style scoped>
.main >>> .el-col-12{
  width: 100%;
  position: relative;
}
</style>
