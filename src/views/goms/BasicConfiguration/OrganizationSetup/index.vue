<template>
  <div>
    <basic-container>
      <page-header title="组织设置"></page-header>
      <operation-container>
        <template slot="right">
          <el-button size="small">组织变更记录</el-button>
        </template>
      </operation-container>
      <el-form>
        <div></div>
        <div></div>
        <div></div>
        <el-form-item label="组织名称：" prop="name">
          <el-input type="text" style="width:300px;"></el-input>
        </el-form-item>
        <el-form-item label="组织简称：" prop="orgAbrName">
          <el-input style="width:300px;" placeholder="请输入组织简称"></el-input>
        </el-form-item>
        <el-form-item label="成立时间：" prop="establishTime">
          <el-input style="width:300px;"></el-input>
        </el-form-item>
        <el-form-item label="创建人：" prop="creator">
          <el-input style="width:300px;" type="text" disabled></el-input>
        </el-form-item>
        <el-form-item label="联系方式：" prop="contactMethod">
          <el-input placeholder="请输入真实姓名"></el-input>
        </el-form-item>
        <el-form-item label="组织简介：" prop="intro">
          <el-input type="textarea" placeholder="验证码登录使用"></el-input>
        </el-form-item>
        <el-form-item label="组织架构：" prop="orgStructure">
          <el-input type="textarea"></el-input>
        </el-form-item>
        <el-form-item label="核心优势：" prop="coreAdvantage">
          <el-input type="textarea" placeholder="请输入核心优势"></el-input>
        </el-form-item>
        <el-form-item label="组织客服人员：" prop="phone">
          <el-input></el-input>
        </el-form-item>
        <el-form-item label="系统联系人员：" prop="phone">
          <el-input></el-input>
        </el-form-item>
      </el-form>
    </basic-container>
  </div>
</template>
<script>
import mixins from '@/mixins/mixins'
export default {
  mixins: [mixins],
  data () {
    return {

    }
  },
}
</script>
