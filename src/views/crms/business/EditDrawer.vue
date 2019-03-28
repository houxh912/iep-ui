<template>
  <iep-drawer :drawer-show="drawerShow" type="drawer" :title="methodName+'商机'" width="40%" @close="loadPage">
    <el-form :model="formData" :rules="rules" ref="formName" label-width="100px" size="small">
      <el-form-item label="客户名称：" prop="clientName">
        <el-input v-model="formData.clientName" placeholder="客户名称"></el-input>
      </el-form-item>
      <el-form-item label="项目名称：" prop="projectName">
        <el-input v-model="formData.projectName" placeholder="项目名称"></el-input>
      </el-form-item>
      <el-form-item label="业务类型：" prop="businessType">
        <el-checkbox-group v-model="formData.businessType">
          <el-checkbox v-for="item in dictGroup['crms_client_opportunity']" :key="item.value" :label="item.value">{{item.label}}</el-checkbox>
        </el-checkbox-group>
      </el-form-item>
      <el-form-item label="意向程度：" prop="intentionLevel">
        <el-radio-group v-model="formData.intentionLevel">
          <el-radio v-for="item in dictGroup['crms_client_intention_level']" :key="item.value" :label="item.value">{{item.label}}</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="商机标签：" prop="tags">
        <iep-tags v-model="formData.tags" @addTags="addTags"></iep-tags>
      </el-form-item>
      <el-form-item label="商机描述：" prop="opportunityDes">
        <el-input type="textarea" v-model="formData.opportunityDes" placeholder="商机描述"></el-input>
      </el-form-item>
      <el-form-item label="发布者：">
        <el-input v-model="userInfo.realName" :disabled="true"></el-input>
      </el-form-item>
    </el-form>
    <template slot="footer">
      <iep-button class="btn" @click="handleGoBack">返回</iep-button>
      <iep-button type="primary" @click="submitForm('formName')">{{methodName}}</iep-button>
    </template>
  </iep-drawer>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
import { initForm, rules } from './options'
import iepTags from '@/components/IepTags'
export default {
  components: { iepTags },
  data () {
    return {
      formData: initForm(),
      methodName: '',
      rules,
      drawerShow: false,
      formRequestFn: () => { },
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
    handleGoBack () {
      this.formData = initForm()
      this.drawerShow = false
    },
    loadPage () {
      this.drawerShow = false
      this.$emit('load-page')
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
            this.drawerShow = false
            this.formData = initForm()
          })
        } else {
          return false
        }
      })
    },
    addTags () {
      this.$message('添加标签')
    },
  },
}
</script>