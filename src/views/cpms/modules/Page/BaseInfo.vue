<template>
  <el-form size="small" label-width="130px">
    <el-row>
      <el-col :span='8'>
        <el-form-item label="产品模块编号：">
          <iep-div-detail :value="form.number"></iep-div-detail>
        </el-form-item>
      </el-col>
      <el-col :span='8'>
        <el-form-item label="产品模块分类：">
          <iep-dict-detail :value="form.type" dict-name="cpms_module_type"></iep-dict-detail>
        </el-form-item>
      </el-col>
      <el-col :span='8'>
        <el-form-item label="业务分类：">
          <iep-dict-select v-model="form.serviceTypes" dict-name="MODULE_SERVICE_TYPE" multiple disabled></iep-dict-select>
        </el-form-item>
      </el-col>
      <el-col :span='8'>
        <el-form-item label="测试地址：">
          <iep-div-detail :value="form.website"></iep-div-detail>
        </el-form-item>
      </el-col>
      <el-col :span='8'>
        <el-form-item label="产品模块指导价：">
          <div>{{form.guidePrice}}元</div>
        </el-form-item>
      </el-col>
      <el-col :span='8'>
        <el-form-item label="产品模块优惠价：">
          <div>{{form.preferentialPrice}}元</div>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col>
        <el-form-item label="产品模块介绍：">
          <iep-html v-model="form.description"></iep-html>
        </el-form-item>
      </el-col>
    </el-row>
  </el-form>
</template>

<script>
export default {
  props: {
    form: {
      type: Object,
      required: true,
    },
  },
  data () {
    return {
    }
  },
}
</script>

