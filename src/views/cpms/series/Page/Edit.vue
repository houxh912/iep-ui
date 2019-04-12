
<template>
  <div>
    <basic-container>
      <page-header :title="`${methodName}产品`" :backOption="backOption"></page-header>
      <el-form :model="form" size="small" label-width="150px" class="form-detail">
        <div class="title">基本信息：</div>
        <el-row class="base">
          <el-form-item label="产品logo：">
            <iep-avatar v-model="form.imageUrl"></iep-avatar>
          </el-form-item>
          <el-form-item label="产品编号：" class="form-half">
            <el-input v-model="form.number"></el-input>
          </el-form-item>
          <el-form-item label="产品名称：" class="form-half">
            <el-input v-model="form.name"></el-input>
          </el-form-item>
          <el-form-item label="网址：" class="form-half">
            <el-input v-model="form.website"></el-input>
          </el-form-item>
          <el-form-item label="上线时间：" class="form-half">
            <iep-date-picker v-model="form.onlineTime" type="date" placeholder="请输入时间"></iep-date-picker>
          </el-form-item>
          <el-form-item label="标签：">
            <iep-tag v-model="form.tagKeywords"></iep-tag>
          </el-form-item>
          <el-form-item label="是否带库：" class="form-half">
            <el-radio-group v-model="form.tapeLibrary">
              <el-radio label="1">是</el-radio>
              <el-radio label="0">否</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="产品估值：" class="form-half">
            <el-input v-model="form.valuation"></el-input>
          </el-form-item>
          <el-form-item label="估值说明：">
            <iep-input-area v-model="form.instructions"></iep-input-area>
          </el-form-item>
          <el-form-item label="产品简介：">
            <el-input v-model="form.synopsis"></el-input>
          </el-form-item>
          <el-form-item label="产品介绍：">
            <iep-input-area v-model="form.description"></iep-input-area>
          </el-form-item>
        </el-row>
        <div class="title">团队信息：</div>
        <el-row class="base">
          <el-form-item label="负责人：" class="form-half">
            <iep-contact-multiple-user v-model="form.userRelationCharges"></iep-contact-multiple-user>
          </el-form-item>
          <el-form-item label="需求方：" class="form-half">
            <iep-contact-multiple-user v-model="form.userRelationDemands"></iep-contact-multiple-user>
          </el-form-item>
          <el-form-item label="技术经理：" class="form-half">
            <iep-contact-multiple-user v-model="form.userRelationTechnologys"></iep-contact-multiple-user>
          </el-form-item>
          <el-form-item label="产品经理：" class="form-half">
            <iep-contact-multiple-user v-model="form.userRelationProducts"></iep-contact-multiple-user>
          </el-form-item>
          <el-form-item label="团队成员：" class="form-half">
            <iep-contact-multiple-user v-model="form.userRelationTeams"></iep-contact-multiple-user>
          </el-form-item>
        </el-row>
        <template v-if="isEdit">
          <div class="title">全新版本：</div>
          <el-row class="base">
            <operation-container>
              <template slot="left">
                <iep-button type="primary" @click="handleAdd" icon="el-icon-plus" plain>新增</iep-button>
              </template>
            </operation-container>
            <iep-table :isLoadTable="false" :pagination="pagination" :pagedTable="pagedTable" @size-change="handleSizeChange" @current-change="handleCurrentChange">
              <el-table-column label="版本号">
                <template slot-scope="scope">
                  {{scope.row.version}}
                </template>
              </el-table-column>
              <el-table-column label="上线时间">
                <template slot-scope="scope">
                  {{scope.row.time}}
                </template>
              </el-table-column>
              <el-table-column label="更新内容">
                <template slot-scope="scope">
                  {{scope.row.context}}
                </template>
              </el-table-column>
              <el-table-column label="操作" width="200">
                <template slot-scope="scope">
                  <operation-wrapper>
                    <iep-button type="warning" plain @click="handleEdit(scope.row)">编辑</iep-button>
                    <iep-button @click="handleDelete(scope.row)">删除</iep-button>
                  </operation-wrapper>
                </template>
              </el-table-column>
            </iep-table>
          </el-row>
          <div class="title">包含模块：</div>
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
      <footer-toolbar>
        <iep-button type="primary" @click="submitForm">提交</iep-button>
        <iep-button @click="$emit('onGoBack')">取消</iep-button>
      </footer-toolbar>
    </basic-container>
  </div>
</template>

<script>
import { getSeriesById } from '@/api/cpms/series'
import mixins from '@/mixins/mixins'
import FooterToolbar from '@/components/FooterToolbar/'
import { initForm, toDtoForm } from '../options'
const logo = require('../img2.png')
export default {
  name: 'edit',
  mixins: [mixins],
  components: {
    FooterToolbar,
  },
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
    this.methodName = this.record.methodName
    this.formRequestFn = this.record.formRequestFn
    if (this.isEdit) {
      getSeriesById(this.id).then(({ data }) => {
        this.form = this.$mergeByFirst(initForm(), data.data)
      })
    }
  },
  methods: {
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

