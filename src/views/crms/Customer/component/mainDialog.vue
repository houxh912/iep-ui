<template>
  <div class="edit-wrapper">
    <el-card class="edit-card" shadow="hover">
      <div slot="header" class="title">
        <span v-if="isAdd=='add'">新增客户</span>
        <span v-if="isAdd=='edit'">修改客户</span>
      </div>
      <el-form :model="formData" :rules="rules" ref="formData" size="small" label-width="100px" class="wrap">
        <el-row>
          <el-col :span=10>
            <el-form-item label="客户名称：" prop="clientName" class="">
              <el-input v-model="formData.clientName" placeholder="客户名称至少6个字"></el-input>
            </el-form-item>
          </el-col>
          <!-- <el-col :span=12>
            <el-form-item label="性别：" prop="sex">
              <el-radio-group v-model="formData.sex">
                <el-radio v-for="item in dicData.select" :key="item.value" :label="item.value">{{item.label}}</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col> -->
          <el-col :span=10 :offset="4">
            <el-form-item label="手机号码：" prop="phoneNumber">
              <el-input v-model="formData.phoneNumber" placeholder="手机号码11位"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span=10>
            <el-form-item label="区域类型：" prop="districtType">
              <el-select v-model="formData.districtType" placeholder="请选择">
                <el-option v-for="item in dictGroup['crms_district_type']" :key="item.value" :label="item.label" :value="item.value"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span=10 :offset="4">
            <el-form-item label="市场经理：" prop="marketManager">
              <el-input v-model="formData.marketManager"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item label="负责部门：" prop="respDept">
          <!-- <el-select v-model="formData.respDept" placeholder="请选择">
            <el-option v-for="item in dicData.dept" :key="item.value" :label="item.label" :value="item.value"></el-option>
          </el-select> -->
          <el-input v-model="formData.respDept" placeholder="负责部门"></el-input>
        </el-form-item>
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
          <el-select v-model="formData.clientRela" placeholder="请选择">
            <el-option v-for="item in dictGroup['crms_client_relation']" :key="item.value" :label="item.label" :value="item.value"></el-option>
          </el-select>
          <el-col class="col-tips"><i class="el-icon-warning"></i> 核心客户：连续合作5年及以上、百万级项目、用软件/产品客户、数据服务客户、业务体系创新（标杆客户）</el-col>
          <el-col class="col-tips"><i class="el-icon-warning"></i> 重要客户：五十万以上项目、连续合作2年以上、每年有固定财政预算客户</el-col>
          <el-col class="col-tips"><i class="el-icon-warning"></i> 一般客户：有合作项目</el-col>
          <el-col class="col-tips"><i class="el-icon-warning"></i> 潜在客户：有意向的客户</el-col>
          <el-col class="col-tips"><i class="el-icon-warning"></i> 其它客户：目前无意向客户</el-col>
        </el-form-item>
        <!-- <el-form-item label="客户标签：" prop="tags">
          <el-input v-model="formData.tags" placeholder="添加标签，标签请用 , 或 ; 分开,标签填数字"></el-input>
        </el-form-item> -->
        <el-form-item label="跟进状态：" prop="followUpStatus">
          <el-select v-model="formData.followUpStatus" placeholder="请选择">
            <el-option v-for="item in dictGroup['crms_follow_up_status']" :key="item.value" :label="item.label" :value="item.value"></el-option>
          </el-select>
        </el-form-item>
        <!-- <el-form-item label="相关产品：" prop="programs">
          <iep-button size="small" @click="selectProduct"><i class="el-icon-plus"></i></iep-button>
          <el-col class="col-item">内网2.0改造项目 <i class="el-icon-close"></i></el-col>
          <el-col class="col-item">内网2.0改造项目 <i class="el-icon-close"></i></el-col>
        </el-form-item>
        <el-form-item label="相关方案：" prop="fangan">
          <iep-button size="small" @click="selectProgramme"><i class="el-icon-plus"></i></iep-button>
          <el-col class="col-item">20180909建设银行智慧城市支持项目方案 <i class="el-icon-close"></i></el-col>
          <el-col class="col-item">20180909建设银行智慧城市支持项目方案 <i class="el-icon-close"></i></el-col>
          <el-col class="col-item">20180909建设银行智慧城市支持项目方案 <i class="el-icon-close"></i></el-col>
        </el-form-item> -->
      </el-form>
    </el-card>
    <product-dialog ref="productDialog" @select-list="productSelect"></product-dialog>
    <programme-dialog ref="programmeDialog" @select-list="programmeSelect"></programme-dialog>
    <footer-tool-bar>
      <iep-button type="info" @click="handleGoBack">返回</iep-button>
      <iep-button type="primary" @click="submitForm('formData')">提交</iep-button>
    </footer-tool-bar>
  </div>
