<template>
  <iep-dialog :dialog-show="dialogShow" :title="`${methodName}客户`" width="60%" @close="resetForm('form')">
    <el-form :model="formData" :rules="rules" ref="form" label-width="100px">

      <el-row>
        <el-col :span=12>
          <el-form-item label="客户名称：" prop="name">
            <el-input v-model="formData.name"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span=12>
          <el-form-item label="性别：" prop="sex">
            <el-radio-group v-model="formData.sex">
              <el-radio v-for="item in dicData.select" :key="item.value" :label="item.value">{{item.label}}</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span=12>
          <el-form-item label="区域类型：" prop="type">
            <el-select v-model="formData.type" placeholder="请选择">
              <el-option v-for="item in dicData.select" :key="item.value" :label="item.label" :value="item.value"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span=12>
          <el-form-item label="市场经理：">
            章佩瑜
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item label="负责部门：" prop="deptId">
        <el-select v-model="formData.deptId" placeholder="请选择">
          <el-option v-for="item in dicData.dept" :key="item.value" :label="item.label" :value="item.value"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="客户描述：" prop="miaoshu">
        <el-input v-model="formData.miaoshu" placeholder="单位网址"></el-input>
      </el-form-item>
      <el-form-item label="" prop="zhineng">
        <el-input type="textarea" v-model="formData.zhineng" placeholder="单位职能"></el-input>
      </el-form-item>
      <el-form-item label="" prop="dizhi">
        <el-input v-model="formData.dizhi" placeholder="联系地址"></el-input>
      </el-form-item>
      <el-form-item label="" prop="shuoming">
        <el-input type="textarea" v-model="formData.shuoming" placeholder="其他说明"></el-input>
      </el-form-item>
      <el-form-item label="客户类型：" prop="leixing">
        <el-checkbox-group v-model="formData.leixing">
          <el-checkbox v-for="item in dicData.select" :key="item.value" :label="item.value" name="leixing">{{item.label}}</el-checkbox>
        </el-checkbox-group>
      </el-form-item>
      <el-form-item label="业务类型：" prop="yewuleixing">
        <el-checkbox-group v-model="formData.yewuleixing">
          <el-checkbox v-for="item in dicData.select" :key="item.value" :label="item.value" name="yewuleixing">{{item.label}}</el-checkbox>
        </el-checkbox-group>
      </el-form-item>
      <el-form-item label="" prop="jutiyewu">
        <el-input v-model="formData.jutiyewu" placeholder="请填写具体业务类型"></el-input>
        <el-col class="col-tips"><i class="el-icon-warning"></i> 咨询：研究、规划、评测、整体解决方案等</el-col>
        <el-col class="col-tips"><i class="el-icon-warning"></i> 数据：数据资产采集、普查、编目、标签、画像、主题库基础库建设类、政务数据服务应用创新类等</el-col>
        <el-col class="col-tips"><i class="el-icon-warning"></i> 事项：事项材料梳理标准化、优化改造、营商环境、百项堵点、一网通办、全流程网办等各种主题事项梳理</el-col>
        <el-col class="col-tips"><i class="el-icon-warning"></i> 平台：外包、培训、专题等</el-col>
        <el-col class="col-tips"><i class="el-icon-warning"></i> 软件：DNA、DIPS等</el-col>
      </el-form-item>
      <el-form-item label="客户关系：" prop="guanxi">
        <el-select v-model="formData.guanxi" placeholder="请选择">
          <el-option v-for="item in dicData.select" :key="item.value" :label="item.label" :value="item.value"></el-option>
        </el-select>
        <el-col class="col-tips"><i class="el-icon-warning"></i> 核心客户：连续合作5年及以上、百万级项目、用软件/产品客户、数据服务客户、业务体系创新（标杆客户）</el-col>
        <el-col class="col-tips"><i class="el-icon-warning"></i> 重要客户：五十万以上项目、连续合作2年以上、每年有固定财政预算客户</el-col>
        <el-col class="col-tips"><i class="el-icon-warning"></i> 一般客户：有合作项目</el-col>
        <el-col class="col-tips"><i class="el-icon-warning"></i> 潜在客户：有意向的客户</el-col>
        <el-col class="col-tips"><i class="el-icon-warning"></i> 其它客户：目前无意向客户</el-col>
      </el-form-item>
      <el-form-item label="客户标签：" prop="kehubiaoqian">
        <el-input v-model="formData.kehubiaoqian" placeholder="添加标签，标签请用 , 或 ; 分开"></el-input>
      </el-form-item>
      <el-form-item label="跟进状态：" prop="zhuangtai">
        <el-select v-model="formData.zhuangtai" placeholder="请选择">
          <el-option v-for="item in dicData.select" :key="item.value" :label="item.label" :value="item.value"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="相关产品：" prop="chanpin">
        <el-button size="small" @click="selectProduct"><i class="el-icon-plus"></i></el-button>
        <el-col class="col-item">内网2.0改造项目 <i class="el-icon-close"></i></el-col>
        <el-col class="col-item">内网2.0改造项目 <i class="el-icon-close"></i></el-col>
      </el-form-item>
      <el-form-item label="相关方案：" prop="fangan">
        <el-button size="small"><i class="el-icon-plus"></i></el-button>
        <el-col class="col-item">20180909建设银行智慧城市支持项目方案 <i class="el-icon-close"></i></el-col>
        <el-col class="col-item">20180909建设银行智慧城市支持项目方案 <i class="el-icon-close"></i></el-col>
        <el-col class="col-item">20180909建设银行智慧城市支持项目方案 <i class="el-icon-close"></i></el-col>
      </el-form-item>

    </el-form>
    <template slot="footer">
      <el-button type="primary" @click="submitForm('form')">{{methodName}}</el-button>
      <el-button @click="resetForm('form')">取消</el-button>
    </template>
    <product-dialog ref="productDialog" @select-list="productSelect"></product-dialog>
  </iep-dialog>
</template>
<script>
import IepDialog from '@/components/IepDialog/'
import { initFormData, rules } from './const/index'
import ProductDialog from './component/productDialog'
export default {
  components: { IepDialog, ProductDialog },
  data () {
    return {
      dialogShow: false,
      formRequestFn: () => { },
      methodName: '创建',
      formData: initFormData(),
      rules: rules,
      dicData: {
        select: [
          {value: 1, label: '选项1'},
          {value: 2, label: '选项2'},
        ],
        dept: [
          {value: 1, label: '部门1'},
          {value: 2, label: '部门2'},
        ],
      },
    }
  },
  methods: {
    loadPage () {
      this.$emit('load-page')
    },
    resetForm (formName) {
      this.$refs[formName].resetFields()
      this.formData = initFormData()
      this.dialogShow = false
    },
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.formRequestFn(this.formData).then(() => {
            this.$notify({
              title: '成功',
              message: `${this.methodName}成功`,
              type: 'success',
              duration: 2000,
            })
            this.loadPage()
            this.dialogShow = false
          })
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
  },
}
</script>

<style lang="scss" scoped>
.el-col {
  margin: 0;
}
.col-tips {
  height: 20px;
  font-size: 12px;
  color: #999;
}
.col-item {
  height: 30px;
  i {
    cursor: pointer;
  }
}
</style>
