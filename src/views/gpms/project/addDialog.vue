<template>
  <div class="abs">
    <page-header :title="`${methodName}项目`" :backOption="backOption"></page-header>

    <el-form :model="formData" :rules="rules" ref="form" label-width="200px" class="form">
      
      <el-form-item label="项目名称：" prop="projectName">
        <el-input v-model="formData.projectName" placeholder="请输入项目名称"></el-input>
      </el-form-item>
      <el-form-item label="项目类型：" prop="projectType">
        <el-select v-model="formData.projectType" placeholder="请选择项目类型">
          <el-option v-for="item in typeOptions" :key="item.value" :label="item.label" :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="业务类型：" prop="businessType">
        <el-select @change="businessTypeChange" v-model="formData.businessType" placeholder="请选择业务类型">
          <el-option v-for="item in workTypeOne" :key="item.value" :label="item.label" :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item prop="businessTypeSec" v-if="formData.businessType === '7'">
        <el-input v-model="formData.businessTypeSec" placeholder="请填写具体业务类型"></el-input>
      </el-form-item>
      <el-form-item label="相关客户：" prop="relatedClientList">
        <iep-contact-select v-model="formData.relatedClientList"></iep-contact-select>
      </el-form-item> 
      <el-form-item label="项目预算：" prop="projectBudget">
        <el-input v-model="formData.projectBudget"></el-input>
      </el-form-item>
      <el-form-item label="市场经理：" prop="mktManagerList">
        <iep-contact-select v-model="formData.mktManagerList"></iep-contact-select>
      </el-form-item>
      <el-form-item label="项目指导人：" prop="projectMentorList">
        <iep-contact-select v-model="formData.projectMentorList"></iep-contact-select>
      </el-form-item>
      <el-form-item label="项目标签：" prop="projectTagList">
        <iep-tags v-model="formData.projectTagList"></iep-tags>
      </el-form-item>
      <el-form-item label="是否关联产品：" prop="isRelevanceProduct">
        <el-radio-group v-model="formData.isRelevanceProduct">
          <el-radio label="0">否</el-radio>
          <el-radio label="1">是</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="未关联产品理由：" prop="notRelevanceProductReason" v-if="formData.isRelevanceProduct === '0'">
        <el-input type="textarea" rows=5 v-model="formData.notRelevanceProductReason"></el-input>
      </el-form-item>
      <el-form-item label="承接部门：" prop="inChargeDeptObj">
        <iep-dept-select v-model="formData.inChargeDeptObj"></iep-dept-select>
      </el-form-item>
      <el-form-item label="合作部门：" prop="coopDeptObj">
        <iep-dept-select v-model="formData.coopDeptObj"></iep-dept-select>
      </el-form-item>
      <el-form-item label="集团外部合作伙伴：" prop="groupExternalCooperatePartnerList">
        <iep-contact-select v-model="formData.groupExternalCooperatePartnerList"></iep-contact-select>
      </el-form-item>
    </el-form>

    <footer-toolbar>
      <iep-button type="primary" @click="save">保存</iep-button>
      <iep-button @click="close">取消</iep-button>
    </footer-toolbar>
  </div>
</template>

<script>
import IepTags from '@/components/IepTags/input'
import { workTypeOne, workTypeTwo, dictMap, rules, initFormData } from './Total/const.js'
import FooterToolbar from '@/components/FooterToolbar/'
  import { createData, updateData } from '@/api/gpms/index'

export default {
  name: 'add-dialog',
  components: { IepTags, FooterToolbar },
  data () {
    return {
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

      typeOptions: dictMap.typeOptions, //项目类型菜单
      isRelevOptions: dictMap.isRelevOptions,//是否关联菜单
      workTypeOne,   //业务类型一级菜单
      workTypeTwo,   //业务类型二级菜单
      workTypeTwoOK: [], //在页面展示的业务类型二级菜单
      isElse: false,//业务类型中是不是 其他 选项
    }
  },
  methods: {
    open (type, data) {
      this.type = type
      this.formData = !data ? initFormData() : data
    },
    close (state) {
      this.formData = initFormData()
      this.$emit('close', state)
    },
    save () {
      this.$refs['form'].validate((valid) => {
        if (valid) {
          // 进行数据的转换先
          let personList =  [{
            name: 'relatedClient',
            list: 'relatedClientList',
          }, {
            name: 'mktManager',
            list: 'mktManagerList',
          }, {
            name: 'projectMentor',
            list: 'projectMentorList',
          }, {
            name: 'groupExternalCooperatePartner',
            list: 'groupExternalCooperatePartnerList',
          }]
          for (let item of personList) {
            this.formData[item.name] = this.formData[item.list].id
          }
          this.formData.inChargeDept = this.formData.inChargeDeptObj.id
          this.formData.coopDept = this.formData.coopDeptObj.id
          this.typeObj[this.type].requestFn(this.formData).then(() => {
            this.$notify({
              title: '成功',
              message: `${this.methodName}成功`,
              type: 'success',
              duration: 2000,
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
  },
}
</script>

<style scoped lang="scss">
.abs {
  padding-bottom: 30px;
  .form {
    width: 80%;
  }
}
</style>