</template>
<script>
import { initFormData, rules } from '../options'
import ProductDialog from './productDialog'
import ProgrammeDialog from './programmeDialog'
import FooterToolBar from '@/components/FooterToolbar'
import { createData, updateData, fertchInfo } from '@/api/crms/custom'
import { mapState } from 'vuex'
export default {
  components: { ProductDialog, ProgrammeDialog, FooterToolBar },
  data () {
    return {
      dialogShow: false,
      // formRequestFn: () => { createData },
      methodName: '创建',
      formData: initFormData(),
      rules: rules,
    }
  },
  props: {
    isAdd: {
      type: String,
      default: () => '',
    },
    record: {
      type: Object,
      default: () => { },
    },
  },
  created () {
    this.load()
    console.log(this.dictGroup)
  },
  computed: {
    ...mapState({
      dictGroup: state => state.user.dictGroup,
    }),
  },
  methods: {
    handleGoBack () {
      this.$emit('onGoBack')
    },
    loadPage () {
      this.$emit('load-page')
    },
    load () {
      if (this.isAdd == 'edit') {
        fertchInfo(this.record.id).then(res => {
          let form = res.data.data
          this.formData = {
            clientName: form.clientName,
            clientId: form.clientId,
            phoneNumber: form.phoneNumber,
            districtType: form.districtTypeKey,
            marketManager: form.marketManager,
            respDept: form.respDept,
            companyUrl: form.companyUrl,
            companyFunction: form.companyFunction,
            contractAddress: form.contractAddress,
            otherDesc: form.otherDesc,
            clientTypeKey: form.clientTypeKey.map(m => parseInt(m.commonId)),
            businessTypeKey: form.businessTypeKey.map(m => parseInt(m.commonId)),
            // tags: this.record.tags,
            programs: [1, 2],
            followUpStatus: form.followUpStatusKey,
            specificBusinessType: form.specificBusinessType,
            clientRela: form.clientRelaKey,
            tags: [1],
          }
        })
      }
    },
    resetForm (formData) {
      this.$refs[formData].resetFields()
      this.formData = initFormData()
      this.dialogShow = false
    },
    submitForm (formData) {
      this.$refs[formData].validate((valid) => {
        if (valid) {
          if (this.isAdd == 'add') {
            createData(this.formData).then(() => {
              this.$notify({
                title: '成功',
                message: `${this.methodName}成功`,
                type: 'success',
                duration: 2000,
              })
              this.$emit('onGoBack')
              this.loadPage()
              this.dialogShow = false
            })
          } else {
            updateData(this.formData).then(() => {
              this.$notify({
                title: '成功',
                message: '修改成功',
                type: 'success',
                duration: 2000,
              })
              this.$emit('onGoBack')
              this.loadPage()
              this.dialogShow = false
            })
          }
        } else {
          return false
        }
      })
    },
    // 选择相关产品
    selectProduct () {
      this.$refs['productDialog'].loadPage()
    },
    productSelect (val) {
      console.log('选中的产品：', val)
    },
    // 选择相关方案
    selectProgramme () {
      this.$refs['programmeDialog'].loadPage()
    },
    programmeSelect (val) {
      console.log('选中的方案：', val)
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
      font-weight: 600;
    }
  }
}
.wrap {
  padding: 20px 100px 20px 50px;
}
</style>
