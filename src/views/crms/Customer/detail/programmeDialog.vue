<template>
  <div class="programme">
    <el-table :data="pagedTable">
      <el-table-column :label="'方案名称'" prop="programName">
      </el-table-column>
      <el-table-column :label="'附件'"  prop="downLoadUrl" width="200">
        <el-button type="text">下载</el-button>
      </el-table-column>
      <el-table-column label="操作" width="200px">
        <template slot-scope="scope">
          <operation-wrapper>
            <iep-button @click="handleEdit(scope.row)" size="small">编辑</iep-button>
            <iep-button @click="handleDeleteById(scope.row)" size="small">删除</iep-button>
          </operation-wrapper>
        </template>
      </el-table-column>
    </el-table>
    <div class="add-programme" @click="created"><i class="el-icon-plus"></i> 添加方案</div>
    <pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :pagination-option="pagination"></pagination>
    <el-row class="recommend">
      <el-col class="title">为您推荐一下参考材料：</el-col>
      <el-col class="item" :span=12 v-for="(item, index) in recommendList" :key="index">{{item.name}}</el-col>
    </el-row>

    <iep-dialog :dialog-show="dialogShow" :title="`${methodName}联系人`" width="60%" @close="resetForm">
      <el-form :model="formData" :rules="rules" ref="form" label-width="100px">
        <el-form-item>
          <el-col><i class="el-icon-warning"></i> 是否需要关联材料库？如需要，<span class="relation">请点击</span></el-col>
          <el-col>如不需要，请直接填写下方内容</el-col>
        </el-form-item>
        <el-form-item label="方案名称：" prop="programName">
          <el-input v-model="formData.programName"></el-input>
        </el-form-item>
        <el-form-item label="附件上传：" prop="downLoadUrl">
          <el-col class="upload-item">
            <el-input class="upload-input" v-model="formData.downLoadUrl" :disabled="true" />
            <iep-button class="upload-button" size="small" plain><i class="el-icon-plus"></i> 点击上传</iep-button>
          </el-col>
        </el-form-item>
      </el-form>
      <template slot="footer">
        <iep-button type="primary" @click="submitForm('form')">{{methodName}}</iep-button>
        <iep-button @click="resetForm">取消</iep-button>
      </template>
    </iep-dialog>

  </div>
</template>

<script>
import IepDialog from '@/components/IepDialog/'
import { initContactForm } from '../options'
import pagination from '@/components/IepTable/Pagination'
import mixins from '@/mixins/mixins'
// import { fetchProgramme, createProgramme, updateProgramme, deleteProgramme } from '@/api/crms/custom'
import { fetchProgrammeList, createProgramme, updateProgramme, deleteProgramme } from '@/api/crms/crm'
export default {
  name: 'contacts',
  mixins: [mixins],
  components: { IepDialog, pagination },
  data () {
    return {
      isLoadTable: false,
      columnsMap: [
        { label: '方案名称', prop: 'programName' },
        { label: '附件', prop: 'downLoadUrl', width: '200' },
      ],
      formData: {},
      rules: {},
      methodName: '',
      dialogShow: false,
      dicData: [
        { value: 1, label: '选项1' },
        { value: 2, label: '选项2' },
      ],
      recommendList: [
        {
          name: '20180919建设银行政务服务中心方案1号',
        }, {
          name: '20180919建设银行政务服务中心方案2号',
        }, {
          name: '20180919建设银行政务服务中心方案3号',
        },
      ],
      submitFn: () => { },
    }
  },
  props: {
    record: {
      type: Object,
      default: () => { },
    },
  },
  methods: {
    loadPage (param) {
      let id = this.record.clientId
      this.loadTable({ ...param, clientId: id }, fetchProgrammeList)
    },
    created () {
      this.dialogShow = true
      this.methodName = '新增'
      this.submitFn = createProgramme
    },
    handleEdit (row) {
      this.formData = { ...row }
      this.dialogShow = true
      this.methodName = '编辑'
      this.submitFn = updateProgramme
    },
    handleDeleteById (row) {
      this._handleGlobalDeleteById(row.programId, deleteProgramme)
    },
    resetForm () {
      this.formData = initContactForm()
      this.dialogShow = false
    },
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.submitFn({...this.formData,clientId:this.record.clientId}).then(() => {
            this.$notify({
              title: '成功',
              message: `${this.methodName}成功`,
              type: 'success',
              duration: 2000,
            })
            this.loadPage()
            this.dialogShow = false
          })
        } else {
          return false
        }
      })
    },
  },
  created () {
    this.loadPage()
  },
}
</script>

<style lang="scss" scoped>
.programme {
  .add-programme {
    text-align: center;
    height: 40px;
    line-height: 40px;
    border-bottom: 1px solid #ececec;
    cursor: pointer;
  }
  .recommend {
    .item {
      padding: 5px 15px;
      cursor: pointer;
    }
  }
}
.relation {
  color: #f00;
  cursor: pointer;
}
.upload-item {
  display: flex;
  .upload-input {
    flex: 1;
    margin-right: 20px;
  }
}
</style>
