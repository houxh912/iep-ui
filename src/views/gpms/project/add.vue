<template>
  <div class="abs iep-page-form">
    <basic-container>
      <iep-page-header :title="`${methodName}项目`" :backOption="backOption"></iep-page-header>
      <el-form :model="formData" :rules="rules" size="small" ref="form" label-width="200px" class="form form-detail">
        <el-row>
          <el-col :span="12">
            <el-form-item label="项目名称：" prop="projectName">
              <el-input v-model="formData.projectName" :placeholder="tipContent.projectName" maxlength="99"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item prop="projectTypeBefore">
              <el-checkbox v-model="formData.projectTypeBefore">内部项目</el-checkbox>
            </el-form-item>
          </el-col>
          <el-col :span="12" v-if="formData.projectTypeBefore == true">
            <el-form-item label="委托组织：" prop="attendeeId">
              <iep-select v-model="formData.attendeeId" autocomplete="off" prefix-url="admin/org/all" placeholder="请选择组织"></iep-select>
            </el-form-item>
          </el-col>
          <el-col :span="12" v-if="formData.projectTypeBefore == false" style="position: relative;">
            <el-form-item label="客户名称：" prop="relatedClient">
              <!-- <iep-select prefix-url="crm/customer" v-model="formData.relatedClient"></iep-select> -->
              <IepCrmsSelect v-model="formData.relatedClient" :option="[{id: formData.relatedClientList.id, name: formData.relatedClientList.name}]" prefixUrl="crm/customer/all/list">
              </IepCrmsSelect>
            </el-form-item>
            <iep-button style="position: absolute;right:-100px;top:0;" @click="addClient">新增客户</iep-button>
          </el-col>
          <el-col :span="12">
            <el-form-item label="关联外部项目：" v-if="formData.projectTypeBefore == true">
              <el-button @click="handleAddExternalProject">添加关联</el-button>
              <div class="relevance-list-after" v-if="formData.projectList.length > 0">
                <span class="item" v-for="(t, i) in formData.projectList" :key="t.id">{{t.name}} <i class="el-icon-close" @click="closeRelation(i, 'projectList', 'projectIds')"></i></span>
              </div>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="项目标签：" prop="projectTagList">
              <span slot="label">
                项目标签
                <iep-tip :content="tipContent.projectTagList"></iep-tip>：
              </span>
              <iep-tag v-model="formData.projectTagList"></iep-tag>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="项目经理：" prop="projectManagerList">
              <span slot="label">
                项目经理
                <iep-tip :content="tipContent.projectManagerList"></iep-tip>：
              </span>
              <iep-contact-select v-model="formData.projectManagerList" :is-show-contact-btn="false" disabled></iep-contact-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="项目督导：" prop="projectMentorList">
              <span slot="label">
                项目督导
                <iep-tip :content="tipContent.projectMentorList"></iep-tip>：
              </span>
              <iep-contact-multiple-user v-model="formData.projectMentorList" :is-show-contact-btn="false"></iep-contact-multiple-user>
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
            <el-form-item label="协作负责人：" prop="projectHandlesList">
              <span slot="label">
                协作负责人：
              </span>
              <iep-contact-multiple-user v-model="formData.projectHandlesList" :is-show-contact-btn="false"></iep-contact-multiple-user>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="项目成员：" prop="membersList">
              <span slot="label">
                项目成员：
                <!-- <iep-tip :content="tipContent.membersList"></iep-tip>： -->
              </span>
              <iep-contact-multiple-user v-model="formData.membersList" :is-show-contact-btn="false"></iep-contact-multiple-user>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="项目说明：" prop="projectExplain">
              <el-input v-model="formData.projectExplain" maxlength="254"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <hr>
        <el-row>
          <el-col :span="12">
            <el-form-item label="项目阶段：" prop="projectStage">
              <iep-dict-select v-model="formData.projectStage" dict-name="prms_project_stage"></iep-dict-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="项目等级：" prop="projectLevel">
              <span slot="label">
                项目等级：
                <!-- <iep-tip :content="tipContent.relatedClient"></iep-tip>： -->
              </span>
              <iep-dict-select v-model="formData.projectLevel" dict-name="prms_project_level" disabled></iep-dict-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="立项时间:" prop="projectTime">
              <span slot="label">
                立项时间：
              </span>
              <!-- <iep-date-picker v-if="formData.projectStatus=='3'" v-model="formData.approvalTime" type="date" placeholder="立项时间" disabled></iep-date-picker>-->
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
            <el-form-item label="签订时间：" prop="estimatedSigntime">
              <IepDatePicker v-model="formData.estimatedSigntime"></IepDatePicker>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item :label="`${formData.contractList.length > 0 ? '合同' : '项目'}金额：`" prop="projectAmount">
              <el-input v-if="formData.contractList.length > 0" v-model="formData.contractAmount" disabled />
              <iep-input-number v-else v-model="formData.projectAmount" placeholder="请正确输入非负金额"></iep-input-number>
            </el-form-item>
          </el-col>
          <!-- <el-col :span="12">
            <el-form-item label="项目预算：" prop="projectBudget">
              <span slot="label">
                项目预算
                <iep-tip :content="tipContent.projectBudget"></iep-tip>：
              </span>
              <el-input v-model="formData.projectBudget" readonly @click.native="handleBudget" placeholder="点击填写项目预算"></el-input>
            </el-form-item>
          </el-col> -->
          <el-col :span="12">
            <el-form-item label="外部合作：" prop="groupExternalCooperatePartner">
              <span slot="label">
                外部合作
                <iep-tip :content="tipContent.groupExternalCooperatePartner"></iep-tip>：
              </span>
              <IepCrmsSelect v-model="formData.groupExternalCooperatePartner" :option="[{id: formData.groupExternalCooperatePartnerList.id, name: formData.groupExternalCooperatePartnerList.name}]" prefixUrl="crm/customer/all/list">
              </IepCrmsSelect>
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
          <!-- <el-col :span="12">
            <el-form-item label="放入公海库：" prop="isClaim">
              <span style="padding: 0 5px;">否</span>
              <el-switch v-model="formData.isClaim" :active-value="2" :inactive-value="1" active-color="#13ce66"></el-switch>
              <span style="padding: 0 5px;">是</span>
            </el-form-item>
          </el-col> -->
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
            <li class="item" v-for="(t, i) in formData.productList" :key="t.id">{{t.name}} <i class="el-icon-close" @click="closeRelation(i, 'productList', 'productIds')"></i></li>
          </ul>
        </el-form-item>
        <el-form-item label="未关联产品理由：" prop="notRelevanceProductReason" v-if="formData.isRelevanceProduct === 2">
          <el-input type="textarea" rows="5" v-model="formData.notRelevanceProductReason" maxlength="254"></el-input>
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
        <hr>
        <el-button @click="shrinkOpen()" class="show3">{{shrink}}</el-button>
        <el-collapse-transition>
          <div v-show="show3">
            <el-form-item>
            </el-form-item>
            <el-form-item label="项目成本预算：">
              <p>注：外包费用、佣金、项目总预算为必填项，<span style="color: #f00;">如不填，则不发项目提成</span></p>
              <el-table :data="tableData" style="width: 100%" class="table">
                <el-table-column prop="artificialCost" label="人工成本" align='center'>
                  <template slot-scope="scope">
                    <el-input v-model="scope.row.artificialCost" maxlength="12" type="number" min=0></el-input>
                  </template>
                </el-table-column>
                <el-table-column prop="projectCommission" label="项目提成" align='center'>
                  <template slot-scope="scope">
                    <el-input v-model="scope.row.projectCommission" maxlength="12" type="number" min=0></el-input>
                  </template>
                </el-table-column>
                <el-table-column label="项目费用" align='center'>
                  <el-table-column prop="taxes" label="税费" align='center'>
                    <template slot-scope="scope">
                      <el-input v-model="scope.row.taxes" maxlength="12" type="number" min=0></el-input>
                    </template>
                  </el-table-column>
                  <el-table-column prop="bidWinning" label="中标服务费" align='center'>
                    <template slot-scope="scope">
                      <el-input v-model="scope.row.bidWinning" maxlength="12" type="number" min=0></el-input>
                    </template>
                  </el-table-column>
                  <el-table-column prop="outsourcingCost" align='center'>
                    <template slot="header">
                      <span class="column-header">外包费用</span>
                    </template>
                    <template slot-scope="scope">
                      <el-input v-model="scope.row.outsourcingCost" maxlength="12" type="number" min=0></el-input>
                    </template>
                  </el-table-column>
                  <el-table-column prop="expertsFee" label="项目评审专家费" align='center' width="150">
                    <template slot-scope="scope">
                      <el-input v-model="scope.row.expertsFee" maxlength="12" type="number" min=0></el-input>
                    </template>
                  </el-table-column>
                  <el-table-column prop="commission" align='center'>
                    <template slot="header">
                      <span class="column-header">佣金</span>
                    </template>
                    <template slot-scope="scope">
                      <el-input v-model="scope.row.commission" maxlength="12" type="number" min=0></el-input>
                    </template>
                  </el-table-column>
                  <el-table-column prop="otherFees" label="其他" align='center'>
                    <template slot-scope="scope">
                      <el-input v-model="scope.row.otherFees" maxlength="12" type="number" min=0></el-input>
                    </template>
                  </el-table-column>
                </el-table-column>
                <el-table-column prop="managementFee" label="项目管理费" align='center'>
                  <template slot-scope="scope">
                    <el-input v-model="scope.row.managementFee" maxlength="12" type="number" min=0></el-input>
                  </template>
                </el-table-column>
                <el-table-column prop="invoiceFee" label="开票费用" align='center'>
                  <template slot-scope="scope">
                    <el-input v-model="scope.row.invoiceFee" maxlength="12" type="number" min=0></el-input>
                  </template>
                </el-table-column>
                <el-table-column prop="travelFee" label="差旅费" align='center'>
                  <template slot-scope="scope">
                    <el-input v-model="scope.row.travelFee" maxlength="12" type="number" min=0></el-input>
                  </template>
                </el-table-column>
                <el-table-column prop="projectBudget" align='center'>
                  <template slot="header">
                    <span class="column-header">费用总预算</span>
                  </template>
                  <template slot-scope="scope">
                    <el-input v-model="scope.row.projectBudget" maxlength="12" type="number" min=0></el-input>
                  </template>
                </el-table-column>
                <el-table-column prop="forecastProfits" label="预估利润" align='center'>
                  <template slot-scope="scope">
                    <el-input v-model="scope.row.forecastProfits" maxlength="12" type="number" min=0></el-input>
                  </template>
                </el-table-column>
              </el-table>
            </el-form-item>
            <el-form-item label="预计回款时间：" class="table">
              <el-table :data="formData.paymentRelations" style="width: 100%" border class="table">
                <el-table-column prop="projectPaymentTime" label="回款时间" align='center'>
                  <template slot-scope="scope">
                    <el-date-picker v-model="formData.paymentRelations[scope.$index].projectPaymentTime" type="date" placeholder="选择时间" format="yyyy-MM-dd" value-format="yyyy-MM-dd hh:mm:ss" :readonly="formData.paymentRelations[scope.$index].id?true:false">
                    </el-date-picker>
                  </template>
                </el-table-column>
                <el-table-column prop="paymentAmount" label="回款金额" align='center'>
                  <template slot-scope="scope">
                    <el-input v-if="selectIndex==scope.$index" v-model="formData.paymentRelations[scope.$index].paymentAmount" @blur="()=>{changeNumber(scope.$index);selectIndex=-1}" maxlength="10" type="number" min=0 placeholder="请正确输入非负回款金额" :readonly="formData.paymentRelations[scope.$index].id?true:false"></el-input>
                    <el-input v-else v-model="scope.row.paymentAmount" @focus="selectIndex=scope.$index" style="min-height: 20px;"></el-input>
                  </template>
                </el-table-column>
                <el-table-column prop="menu" label="操作" width="200px" align='center'>
                  <template slot-scope="scope">
                    <iep-button size="small" v-if="formData.paymentRelations[scope.$index].timeStatus == 0" @click="handleDelay(scope.$index)">延期</iep-button>
                    <iep-button size="small" v-if="formData.paymentRelations[scope.$index].timeStatus == 0" @click="handleDelete(scope.$index)">删除</iep-button>
                    <div class="project-select-delay" v-if="selectDelay.index == scope.$index">
                      <el-date-picker v-model="selectDelay.value" type="date" placeholder="选择延期时间" ref="selectDelay" @change="changeDelay" @blur="selectDelay.index = -1" format="yyyy-MM-dd" value-format="yyyy-MM-dd hh:mm:ss">
                      </el-date-picker>
                    </div>
                    <iep-button size="small" v-if="!formData.paymentRelations[scope.$index].id" @click="handleDelete(scope.$index)">删除</iep-button>
                  </template>
                </el-table-column>
              </el-table>
              <div class="create" @click="handleCreate"><i class="el-icon-plus"></i> 新增</div>
            </el-form-item>
          </div>
        </el-collapse-transition>
      </el-form>

      <footer-tool-bar>
        <iep-button v-show="formData.projectStatus!='3'" type="primary" @click="save('2')" :loading="btnLoading">保存并发布</iep-button>
        <iep-button v-show="formData.projectStatus!='3'" @click="save('1')" :loading="btnLoading">保存为草稿</iep-button>
        <iep-button v-show="formData.projectStatus=='3'" type="primary" @click="save('3')" :loading="btnLoading">保存</iep-button>
      </footer-tool-bar>
    </basic-container>
    <relation-dialog ref="relationDialog" @relativeSubmit="relativeSubmit"></relation-dialog>
    <product-relation-dialog ref="productRelationDialog" @relativeSubmit="relativeProductSubmit"></product-relation-dialog>
    <project-relation-dialog ref="projectRelationDialog" @relativeSubmit="relativeprojectSubmit"></project-relation-dialog>
  </div>
