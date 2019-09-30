
<template>
  <div>
    <basic-container>
      <iep-page-header :title="`${methodName}组合系统`" :backOption="backOption"></iep-page-header>
      <el-form ref="form" :model="form" size="small" :rules="rules" label-width="150px" class="form-detail">
        <div class="title">基本信息：</div>
        <el-row class="base">
          <el-form-item label="组合系统logo：" prop="imageUrl">
            <iep-avatar v-model="form.imageUrl"></iep-avatar>
          </el-form-item>
          <el-form-item label="组合系统编号：" prop="number" class="form-half">
            <el-input :maxlength="110" v-model="form.number"></el-input>
          </el-form-item>
          <el-form-item label="组合系统名称：" prop="name" class="form-half">
            <el-input :maxlength="110" v-model="form.name"></el-input>
          </el-form-item>
          <el-form-item label="组合系统分类：" prop="type" class="form-half">
            <iep-dict-select v-model="form.type" dict-name="PRODUCT_TYPE"></iep-dict-select>
          </el-form-item>
          <iep-form-item label-name="组合系统网址" prop="website" class="form-half" tip="请输入有效地址，如'https://www.baidu.com'">
            <el-input :maxlength="110" v-model="form.website"></el-input>
          </iep-form-item>
          <iep-form-item label-name="考试地址" class="form-half" tip="请输入有效地址，如'/cpms_spa/product_edit'">
            <el-input v-model="form.exam_address"></el-input>
          </iep-form-item>
          <el-form-item label="上线时间：" prop="onlineTime" class="form-half">
            <iep-date-picker v-model="form.onlineTime" type="date" placeholder="请输入时间"></iep-date-picker>
          </el-form-item>
          <el-form-item label="标签：" prop="tagKeywords">
            <iep-tag v-model="form.tagKeywords"></iep-tag>
          </el-form-item>
          <el-form-item label="是否带库：" prop="tapeLibrary" class="form-half">
            <el-radio-group v-model="form.tapeLibrary">
              <el-radio label="1">是</el-radio>
              <el-radio label="0">否</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="是否典型项目应用：" prop="isCase" class="form-half">
            <el-radio-group v-model="form.isCase">
              <el-radio :label="1">是</el-radio>
              <el-radio :label="0">否</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="组合系统估值(元)：" prop="valuation" class="form-half">
            <iep-input-amount v-model="form.valuation"></iep-input-amount>
          </el-form-item>
          <el-form-item label="估值说明：" prop="instructions">
            <iep-input-area v-model="form.instructions"></iep-input-area>
          </el-form-item>
          <el-form-item label="组合系统简介：" prop="synopsis">
            <el-input :maxlength="110" v-model="form.synopsis"></el-input>
          </el-form-item>
          <el-form-item label="组合系统介绍：" prop="description">
            <iep-froala-editor v-model="form.description"></iep-froala-editor>
          </el-form-item>
        </el-row>
        <div class="title">团队信息：</div>
        <el-row class="base">
          <el-form-item label="负责人：" prop="userRelationCharges" class="form-half">
            <iep-contact-multiple-user v-model="form.userRelationCharges"></iep-contact-multiple-user>
          </el-form-item>
          <el-form-item label="需求方：" class="form-half">
            <iep-contact-multiple-user v-model="form.userRelationDemands" :filter-user-list="filterUserList"></iep-contact-multiple-user>
          </el-form-item>
          <el-form-item label="技术经理：" class="form-half">
            <iep-contact-multiple-user v-model="form.userRelationTechnologys"></iep-contact-multiple-user>
          </el-form-item>
          <el-form-item label="产品经理：" class="form-half">
            <iep-contact-multiple-user v-model="form.userRelationProducts"></iep-contact-multiple-user>
          </el-form-item>
          <el-form-item label="团队成员：">
            <iep-contact-multiple-user v-model="form.userRelationTeams" :filter-user-list="filterUserList"></iep-contact-multiple-user>
          </el-form-item>
        </el-row>
        <template v-if="isEdit">
          <div class="title">全新版本：</div>
          <el-row class="base">
            <iep-cpms-version-table :table-data="form.versions" :productId="form.id" @load-page="loadPage"></iep-cpms-version-table>
          </el-row>
        </template>
        <div class="title">包含产品模块：</div>
        <el-row class="base">
          <iep-cpms-module-table v-model="form.moduleRelations"></iep-cpms-module-table>
        </el-row>
        <div class="title">相关材料：</div>
        <el-row class="last base">
          <iep-cpms-material-table v-model="form.materialRelations"></iep-cpms-material-table>
        </el-row>
      </el-form>
      <FooterToolBar>
        <iep-button type="primary" :loading="submitFormLoading" @click="mixinsSubmitFormGen()">提交</iep-button>
      </FooterToolBar>
    </basic-container>
  </div>
</template>

<script>
import { getProductById, postProduct, putProduct } from '@/api/cpms/product'
import mixins from '@/mixins/mixins'
import formMixins from '@/mixins/formMixins'
import IepCpmsVersionTable from '@/views/cpms/Components/VersionTable'
import IepCpmsModuleTable from '@/views/cpms/Components/ModuleTable'
import IepCpmsMaterialTable from '@/views/cpms/Components/MaterialTable'
import { initForm, toDtoForm, rules } from '../options'
export default {
  name: 'edit',
  mixins: [mixins, formMixins],
  components: {
    IepCpmsVersionTable,
    IepCpmsModuleTable,
    IepCpmsMaterialTable,
  },
  props: {
    record: {
      type: Object,
      default: () => { },
    },
  },
  data () {
    return {
      backOption: {
        isBack: true,
      },
      rules,
      form: initForm(),
    }
  },
  computed: {
    id () {
      return +this.$route.params.id
    },
    isEdit () {
      return this.id ? true : false
    },
    formRequestFn () {
      return this.isEdit ? putProduct : postProduct
    },
    methodName () {
      return this.isEdit ? '修改' : '新增'
    },
    filterUserList () {
      const filterUsers = []
      filterUsers.push(...this.form.userRelationCharges)
      filterUsers.push(...this.form.userRelationDemands)
      filterUsers.push(...this.form.userRelationTechnologys)
      filterUsers.push(...this.form.userRelationProducts)
      filterUsers.push(...this.form.userRelationTeams)
      let dupeArray = filterUsers.map(m => m.id)
      let uniqueArray = Array.from(new Set(dupeArray))
      return uniqueArray
    },
  },
  created () {
    this.loadPage()
  },
  methods: {
    loadPage () {
      if (this.isEdit) {
        getProductById(this.id).then(({ data }) => {
          this.form = this.$mergeByFirst(initForm(), data.data)
        })
      }
    },
    async submitForm () {
      const { data } = await this.formRequestFn(toDtoForm(this.form))
      if (data.data) {
        this.$router.history.go(-1)
      } else {
        this.$message(data.msg)
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.title {
  padding: 0 20px 10px 20px;
  font-size: 16px;
  font-weight: 600;
}
.base {
  padding-left: 20px;
  padding-right: 20%;
  margin-bottom: 30px;
}
.last {
  padding-bottom: 20px;
}
</style>

