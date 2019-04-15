<template>
  <div>
    <operation-container>
      <template slot="left">
        <iep-button type="primary" @click="handleAdd" icon="el-icon-plus" plain>新增模块</iep-button>
      </template>
    </operation-container>
    <iep-no-data v-if="!value.length" message="暂无关联模块"></iep-no-data>
    <div v-else class="module" v-for="(item) in value" :key="item.id">
      <span class="clear" @click="clear"><i class="icon-shanchu1"></i> </span>
      <div class="img">
        <img :src="item.imageUrl" alt="">
      </div>
      <div class="module-title">{{item.name}}</div>
    </div>
    <iep-dialog :dialog-show="dialogShow" title="添加关联模块" width="400px" @close="dialogShow=false">
      <el-form ref="form" :model="form" size="small" label-width="80px">
        <el-form-item label="版本号">
          <el-input v-model="form.versionNumber"></el-input>
        </el-form-item>
        <el-form-item label="上线时间">
          <iep-date-picker v-model="form.onlineTime" type="date" placeholder="请选择上线时间"></iep-date-picker>
        </el-form-item>
        <el-form-item label="更新内容">
          <iep-input-area v-model="form.updateContent"></iep-input-area>
        </el-form-item>
      </el-form>
      <template slot="footer">
        <iep-button type="primary" @click="submitForm('form')">提交</iep-button>
      </template>
    </iep-dialog>
  </div>
</template>
<script>
export default {
  name: 'IepCpmsModuleTable',
  props: {
    value: {
      type: Array,
      required: true,
    },
  },
  data () {
    return {
    }
  },
  methods: {
    handleAdd () {
      this.$message.success('功能开发中')
    },
  },
}
</script>
<style lang="scss" scoped>
.module {
  width: 150px;
  height: 150px;
  margin-right: 40px;
  display: inline-block;
  padding: 10px 25px;
  border: 1px solid #ccc;
  position: relative;
  .clear {
    position: absolute;
    right: 10px;
    .icon-shanchu1 {
      font-size: 12px !important;
      padding: 4px;
      border: 1px solid #ccc;
      border-radius: 50%;
    }
  }
  .img {
    padding: 5px;
    img {
      width: 100%;
      padding: 0;
      margin: 0;
      display: block;
      box-sizing: border-box;
    }
  }
  .module-title {
    width: 100%;
    padding-top: 10px;
    text-align: center;
  }
}
</style>
