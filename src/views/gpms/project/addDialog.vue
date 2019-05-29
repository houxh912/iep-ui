<template>
  <div class="abs iep-page-form">
    <page-header :title="`${methodName}项目`" :backOption="backOption"></page-header>
    <el-form :model="formData" :rules="rules" ref="form" label-width="200px" class="form">
      <el-row type="flex" class="row-bg">
        <el-col :span="12">
          <el-form-item label="项目名称：" prop="projectName">
            <span slot="label">
              项目名称:
              <!-- <iep-tip :content="tipContent.projectName"></iep-tip>： -->
            </span>
            <el-input v-model="formData.projectName" placeholder="请输入项目名称"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="客户名称：" prop="relatedClient">
            <span slot="label">
              客户名称:
              <!-- <iep-tip :content="tipContent.relatedClient"></iep-tip>： -->
            </span>
            <iep-select prefix-url="crm/customer" v-model="formData.relatedClient"></iep-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row type="flex" class="row-bg">
        <el-col :span="12">
          <el-form-item label="项目标签：" prop="projectTagList">
            <span slot="label">
              项目标签:
              <!-- <iep-tip :content="tipContent.projectTagList"></iep-tip>: -->
            </span>
            <iep-tag v-model="formData.projectTagList"></iep-tag>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="项目经理：" prop="projectManagerList">
            <span slot="label">
              项目经理:
              <!-- <iep-tip :content="tipContent.projectTagList"></iep-tip>： -->
            </span>
            <iep-contact-select v-model="formData.projectManagerList"  :is-show-contact-btn="false"></iep-contact-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row type="flex" class="row-bg">
        <el-col :span="12">
          <el-form-item label="市场经理：" prop="mktManagerList">
            <span slot="label">
              市场经理:
              <!-- <iep-tip :content="tipContent.mktManagerList"></iep-tip>： -->
            </span>
            <iep-contact-select v-model="formData.mktManagerList"  :is-show-contact-btn="false"></iep-contact-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="项目指导与审核人：" prop="projectMentorList">
            <span slot="label">
              项目指导与审核人:
              <!-- <iep-tip :content="tipContent.projectMentorList"></iep-tip>： -->
            </span>
            <iep-contact-select v-model="formData.projectMentorList"  :is-show-contact-btn="false"></iep-contact-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row type="flex" class="row-bg">
        <el-col :span="12">
          <el-form-item label="项目成员：" prop="projectMembersList">
          <span slot="label">
              项目成员:
              <!-- <iep-tip :content="tipContent.projectMembersList"></iep-tip>： -->
          </span>
            <iep-contact-multiple-user v-model="formData.projectMembersList" :is-show-contact-btn="false"></iep-contact-multiple-user>
            </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="项目预算：" prop="projectBudget">
            <span slot="label">
              项目预算
              <!-- <iep-tip :content="tipContent.projectBudget"></iep-tip>： -->
            </span>
            <el-input v-model="formData.projectBudget"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row type="flex" class="row-bg">
        <el-col :span="12">
          <el-form-item label="项目等级：" prop="projectLevel">
            <span slot="label">
              项目等级
              <!-- <iep-tip :content="tipContent.relatedClient"></iep-tip>： -->
            </span>
            <iep-dict-select v-model="formData.projectLevel" dict-name="prms_project_level"></iep-dict-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="立项时间:" prop="projectTime">
            <span slot="label">
              立项时间:
            </span>
            <!-- <el-date-picker
              v-model="formData.projectTime"
              type="date"
              value-format="yyyy-MM-dd"
              placeholder="立项时间">
            </el-date-picker> -->
            <iep-date-picker 
              v-model="formData.projectTime"
              type="date"
              placeholder="立项时间"></iep-date-picker>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row type="flex" class="row-bg">
        <el-col :span="12">
          <el-form-item label="结束时间：" prop="endTime">
            <span slot="label">
              结束时间:
            </span>
            <iep-date-picker 
              v-model="formData.endTime"
              type="date"
              placeholder="结束时间"></iep-date-picker>
            <!-- <el-date-picker
              v-model="formData.endTime"
              type="date"
              value-format="yyyy-MM-dd"
              placeholder="结束时间">
            </el-date-picker> -->
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="集团外部合作伙伴：" prop="groupExternalCooperatePartner">
            <span slot="label">
              集团外部合作伙伴:
              <!-- <iep-tip :content="tipContent.groupExternalCooperatePartner"></iep-tip>： -->
            </span>
            <iep-select prefix-url="crm/customer" v-model="formData.groupExternalCooperatePartner"></iep-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item label="是否关联产品：" prop="isRelevanceProduct">
        <span slot="label">
          是否关联产品:
          <!-- <iep-tip :content="tipContent.isRelevanceProduct"></iep-tip>： -->
        </span>
        <el-radio-group v-model="formData.isRelevanceProduct">
          <el-radio
            v-for="item in dictMap.is_yes"
            :key="item.value"
            :label="item.value"
          >{{item.label}}</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item
        label="添加关联产品：" 
        v-if="formData.isRelevanceProduct === 1">
        <el-button @click="handleAddProduct">添加关联</el-button>
        <ul class="relevance-list" v-if="formData.productIds.length > 0">
          <li class="item" v-for="t in formData.productIds" :key="t.id">{{t.name}}</li>
        </ul>
      </el-form-item>
      <el-form-item
        label="未关联产品理由："
        prop="notRelevanceProductReason"
        v-if="formData.isRelevanceProduct === 2">
        <el-input type="textarea" rows="5" v-model="formData.notRelevanceProductReason"></el-input>
      </el-form-item>
      <el-form-item
        label="添加其他关联：" >
        <el-button @click="handleAdd">添加关联</el-button>
      </el-form-item>
      <div v-for="(item, index) in relatedFormList" :key="index">
        <el-form-item :label="`${item.name}：`" v-if="formData[item.list].length > 0">
          <ul class="relevance-list">
            <li class="item" v-for="t in formData[item.list]" :key="t.id">{{t.name}}</li>
          </ul>
        </el-form-item>
      </div>
    </el-form>

    <footer-tool-bar>
      <iep-button type="primary" @click="save">保存</iep-button>
      <iep-button @click="close">取消</iep-button>
    </footer-tool-bar>
    <relation-dialog ref="relationDialog" @relativeSubmit="relativeSubmit"></relation-dialog>
    <product-relation-dialog ref="productRelationDialog" @relativeSubmit="relativeProductSubmit"></product-relation-dialog>
  </div>