</template>

<script>
import { dictMap, initFormData, relatedFormList, initBudgetForm } from './Total/const.js'
import { getDataDetail, createData, updateData, checkProjectName } from '@/api/gpms/index'
// import { getCustomerPage } from '@/api/crms/customer'
// import { mapState } from 'vuex'
import { mapState, mapMutations, mapGetters } from 'vuex'
import { tipContent } from './option'
import RelationDialog from './Total/relation'
import ProductRelationDialog from './Total/productRelation'
import projectRelationDialog from './Total/projectRelation'
var oldProjectName//验证名称是否被修改
let intValidate = (rule, value, callback) => {
  if (/^[1-9]*[1-9][0-9]*$/.test(value) || value === '') {
    callback()
  } else {
    callback(new Error())
  }
}
var timeout = null
var checkName = (rule, value, callback) => {
  if (!value) {
    return callback(new Error('项目名称不能为空'))
  }
  if (timeout !== null)
    clearTimeout(timeout)
  if (oldProjectName != value) {
    timeout = setTimeout(() => {
      checkProjectName({ projectName: value }).then(res => {
        if (res.data.data === false) {
          return callback(new Error(res.data.msg))
        }
        else {
          callback()
        }
      })
    }, 1000)
  }
  else {
    callback()
  }
}
const rules = {
  projectType: [
    { required: true, message: '请选择项目类型', trigger: 'blur' },
  ],
  projectName: [
    { validator: checkName, required: true, trigger: 'change' },
  ],
  projectTime: [
    { required: true, message: '请选择立项时间', trigger: 'blur' },
  ],
  relatedClient: [
    { required: true, message: '请输入相关客户', trigger: 'change' },
  ],
  projectTagList: [
    { required: true, message: '请输入项目标签', trigger: 'change' },
  ],
  projectStage: [
    { required: true, message: '请选择项目阶段', trigger: 'change' },
  ],
  projectBudget: [
    { validator: intValidate, message: '请输入正整数', trigger: 'change' },
  ],
  isRelevanceProduct: [
    { required: true, message: '请选择是否关联产品', trigger: 'change' },
  ],
  notRelevanceProductReason: [
    { required: true, message: '请输入未关联产品理由', trigger: 'blur' },
  ],
}
export default {
  name: 'add-dialog',
  components: { RelationDialog, ProductRelationDialog, projectRelationDialog },

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
      changeData: initFormData(),
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
      // clientList: [],
      typeOptions: dictMap.typeOptions, // 项目类型菜单
      isRelevOptions: dictMap.isRelevOptions, // 是否关联菜单
      workTypeOne: dictMap.workTypeOne, // 业务类型一级菜单
      relatedFormList,
      selectIndex: -1,
      selectDelay: {
        value: '',
        index: -1,
      },
      tableData: [],
      changeTableData: [],
      validate: [
        {
          name: '外包费用',
          prop: 'outsourcingCost',
        },
        {
          name: '佣金',
          prop: 'commission',
        },
        {
          name: '项目总预算',
          prop: 'projectBudget',
        },
      ],
      btnLoading: false,
      show3: true,
      shrink: '收缩',
    }
  },
  computed: {
    ...mapGetters(['dictGroup', 'userInfo']),
    id () {
      return this.$route.params.id ? +this.$route.params.id : null
    },
    methodName () {
      return this.id ? '修改' : '新增'
    },
    ...mapState({
      dialogShow: state => state.gpms.customerDialogShow,
    }),
  },
  created () {
    this.tableData = []
    let obj = Object.assign({}, initBudgetForm(), this.formData.projectBudgetList)
    this.tableData.push(obj)
    this.changeTableData = []
    this.changeTableData.push(obj)
    if (this.id) {
      getDataDetail(this.id).then(({ data }) => {
        this.formData = this.$mergeByFirst(initFormData(), data.data)
        oldProjectName = this.formData.projectName
        this.changeData = this.$mergeByFirst(initFormData(), data.data)
        this.tableData = [this.formData.projectBudgetList]
        if (this.formData.projectType == '1') {
          this.formData.projectTypeBefore = true
          this.changeData.projectTypeBefore = true
        }
        else {
          this.formData.projectTypeBefore = false
          this.changeData.projectTypeBefore = false
        }
        if (this.formData.attendeeId == 0) {
          this.formData.attendeeId = ''
          this.changeData.attendeeId = ''
        }
      })
      this.type = 'update'
    }
    // getCustomerPage({ type: 1 }).then(({ data }) => {
    //   this.clientList = data.data.records
    // })
    this.formData = initFormData(this.userInfo)
  },
  methods: {
    close () {
      this.$router.history.go(-1)
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
    isObjectValueEqual (a, b) {
      for (let key in a) {
        if (a[key] != b[key]) {
          return true
        }
      }
    },
    async save (val) {
      if (this.id) {
        await getDataDetail(this.id).then(({ data }) => {
          const changeData = this.$mergeByFirst(initFormData(), data.data)
          this.changeTableData = changeData.projectBudgetList
        })
      }
      this.formData.projectStatus = val
      if (val == '3') {
        if (this.changeData.projectName != this.formData.projectName || this.changeData.projectAmount != this.formData.projectAmount || this.changeData.projectTypeBefore != this.formData.projectTypeBefore || this.changeData.relatedClient != this.formData.relatedClient || this.changeData.attendeeId != this.formData.attendeeId || this.isObjectValueEqual(this.changeTableData, this.tableData[0])) {
          this.formData.projectStatus = '2'
        }//立项的项目特定字段改变时项目状态为'2'
      }
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
          let form = { id: this.id, ...this.formData }
          form.memberList = this.formData.membersList.map(m => m.id)
          form.marketManagerList = this.formData.mktManagerList.map(m => m.id)
          form.mentorList = this.formData.projectMentorList.map(m => m.id)
          form.projectHandles = this.formData.projectHandlesList.map(m => m.id)
          form.productIds = this.formData.productList.map(m => m.id)
          for (let item of this.relatedFormList) {
            form[item.ids] = this.formData[item.list].map(m => m.id)
          }
          form.projectIds = this.formData.projectList.map(m => m.id)
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
          // delete form.contractList
          // delete form.projectList
          delete form.reportList
          for (let item of this.validate) {
            if (this.tableData[0][item.prop] === '') {
              this.$message.error(`请填写${item.name}，若无，请填写0`)
              return
            }
          }
          form.projectBudgetList = this.tableData[0]
          form.projectBudget = this.tableData[0].projectBudget
          if (form.projectTypeBefore == true) {
            form.projectType = '1'
            form.relatedClient = 0
            form.relatedClientList = {}
          }
          else {
            form.projectType = '2'
            form.attendeeId = 0
          }
          if (form.groupExternalCooperatePartner == '') {
            form.groupExternalCooperatePartner = 0
          }
          this.btnLoading = true
          this.typeObj[this.type].requestFn(form).then(res => {
            if (res.data.data === true) {
              this.$message({
                type: 'success',
                message: `${this.methodName}成功!`,
              })
            } else {
              this.$message({
                type: 'info',
                message: `${this.methodName}失败,${res.data.msg}`,
              })
            }
            this.$router.push('/gpms/project')
          })
        } else {
          return false
        }
      })
    },
    handleAdd () {
      this.$refs['relationDialog'].dialogShow = true
      this.$refs['relationDialog'].loadData({
        summaryList: this.formData.summaryList,
        materialList: this.formData.materialList,
        // contractList: this.formData.contractList,
        // projectList: this.formData.projectList,
        reportList: this.formData.reportList,
      })
    },
    handleAddProduct () {
      this.$refs['productRelationDialog'].dialogShow = true
      this.$refs['productRelationDialog'].loadData({
        productList: this.formData.productList,
      })
    },
    handleAddExternalProject () {
      this.$refs['projectRelationDialog'].dialogShow = true
      this.$refs['projectRelationDialog'].loadData({
        projectList: this.formData.projectList,
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
    // 添加关联项目
    relativeprojectSubmit (list) {
      this.formData.projectList = list.projectList
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
    // budgetSubmit (val) {
    //   this.formData.projectBudgetList = val
    //   this.formData.projectBudget = val.projectBudget
    // },
    shrinkOpen () {
      this.show3 = !this.show3
      if (this.show3 == true) {
        this.shrink = '收缩'
      }
      else {
        this.shrink = '展开'
      }
    },
    ...mapMutations({
      setCustomerDialogShow: 'SET_CUSTOMER_DIALOG_SHOW',
    }),
    addClient () {
      this.setCustomerDialogShow(true)
    },
  },
  watch: {
    'formData.projectAmount': {
      deep: true,
      handler: function (val) {
        if (val > 999999.99) {
          this.formData.projectLevel = '1'
        }
        else if (499999.99 < val && val < 1000000) {
          this.formData.projectLevel = '2'
        }
        else {
          this.formData.projectLevel = '3'
        }
      },

    },
    'formData.isRelevanceProduct': {
      deep: true,
      handler: function (val) {
        if (val == 2) {
          this.formData.productList = []
        }
      },
    },
  },
}
</script>

<style scoped lang="scss">
.abs {
  padding-bottom: 30px;
}
.relevance-list,
.relevance-list-after {
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
.relevance-list-after {
  display: inline-block;
  margin: 0 10px;
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
.show3 {
  margin: -20px auto 0;
  display: block;
  border-top: 0;
  padding: 8px 20px;
}
</style>
<style scoped>
.table >>> .el-input__inner {
  padding: 0;
  border: 0;
}
.abs >>> .el-input__prefix {
  display: none;
}
.column-header {
  color: #f00;
}
.abs >>> .el-collapse-item__header {
  display: block;
  text-align: center;
  font-size: 16px;
  color: #999;
}
.abs >>> .el-input-number--small {
  width: 100%;
}
.abs >>> .el-input-number.is-controls-right .el-input__inner {
  text-align: left;
}
</style>
