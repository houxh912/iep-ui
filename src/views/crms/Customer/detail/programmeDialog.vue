<template>
  <div class="programme">
    <el-table
     :data="pagedTable">
      <el-table-column
          :label="item.label"
          v-for="(item, index) in columnsMap"
          :key="index"
          :prop="item.prop"
          :width="item.width">
      </el-table-column>
      <el-table-column label="操作" width="200px">
        <template slot-scope="scope">
          <operation-wrapper>
            <el-button @click="handleEdit(scope.row)" size="small">编辑</el-button>
            <el-button @click="handleDeleteById(scope.row)" size="small">删除</el-button>
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
        <el-form-item label="方案名称：" prop="name">
          <el-input v-model="formData.name"></el-input>
        </el-form-item>
        <el-form-item label="附件上传：" prop="downLoadUrl">
          <el-col class="upload-item">
            <el-input class="upload-input" v-model="formData.downLoadUrl" :disabled="true"/>
            <el-button class="upload-button" size="small" plain><i class="el-icon-plus"></i> 点击上传</el-button>
          </el-col>
        </el-form-item>
      </el-form>
      <template slot="footer">
        <el-button type="primary" @click="submitForm('form')">{{methodName}}</el-button>
        <el-button @click="resetForm">取消</el-button>
      </template>
    </iep-dialog>

  </div>
</template>

<script>
import IepDialog from '@/components/IepDialog/'
import { initContactForm } from '../const/detail'
import pagination from '@/components/IepTable/Pagination'
import mixins from '@/mixins/mixins'
import { fetchProgramme, createProgramme, updateProgramme, deleteProgramme } from '@/api/crms/custom'
export default {
  name: 'contacts',
  mixins: [ mixins ],
  components: { IepDialog, pagination },
  data () {
    return {
      isLoadTable: false,
      columnsMap: [
        { label: '方案名称', prop: 'name' },
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
      submitFn: () => {},
    }
  },
  methods: {
    loadPage (param) {
      this.loadTable(param, fetchProgramme)
    },
    created () {
      this.dialogShow = true
      this.methodName = '新增'
      this.submitFn = createProgramme
    },
    handleEdit (row) {
      this.formData = {...row}
      this.dialogShow = true
      this.methodName = '编辑'
      this.submitFn = updateProgramme
    },
    handleDeleteById (row) {
      this._handleGlobalDeleteById(row.id, deleteProgramme)
    },
    resetForm () {
      this.formData = initContactForm()
      this.dialogShow = false
    },
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.submitFn(this.formData).then(() => {
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