</template>

<script>
import { dictMap, rules, initFormData, relatedFormList } from './Total/const.js'
import { createData, updateData } from '@/api/gpms/index'
import { getCustomerPage } from '@/api/crms/customer'
import { mapState } from 'vuex'
import { tipContent } from './option'
import RelationDialog from './Total/relation'
import ProductRelationDialog from './Total/productRelation'

export default {
  name: 'add-dialog',
  components: { RelationDialog, ProductRelationDialog},
  computed: {
    ...mapState({
      dictGroup: state => state.user.dictGroup,
    }),
  },
  data () {
    return {
      projectTime: '',
      endTime: '',
      tipContent,
      methodName: '新增',
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
    }
  },
  methods: {
    open (type, data) {
      this.type = type
      if (!data) {
        this.formData = initFormData()
      } else {
        data.relatedClient = parseInt(data.relatedClient)
        data.groupExternalCooperatePartner = parseInt(
          data.groupExternalCooperatePartner
        )
        this.formData = data
        this.methodName = '修改'
      }
    },
    close (state) {
      this.formData = initFormData()
      this.$emit('close', state)
    },
    save () {
      this.$refs['form'].validate((valid) => {
        if (valid) {
          // 进行数据的转换先
          let personList = [{
              name: 'mktManager',
              list: 'mktManagerList',
          }, {
              name: 'projectMentor',
              list: 'projectMentorList',
          }, {
            name: 'projectManager',
            list: 'projectManagerList',
          }]
          for (let item of personList) {
            this.formData[item.name] = this.formData[item.list].id
          }
          this.formData.inChargeDept = this.formData.inChargeDeptList.id
          this.formData.coopDept = this.formData.coopDeptList.id
          this.typeObj[this.type].requestFn(this.formData).then(() => {
            this.$message({
              message: `${this.methodName}成功`,
              type: 'success',
            })
              this.close(true)
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
        summaryIds: this.formData.summaryIds,
        materialIds: this.formData.materialIds,
        contractIds: this.formData.contractIds,
        projectIds: this.formData.projectIds,
        reportIds: this.formData.reportIds,
      })
    },
    handleAddProduct () {
      this.$refs['productRelationDialog'].dialogShow = true
      this.$refs['productRelationDialog'].loadData({
        productIds: this.formData.productIds,
      })
    },
    // 添加其他关联
    relativeSubmit (list) {
      this.formData = Object.assign({}, this.formData, list)
    },
    // 添加关联产品
    relativeProductSubmit (list) {
      this.formData.productIds = list.productIds
    },
  },
  created () {
    getCustomerPage({ type: 1 }).then(({ data }) => {
      this.clientList = data.data.records
    })
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
  }
}
</style>