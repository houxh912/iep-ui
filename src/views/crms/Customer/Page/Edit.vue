<template>
  <div>
    <basic-container>
      <page-header :title="`${methodName}客户`"></page-header>
      <div class="edit-wrapper">
        <el-form :model="formData" size="small" :rules="rules" ref="formName" label-width="100px" class="wrap">
          <el-row>
            <el-col :span=10>
              <el-form-item label="客户名称：" prop="clientName" class="">
                <el-input v-model="formData.clientName" placeholder="客户名称至少6个字"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span=10 :offset="4">
              <el-form-item label="市场经理：" prop="marketManager">
                <el-input v-model="formData.marketManager" :disabled="true"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span=10>
              <el-form-item label="区域类型：" prop="districtType">
                <iep-dict-select v-model="formData.districtType" dict-name="crms_district_type"></iep-dict-select>
              </el-form-item>
            </el-col>
            <el-col :span=10 :offset="4">
              <el-form-item label="负责部门：" prop="iepClientRespDept">
                <!-- <el-input v-model="formData.respDept" placeholder="负责部门"></el-input> -->
                <iep-dept-select v-model="formData.iepClientRespDept"></iep-dept-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-form-item label="客户描述：" prop="companyUrl">
            <el-input v-model="formData.companyUrl" placeholder="单位网址"></el-input>
          </el-form-item>
          <el-form-item label="" prop="companyFunction">
            <el-input type="textarea" v-model="formData.companyFunction" placeholder="单位职能"></el-input>
          </el-form-item>
          <el-form-item label="" prop="contractAddress">
            <el-input v-model="formData.contractAddress" placeholder="联系地址"></el-input>
          </el-form-item>
          <el-form-item label="" prop="otherDesc">
            <el-input type="textarea" v-model="formData.otherDesc" placeholder="其他说明"></el-input>
          </el-form-item>
          <el-form-item label="客户类型：" prop="clientTypeKey">
            <el-checkbox-group v-model="formData.clientTypeKey">
              <el-checkbox v-for="item in dictGroup['crms_client_type']" :key="item.value" :label="item.value" name="leixing">{{item.label}}</el-checkbox>
            </el-checkbox-group>
          </el-form-item>
          <el-form-item label="业务类型：" prop="businessTypeKey">
            <el-checkbox-group v-model="formData.businessTypeKey">
              <el-checkbox v-for="item in dictGroup['crms_business_type']" :key="item.value" :label="item.value">{{item.label}}</el-checkbox>
            </el-checkbox-group>
          </el-form-item>
          <el-form-item label="" prop="specificBusinessType">
            <el-input v-model="formData.specificBusinessType" placeholder="请填写具体业务类型"></el-input>
            <el-col class="col-tips"><i class="el-icon-warning"></i> 咨询：研究、规划、评测、整体解决方案等</el-col>
            <el-col class="col-tips"><i class="el-icon-warning"></i> 数据：数据资产采集、普查、编目、标签、画像、主题库基础库建设类、政务数据服务应用创新类等</el-col>
            <el-col class="col-tips"><i class="el-icon-warning"></i> 事项：事项材料梳理标准化、优化改造、营商环境、百项堵点、一网通办、全流程网办等各种主题事项梳理</el-col>
            <el-col class="col-tips"><i class="el-icon-warning"></i> 平台：外包、培训、专题等</el-col>
            <el-col class="col-tips"><i class="el-icon-warning"></i> 软件：DNA、DIPS等</el-col>
          </el-form-item>
          <el-form-item label="客户关系：" prop="clientRela">
            <iep-dict-select v-model="formData.clientRela" dict-name="crms_client_relation"></iep-dict-select>
            <el-col class="col-tips"><i class="el-icon-warning"></i> 核心客户：连续合作5年及以上、百万级项目、用软件/产品客户、数据服务客户、业务体系创新（标杆客户）</el-col>
            <el-col class="col-tips"><i class="el-icon-warning"></i> 重要客户：五十万以上项目、连续合作2年以上、每年有固定财政预算客户</el-col>
            <el-col class="col-tips"><i class="el-icon-warning"></i> 一般客户：有合作项目</el-col>
            <el-col class="col-tips"><i class="el-icon-warning"></i> 潜在客户：有意向的客户</el-col>
            <el-col class="col-tips"><i class="el-icon-warning"></i> 其它客户：目前无意向客户</el-col>
          </el-form-item>
          <el-form-item label="客户标签：" prop="tags">
            <iep-tag v-model="formData.tags"></iep-tag>
          </el-form-item>
          <el-form-item label="协助人：" prop="collaborationsKey" v-if="formData.collaborations.length != 0">
            <a-tag :key="tag.commonId" v-for="tag in formData.collaborations" closable :disable-transitions="false" @close="handleClose(tag)">
              {{tag.commonName}}
            </a-tag>
          </el-form-item>
          <el-form-item label="跟进状态：" prop="followUpStatus">
            <iep-dict-select v-model="formData.followUpStatus" dict-name="crms_follow_up_status"></iep-dict-select>
          </el-form-item>
          <!-- <el-form-item label="相关产品：" prop="products">
          <iep-button size="small" @click="selectProduct"><i class="el-icon-plus"></i></iep-button>
          <el-col class="col-item">内网2.0改造项目 <i class="el-icon-close"></i></el-col>
          <el-col class="col-item">内网2.0改造项目 <i class="el-icon-close"></i></el-col>
        </el-form-item>
        <el-form-item label="相关方案：" prop="scheme">
          <iep-button size="small" @click="selectProgramme"><i class="el-icon-plus"></i></iep-button>
          <el-col class="col-item">20180909建设银行智慧城市支持项目方案 <i class="el-icon-close"></i></el-col>
          <el-col class="col-item">20180909建设银行智慧城市支持项目方案 <i class="el-icon-close"></i></el-col>
          <el-col class="col-item">20180909建设银行智慧城市支持项目方案 <i class="el-icon-close"></i></el-col>
        </el-form-item> -->
        </el-form>
      </div>
      <footer-tool-bar>
        <iep-button @click="handleGoBack">返回</iep-button>
        <iep-button type="primary" @click="submitForm('formName')">提交</iep-button>
      </footer-tool-bar>
    </basic-container>
  </div>
