<template>
  <div class="monthly">
    <div class="head">
      <div class="title">个人工作月报<span class="date">（2019年2月）</span></div>
      <div class="tips" v-if="dislogState!=='detail'">记不清楚做什么？<a class="href">参考本月周报</a></div>
      <div class="tips update" v-else @click="handleUpdate"><i class="el-icon-edit"></i></div>
    </div>
    <div class="content">
      <el-form ref="form" v-if="dislogState!=='detail'" :model="formData">
        <div class="title">领导指示</div>
        <el-form-item prop="zhishi">
          <el-input type="textarea" v-model="formData.zhishi" rows=5 placeholder="此处填写领导指示"></el-input>
        </el-form-item>
        <div class="title">本月工作总结</div>
        <el-form-item prop="benzhouzongjie">
          <el-input type="textarea" v-model="formData.benzhouzongjie" rows=5 placeholder="此处填写本月工作总结"></el-input>
        </el-form-item>
        <div class="title">下月工作计划</div>
        <el-form-item prop="xiazhouzongjie">
          <el-input type="textarea" v-model="formData.xiazhouzongjie" rows=5 placeholder="此处填写下月工作计划"></el-input>
        </el-form-item>
        <div class="title">总结与感悟</div>
        <el-form-item prop="ganwu">
          <el-input type="textarea" v-model="formData.ganwu" rows=5 placeholder="此处填写总结与感悟"></el-input>
        </el-form-item>
        <div class="title">添加关联</div>
        <el-form-item prop="guanlian">
          <el-input v-model="formData.guanlian"></el-input>
        </el-form-item>
        <el-form-item>
          <iep-button @click="submit" type="danger">保存</iep-button>
        </el-form-item>
      </el-form>
      <div v-else class="detail">
        <div class="title">领导指示</div>
        <pre>{{formData.zhishi}}</pre>
        <div class="title">本月工作总结</div>
          <pre>{{formData.benzhouzongjie}}</pre>
        <div class="title">下月工作计划</div>
          <pre>{{formData.xiazhouzongjie}}</pre>
        <div class="title">总结与感悟</div>
          <pre>{{formData.ganwu}}</pre>
        <div class="title">关联内容</div>
          <pre>{{formData.guanlian}}</pre>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      formData: {
        zhishi: '',
        benzhouzongjie: '',
        xiazhouzongjie: '',
        ganwu: '',
      },
      dislogState: 'create',
    }
  },
  methods: {
    submit () {},
    handleUpdate () {
      this.dislogState = 'update'
    },
  },
}
</script>

<style lang="scss" scoped>
.monthly {
  .head {
    margin-bottom: 20px;
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid #ddd;
    padding: 20px 0;
    font-size: 18px;
    .title {
      font-weight: 700;
      .date {
        font-size: 14px;
        color: #999;
        font-weight: 500;
      }
    }
    .tips {
      font-size: 14px;
      line-height: 24px;
      margin-right: 3px;
      color: #999;
      .href {
        color: #ba1b21;
        cursor: pointer;
      }
    }
    .update {
      font-size: 18px;
      cursor: pointer;
    }
  }
  .content {
    .title {
      margin-bottom: 20px;
    }
    .detail {
      pre {
        padding-left: 20px;
        line-height: 20px;
        margin: 0;
        min-height: 50px;
      }
      .title {
        font-weight: 700;
        margin-top: 10px;
      }
    }
  }
}
</style>
