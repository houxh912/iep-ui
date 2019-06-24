<template>
  <el-form size="small" label-width="100px">
    <el-row>
      <el-col :span='8'>
        <el-form-item label="技术编号：">
          <iep-div-detail :value="form.number"></iep-div-detail>
        </el-form-item>
      </el-col>
      <el-col :span='8'>
        <el-form-item label="技术分类：">
          <iep-dict-detail :value="form.type" dict-name="cpms_technology_type"></iep-dict-detail>
        </el-form-item>
      </el-col>
      <el-col :span='8'>
        <el-form-item label="英文名称：">
          <iep-div-detail :value="form.englishName"></iep-div-detail>
        </el-form-item>
      </el-col>
      <el-col :span='8'>
        <el-form-item label="技术状态：">
          <div>{{dictsMap.status[form.status]}}</div>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col>
        <el-form-item label="技术简介：">
          <div>{{form.synopsis}}</div>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col>
        <el-form-item label="技术介绍：">
          <div>{{form.description}}</div>
        </el-form-item>
      </el-col>
    </el-row>
  </el-form>
</template>

<script>
import { dictsMap } from '../options'
export default {
  props: {
    form: {
      type: Object,
      required: true,
    },
  },
  data () {
    return {
      dictsMap,
    }
  },
}
</script>

