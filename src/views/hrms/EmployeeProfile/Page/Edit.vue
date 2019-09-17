<template>
  <div class="edit-wrapper">
    <basic-container>
      <iep-page-header title="员工信息管理"></iep-page-header>
      <el-form v-loading="formLoading" ref="form" class="form-detail" :rules="rules" :model="form" label-width="150px" size="small">
        <iep-tab-scroll :tab-list="tabList" :height="270">
          <div>
            <div class="base" :id="item.value" v-for="item in tabList" :key="item.value">
              <div class="title">{{item.label}}</div>
              <div class="context">
                <component v-model="form" :is="item.value" @on-save="handleAutoSubmit"></component>
              </div>
            </div>
          </div>
        </iep-tab-scroll>
      </el-form>
      <!-- fixed footer toolbar -->
      <footer-tool-bar>
        <iep-button @click="handleGoBack">返回</iep-button>
        <iep-button type="primary" :loading="submitFormLoading" @click="handleSubmit">提交</iep-button>
      </footer-tool-bar>
    </basic-container>
  </div>
</template>
<script>
import formMixins from '@/mixins/formMixins'
import BaseInfo from './BaseInfo'
import ContactInfo from './ContactInfo'
import LaborContract from './LaborContract'
import Welfare from './Welfare'
import Transfer from './Transfer'
import Dimission from './Dimission'
import { getEmployeeProfileById, putEmployeeProfile } from '@/api/hrms/employee_profile'
import { initForm, formToVo, formToDto, rules } from '@/views/hrms/EmployeeProfile/options'
export default {
  mixins: [formMixins],
  components: {
    BaseInfo,
    ContactInfo,
    LaborContract,
    Welfare,
    Transfer,
    Dimission,
  },
  props: {
    record: {
      type: Object,
      default: () => { },
    },
  },
  data () {
    return {
      tabList: [{
        label: '基础信息',
        value: 'BaseInfo',
      }, {
        label: '联系信息',
        value: 'ContactInfo',
      }, {
        label: '劳动合同',
        value: 'LaborContract',
      }, {
        label: '社保福利',
        value: 'Welfare',
      }, {
        label: '调动情况',
        value: 'Transfer',
      }, {
        label: '离职信息',
        value: 'Dimission',
      }],
      backOption: {
        isBack: true,
        backPath: null,
        backFunction: this.handleGoBack,
      },
      formLoading: true,
      rules,
      form: initForm(),
    }
  },
  computed: {
    id () {
      return this.$route.params.id || this.record.id
    },
  },
  created () {
    this.loadPage()
  },
  methods: {
    async submitForm () {
      const { data } = await putEmployeeProfile(formToDto(this.form))
      if (data.data) {
        return true
      } else {
        this.$message.error(data.msg)
        return false
      }
    },
    async handleAutoSubmit () {
      const res = await this.mixinsSubmitFormGen()
      if (res) {
        this.loadPage()
      }
    },
    async handleSubmit () {
      const res = await this.mixinsSubmitFormGen()
      if (res) {
        this.$message({
          message: '操作成功',
          type: 'success',
        })
        this.handleGoBack()
      }
    },
    handleGoBack () {
      if (this.$route.params.id) {
        this.$router.go(-1)
      } else {
        this.$emit('onGoBack')
      }
    },
    loadPage () {
      this.formLoading = true
      getEmployeeProfileById(this.id).then(({ data }) => {
        this.form = formToVo(data.data)
        this.formLoading = false
      })
    },
  },
}
</script>

<style lang="scss" scoped>
.edit-wrapper {
  margin-bottom: 60px;
}
.base {
  border-bottom: 1px solid #eee;
  .title {
    padding: 20px 20px 0 20px;
    font-size: 16px;
    font-weight: 600;
  }
  .context {
    padding: 20px 40px;
  }
}
</style>
