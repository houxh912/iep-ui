<template>
  <div class="edit-wrapper">
    <el-card class="edit-card" shadow="hover">
      <div slot="header" class="title">
        <span>{{methodName}}客户</span>
      </div>
      <el-form :model="formData" size="small" :rules="rules" ref="formName" label-width="100px" class="wrap">
        <el-row>
          <el-col :span=10>
            <el-form-item label="客户名称：" prop="name" class="">
              <el-input v-model="formData.name" placeholder="客户名称至少6个字"></el-input>
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
            <el-form-item label="手机号码：" prop="phoneNum">
              <el-input v-model="formData.phoneNum" placeholder="手机号码11位"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span=10>
            <el-form-item label="区域类型：" prop="districtType">
              <el-select v-model="formData.districtType" placeholder="请选择">
                <el-option v-for="item in dicData.Regional" :key="item.value" :label="item.label" :value="item.value"></el-option>
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
        <el-form-item label="客户描述：" prop="url">
          <el-input v-model="formData.url" placeholder="单位网址"></el-input>
        </el-form-item>
        <el-form-item label="" prop="function">
          <el-input type="textarea" v-model="formData.function" placeholder="单位职能"></el-input>
        </el-form-item>
        <el-form-item label="" prop="address">
          <el-input v-model="formData.address" placeholder="联系地址"></el-input>
        </el-form-item>
        <el-form-item label="" prop="otherDesc">
          <el-input type="textarea" v-model="formData.otherDesc" placeholder="其他说明"></el-input>
        </el-form-item>
        <el-form-item label="客户类型：" prop="type">
          <el-checkbox-group v-model="formData.type">
            <el-checkbox v-for="item in dicData.customer" :key="item.value" :label="item.value">{{item.label}}</el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item label="业务类型：" prop="businessType">
          <el-checkbox-group v-model="formData.businessType">
            <el-checkbox v-for="item in dicData.Business" :key="item.value" :label="item.value" name="yewuleixing">{{item.label}}</el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item label="" prop="specificType">
          <el-input v-model="formData.specificType" placeholder="请填写具体业务类型"></el-input>
          <el-col class="col-tips"><i class="el-icon-warning"></i> 咨询：研究、规划、评测、整体解决方案等</el-col>
          <el-col class="col-tips"><i class="el-icon-warning"></i> 数据：数据资产采集、普查、编目、标签、画像、主题库基础库建设类、政务数据服务应用创新类等</el-col>
          <el-col class="col-tips"><i class="el-icon-warning"></i> 事项：事项材料梳理标准化、优化改造、营商环境、百项堵点、一网通办、全流程网办等各种主题事项梳理</el-col>
          <el-col class="col-tips"><i class="el-icon-warning"></i> 平台：外包、培训、专题等</el-col>
          <el-col class="col-tips"><i class="el-icon-warning"></i> 软件：DNA、DIPS等</el-col>
        </el-form-item>
        <el-form-item label="客户关系：" prop="relation">
          <el-select v-model="formData.relation" placeholder="请选择">
            <el-option v-for="item in dicData.relationship" :key="item.value" :label="item.label" :value="item.value"></el-option>
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
        <el-form-item label="跟进状态：" prop="status">
          <el-select v-model="formData.status" placeholder="请选择">
            <el-option v-for="item in dicData.followUpStatus" :key="item.value" :label="item.label" :value="item.value"></el-option>
          </el-select>
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
    </el-card>
    <!-- <product-dialog ref="productDialog" @select-list="productSelect"></product-dialog>
    <program-dialog ref="programmeDialog" @select-list="programmeSelect"></program-dialog> -->
    <footer-tool-bar>
      <iep-button type="info" @click="handleGoBack">返回</iep-button>
      <iep-button type="primary" @click="submitForm('formName')">提交</iep-button>
    </footer-tool-bar>
  </div>
</template>
<script>
import { initForm, rules } from '../options'
import { mergeByFirst } from '@/util/util'
// import ProductDialog from './Components/ProductDialog'
// import ProgramDialog from './Components/ProgramDialog'
import { getCustomerById } from '@/api/crms/customer'

export default {
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
      methodName: '',
      formRequestFn: () => { },
      dialogShow: false,
      formData: initForm(),
      dicData: {
        // 客户类型
        customer: [
          { value: 0, label: '战略合作伙伴' },
          { value: 1, label: '客户' },
        ],
        // 业务类型
        Business: [
          { value: 0, label: '咨询' },
          { value: 1, label: '数据' },
          { value: 2, label: '事项' },
          { value: 3, label: '平台' },
          { value: 4, label: '软件' },
        ],
        // 跟进状态：
        followUpStatus: [
          { value: 0, label: '已合作' },
          { value: 1, label: '待合作' },
          { value: 2, label: '未合作' },
        ],
        // 客户关系
        relationship: [
          { value: 0, label: '核心客户' },
          { value: 1, label: '重要客户' },
          { value: 2, label: '一般客户' },
          { value: 3, label: '潜在客户' },
          { value: 4, label: '其他客户' },
        ],
        // 区域类型
        Regional: [
          { value: 0, label: '省级' },
          { value: 1, label: '市级' },
          { value: 2, label: '区级' },
        ],
        dept: [
          { value: 1, label: '部门1' },
          { value: 2, label: '部门2' },
        ],
      },
    }
  },
  created () {
    this.methodName = this.record.methodName
    this.formRequestFn = this.record.formRequestFn
    this.id = this.record.id
    if (this.id) {
      getCustomerById(this.id).then(({ data }) => {
        this.formData = mergeByFirst(initForm(), data.data)
      })
    }
  },
  methods: {
    handleGoBack () {
      this.$emit('onGoBack')
    },
    load () {
      getCustomerById(this.record.id).then(({ data }) => {
        this.formData = mergeByFirst(initForm(), data.data)
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
              this.$emit('onGoBack')
            }
          })
        } else {
          return false
        }
      })
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
  .edit-card {
    .title {
      font-weight: 600;
    }
  }
}
</style>
