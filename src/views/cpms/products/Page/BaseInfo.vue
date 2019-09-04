<template>
  <el-form size="small" label-width="150px">
    <el-row>
      <el-col :span='8'>
        <el-form-item label="组合系统编号：">
          <iep-div-detail :value="form.number"></iep-div-detail>
        </el-form-item>
      </el-col>
      <el-col :span='8'>
        <el-form-item label="组合系统官网：">
          <iep-div-detail :value="form.website"></iep-div-detail>
        </el-form-item>
      </el-col>
      <el-col :span='8'>
        <el-form-item label="是否带库：">
          <div>{{form.tapeLibrary==='1' ? '是' : '否'}}</div>
        </el-form-item>
      </el-col>
      <el-col :span='8'>
        <el-form-item label="是否典型项目应用：">
          <div>{{form.isCase ? '是' : '否'}}</div>
        </el-form-item>
      </el-col>
      <el-col :span='8'>
        <el-form-item label="组合系统估值：">
          <div>{{form.valuation}}元</div>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col>
        <el-form-item label="估值说明：">
          <div>{{form.instructions}}</div>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col>
        <el-form-item label="组合系统介绍：">
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

