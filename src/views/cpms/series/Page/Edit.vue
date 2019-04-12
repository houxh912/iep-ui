
<template>
  <div>
    <basic-container>
      <page-header :title="`${methodName}产品`" :backOption="backOption"></page-header>
      <el-form :model="formData" size="small" label-width="150px" class="form-detail">
        <div class="title">基本信息：</div>
        <el-row class="base">
          <el-form-item label="产品logo：">
            <iep-avatar v-model="formData.logo"></iep-avatar>
          </el-form-item>
          <el-form-item label="产品编号：" class="form-half">
            <el-input v-model="formData.number"></el-input>
          </el-form-item>
          <el-form-item label="产品名称：" class="form-half">
            <el-input v-model="formData.name"></el-input>
          </el-form-item>
          <el-form-item label="网址：" class="form-half">
            <el-input v-model="formData.url"></el-input>
          </el-form-item>
          <el-form-item label="分类选择：" class="form-half">
            <iep-dict-select v-model="formData.districtType" dict-name="crms_district_type"></iep-dict-select>
          </el-form-item>
          <el-form-item label="等级：" class="form-half">
            <iep-dict-select v-model="formData.grade" dict-name="crms_district_type"></iep-dict-select>
          </el-form-item>
          <el-form-item label="签署部门：" class="form-half">
            <iep-dept-select v-model="formData.signDeptOrgName"></iep-dept-select>
          </el-form-item>
          <el-form-item label="标签：">
            <iep-tag v-model="formData.tags"></iep-tag>
          </el-form-item>
          <el-form-item label="是否带库：">
            <el-radio v-model="formData.radio" label="1">是</el-radio>
            <el-radio v-model="formData.radio" label="0">否</el-radio>
          </el-form-item>
          <el-form-item label="产品估值：" class="form-half">
            <el-input v-model="formData.value"></el-input>
          </el-form-item>
          <el-form-item label="估值说明：">
            <el-input type="textarea" v-model="formData.explain"></el-input>
          </el-form-item>
          <el-form-item label="产品介绍：">
            <el-input type="textarea" v-model="formData.desc"></el-input>
          </el-form-item>
        </el-row>
        <div class="title">团队信息：</div>
        <el-row class="base">
          <el-form-item label="负责人：" class="form-half">
            <iep-dept-select v-model="formData.signDeptOrgName"></iep-dept-select>
          </el-form-item>
          <el-form-item label="需求方：" class="form-half">
            <iep-dept-select v-model="formData.signDeptOrgName"></iep-dept-select>
          </el-form-item>
          <el-form-item label="技术经理：" class="form-half">
            <iep-dept-select v-model="formData.signDeptOrgName"></iep-dept-select>
          </el-form-item>
          <el-form-item label="产品经理：" class="form-half">
            <iep-dept-select v-model="formData.signDeptOrgName"></iep-dept-select>
          </el-form-item>
          <el-form-item label="团队成员：" class="form-half">
            <iep-dept-select v-model="formData.signDeptOrgName"></iep-dept-select>
          </el-form-item>
          <el-form-item label="上线时间：" class="form-half">
            <IepDatePicker v-model="formData.createTime"></IepDatePicker>
          </el-form-item>
        </el-row>
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
      </el-form>
      <footer-toolbar>
        <iep-button type="primary" @click="submitForm">提交</iep-button>
        <iep-button @click="resetForm">取消</iep-button>
      </footer-toolbar>
    </basic-container>
  </div>
</template>

<script>
const logo = require('../img2.png')
import mixins from '@/mixins/mixins'
import FooterToolbar from '@/components/FooterToolbar/'
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
      id: '',
      methodName: '',
      formRequestFn: () => { },
      backOption: {
        isBack: true,
        backPath: null,
        backFunction: () => { this.$emit('onGoBack') },
      },
      formData: {
        logo: '',
        name: '',
        url: '',
        districtType: [],
        grade: [],
        signDeptOrgName: {},
        tags: [],
        radio: '',
        value: '',
        explain: '',
        desc: '',
        createTime: '',
      },
    }
  },
  created () {
    this.methodName = this.record.methodName
    this.formRequestFn = this.record.formRequestFn
    this.id = this.record.id
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
      this.$message.success('功能开发中')
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

