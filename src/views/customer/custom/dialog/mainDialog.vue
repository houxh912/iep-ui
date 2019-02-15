<template>
  <gov-dialog
    ref="dialog"
    :title="status[state]"
    @closed="handleClosed"
    @handleSubmit="handleSubmit"
    :is-btn-group="state!='detail'">
    <gov-layout-form>
      <template v-if="state==='detail'">
        <div class="detail-wrapper">
          <avue-form-detail v-model="formData" :option="demDetailFormData"></avue-form-detail>
        </div>
      </template>
      <template v-else>
        <!-- <avue-form ref="form" v-model="formData" :option="formOption"></avue-form> -->
        <el-form ref="form" :model="formData" label-width="80px">
          <el-form-item label="客户名称">
            <el-input v-model="formData.name"></el-input>
          </el-form-item>
          <el-form-item label="区域类型">
            <el-select v-model="formData.type" placeholder="请选择活动区域">
              <el-option label="区域一" value="shanghai"></el-option>
              <el-option label="区域二" value="beijing"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="客户描述">
            <el-input v-model="formData.miaoshu" placeholder="单位网址"></el-input>
          </el-form-item>
          <el-form-item label="">
            <el-input type="textarea" v-model="formData.zhineng" placeholder="单位职能"></el-input>
          </el-form-item>
          <el-form-item label="">
            <el-input v-model="formData.dizhi" placeholder="联系地址"></el-input>
          </el-form-item>
          <el-form-item label="">
            <el-input type="textarea" v-model="formData.shuoming" placeholder="其他说明"></el-input>
          </el-form-item>
          <el-form-item label="市场经理">
            
          </el-form-item>
          <el-form-item label="负责部门">
            <el-input v-model="formData.dizhi"></el-input>
          </el-form-item>
          <el-form-item label="业务类型">
            <el-radio-group v-model="formData.resource">
              <el-radio v-for="item in list" :key="item.value" :label="item.value">{{item.label}}</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="客户关系">
            <el-select v-model="formData.guanxi">
              <el-option label="关系一" value="shanghai"></el-option>
              <el-option label="关系二" value="beijing"></el-option>
            </el-select>
            <el-alert title="消息提示的文案" type="info" show-icon></el-alert>
          </el-form-item>
          <el-form-item label="合作项目">
            
          </el-form-item>
          <el-form-item label="相关产品">
            
          </el-form-item>
          <el-form-item label="相关方案">
            
          </el-form-item>
          <el-form-item label="拜访记录">
            
          </el-form-item>
          <el-form-item label="维护情况">
            
          </el-form-item>
        </el-form>
      </template>
    </gov-layout-form>
  </gov-dialog>
</template>

<script>

export default {
  data () {
    return {
      formData: {},
      status: {update: '编辑', create: '新增', detail: '详情'},
      list: [{value: 1, label: '选项1'}, {value: 2, label: '选项2'}],
    }
  },
  computed: {
    formOption () {
      return {}
    },
    demDetailFormData () {
      return {option: [{column: this.formOption.column}]}
    },
  },
  props: {
    state: {
      type: String,
      default: 'create',
    },
  },
  methods: {
    open (data) {
      this.formData = data
      this.$refs['dialog'].open()
    },
    close () {
      this.$refs['dialog'].close()
    },
    handleClosed () {
      if (this.state != 'detail') {
        this.$refs.form.clearValidate()
        this.$refs.form.resetForm()
      }
    },
    handleSubmit () {
      this.$refs['form'].validate().then(()=>{
        
      })
    },
  },
}
</script>

<style lang="scss" scoped>
</style>

