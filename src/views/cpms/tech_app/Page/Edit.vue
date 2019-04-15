
<template>
  <div>
    <basic-container>
      <page-header :title="`${methodName}技术`" :backOption="backOption"></page-header>
      <el-form :model="form" size="small" label-width="150px" class="form-detail">
        <div class="title">基本信息：</div>
        <el-row class="base">
          <el-form-item label="技术logo：">
            <iep-avatar v-model="form.imageUrl"></iep-avatar>
          </el-form-item>
          <el-form-item label="技术编号：" class="form-half">
            <el-input v-model="form.number"></el-input>
          </el-form-item>
          <el-form-item label="技术名称：" class="form-half">
            <el-input v-model="form.name"></el-input>
          </el-form-item>
          <el-form-item label="英文名称：" class="form-half">
            <el-input v-model="form.englishName"></el-input>
          </el-form-item>
          <el-form-item label="技术类型" class="form-half">
            <iep-dict-select v-model="form.type" dict-name="cpms_technology_type"></iep-dict-select>
          </el-form-item>
          <el-form-item label="标签：">
            <iep-tag v-model="form.tagKeywords"></iep-tag>
          </el-form-item>
          <el-form-item label="负责人：">
            <iep-contact-multiple-user v-model="form.userRelationCharges"></iep-contact-multiple-user>
          </el-form-item>
          <el-form-item label="技术简介：">
            <el-input v-model="form.synopsis"></el-input>
          </el-form-item>
          <el-form-item label="技术介绍：">
            <iep-input-area v-model="form.description"></iep-input-area>
          </el-form-item>
        </el-row>
        <template v-if="isEdit">
          <div class="title">应用模块：</div>
          <el-row class="base">
            <operation-container>
              <template slot="left">
                <iep-button type="primary" @click="handleAdd" icon="el-icon-plus" plain>新增模块</iep-button>
              </template>
            </operation-container>
            <div class="module" v-for="(item,index) in 3" :key="index">
              <span class="clear" @click="clear"><i class="icon-shanchu1"></i> </span>
              <div class="img">
                <img :src="logo" alt="">
              </div>
              <div class="module-title">资源配置模块</div>
            </div>
          </el-row>
          <div class="title">相关材料：</div>
          <el-row class="last base">
            <operation-container>
              <template slot="left">
                <iep-button type="primary" @click="handleAdd" icon="el-icon-plus" plain>新增产品资料</iep-button>
                <iep-button type="primary" @click="handleAdd" icon="el-icon-plus" plain>新增产品资质</iep-button>
              </template>
            </operation-container>
            <iep-table :isLoadTable="false" :pagination="pagination" :pagedTable="pagedTable1" @size-change="handleSizeChange" @current-change="handleCurrentChange">
              <el-table-column label="标题">
                <template slot-scope="scope">
                  {{scope.row.title}}
                </template>
              </el-table-column>
              <el-table-column label="类别">
                <template slot-scope="scope">
                  {{scope.row.type}}
                </template>
              </el-table-column>
              <el-table-column label="操作" width="200">
                <template slot-scope="scope">
                  <operation-wrapper>
                    <iep-button plain @click="handleDelete(scope.row)">删除</iep-button>
                  </operation-wrapper>
                </template>
              </el-table-column>
            </iep-table>
          </el-row>
        </template>
      </el-form>
      <FooterToolBar>
        <iep-button type="primary" @click="submitForm">提交</iep-button>
        <iep-button @click="$emit('onGoBack')">取消</iep-button>
      </FooterToolBar>
    </basic-container>
  </div>
</template>

<script>
import { getTechnologyById } from '@/api/cpms/technology'
import mixins from '@/mixins/mixins'
import { initForm, toDtoForm } from '../options'
const logo = require('../logo.png')
export default {
  name: 'edit',
  mixins: [mixins],
  props: {
    record: {
      type: Object,
      default: () => { },
    },
  },
  data () {
    return {
      logo,
      pagedTable: [
        {
          id: 1,
          context: '对数据进行重新审核和校验, 并提供数据一致性.',
          time: '2019-02-14',
          version: 'v5.0',
        },
        {
          id: 2,
          context: '对数据进行重新审核和校验, 并提供数据一致性.',
          time: '2019-02-14',
          version: 'v5.0',
        },
        {
          id: 3,
          context: '对数据进行重新审核和校验, 并提供数据一致性.',
          time: '2019-02-14',
          version: 'v5.0',
        },
      ],
      pagedTable1: [
        {
          id: 1,
          title: '对数据进行重新审核和校验, 并提供数据一致性.',
          type: '2019-02-14',
        },
        {
          id: 2,
          title: '对数据进行重新审核和校验, 并提供数据一致性.',
          type: '2019-02-14',
        },
        {
          id: 3,
          title: '对数据进行重新审核和校验, 并提供数据一致性.',
          type: '2019-02-14',
        },
      ],
      methodName: '',
      formRequestFn: () => { },
      backOption: {
        isBack: true,
        backPath: null,
        backFunction: () => { this.$emit('onGoBack') },
      },
      form: initForm(),
    }
  },
  computed: {
    id () {
      return this.record.id
    },
    isEdit () {
      return this.id ? true : false
    },
  },
  created () {
    this.loadPage()
  },
  methods: {
    loadPage () {
      this.methodName = this.record.methodName
      this.formRequestFn = this.record.formRequestFn
      if (this.isEdit) {
        getTechnologyById(this.id).then(({ data }) => {
          this.form = this.$mergeByFirst(initForm(), data.data)
        })
      }
    },
    handleEdit () {
      this.$message.success('功能开发中')
    },
    handleDelete () {
      this.$message.success('功能开发中')
    },
    handleAdd () {
      this.$message.success('功能开发中')
    },
    resetForm () {
      this.$message.success('功能开发中')
    },
    submitForm () {
      this.formRequestFn(toDtoForm(this.form)).then(() => {
        this.$emit('onGoBack')
      })
    },
    clear () {
      this.$message.success('功能开发中')
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
}
.el-form {
  margin: 0;
}
.last {
  padding-bottom: 20px;
}
</style>