</template>
<script>
import { mapState } from 'vuex'
import { initForm, rules } from '../options'
import { getCustomerById } from '@/api/crms/customer'
import { mapGetters } from 'vuex'
import { createById } from '@/api/crms/business'
export default {
  name: 'edit',
  props: {
    record: {
      type: Object,
      default: () => { },
    },
  },
  data () {
    return {
      id: false,
      rules,
      flag: '',
      data: '',
      methodName: '',
      formRequestFn: () => { },
      formData: initForm(),
    }
  },
  created () {
    this.formData.marketManager = this.userInfo.realName

    this.methodName = this.record.methodName
    this.formRequestFn = this.record.formRequestFn
    this.id = this.record.id
    if (this.record.flag) {
      this.flag = this.record.flag
      this.data = this.record.data
    }
    if (this.id) {
      getCustomerById(this.id).then(({ data }) => {
        this.formData = this.$mergeByFirst(initForm(), data.data)
        this.formData.businessTypeKey = data.data.businessTypeKey.map(m => m.commonId)
        this.formData.clientTypeKey = data.data.clientTypeKey.map(m => m.commonId)
        this.formData.districtType = data.data.districtTypeKey
        this.formData.followUpStatus = data.data.followUpStatusKey
        this.formData.clientRela = data.data.clientRelaKey
        this.formData.tags = data.data.tags.map(m => (m.commonName))
        this.formData.collaborations = data.data.collaborations
      })
    } else if (this.flag) {
      this.formData.businessTypeKey = this.data.businessType.map(m => m.commonId)
      this.formData.clientName = this.data.clientName
      this.formData.tags = this.data.tags.map(m => (m.commonName))
    }
  },
  computed: {
    ...mapState({
      dictGroup: state => state.user.dictGroup,
    }),
    ...mapGetters([
      'userInfo',
    ]),
  },
  methods: {
    handleTag () {
      this.$message('添加标签')
    },
    handleGoBack () {
      this.$emit('onGoBack')
    },
    load () {
      getCustomerById(this.record.id).then(({ data }) => {
        this.formData = this.$mergeByFirst(initForm(), data.data)
      })
    },
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.formRequestFn((this.formData)).then(({ data }) => {
            if (data.data) {
              this.$message({
                message: `客户${this.methodName}成功`,
                type: 'success',
              })

              if (this.flag) {
                this.$confirm('创建客户成功！', '提示', {
                  confirmButtonText: '返回商机',
                  cancelButtonText: '留在客户',
                  type: 'success',
                }).then(() => {
                  this.$router.push({
                    path: '/crms/business',
                    query: {
                      falg: true,
                      type: '3',
                    },
                  })
                }).catch(() => {
                  this.$emit('onGoBack')
                })
              }

            }
          })
          createById({ iepOpportunityInputId: this.record.data.opportunityId }).then(() => {
          })
        } else {
          return false
        }
      })
    },
    handleClose (tag) {
      this.formData.collaborations.splice(this.formData.collaborations.indexOf(tag), 1)
    },
  },
}
</script>

<style scoped>
.edit-wrapper {
  padding-bottom: 50px;
}
</style>
