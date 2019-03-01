<template>
  <div class="visitLog">
    <el-table
     :data="pagedTable">
      <el-table-column
          :label="item.label"
          v-for="(item, index) in columnsMap"
          :key="index"
          :prop="item.prop">
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <operation-wrapper>
            <el-button @click="handleEdit(scope.row)" size="small">编辑</el-button>
            <el-button @click="handleDeleteById(scope.row)" size="small">删除</el-button>
          </operation-wrapper>
        </template>
      </el-table-column>
    </el-table>
    <el-row class="add-visit">
      <el-col class="right button" :span=12>
        <div @click="createdJournal"><i class="el-icon-plus"></i> 拜访日志</div>
      </el-col>
      <el-col class="left button" :span=12>
        <div @click="createdRecord"><i class="el-icon-plus"></i> 联系记录</div>
      </el-col>
    </el-row>

    <iep-dialog :dialog-show="dialogShow" :title="`${methodName}拜访记录`" width="60%" @close="resetForm">
      <el-form :model="formData" :rules="rules" ref="form" label-width="100px">
        <el-form-item label="主题：" prop="zhuti">
          <el-input v-model="formData.zhuti"></el-input>
        </el-form-item>
        <el-form-item label="拜访时间：" prop="shijian">
          <el-input v-model="formData.shijian"></el-input>
        </el-form-item>
        <el-form-item label="拜访记录：" prop="jilu">
          <el-input type="textarea" v-model="formData.jilu"></el-input>
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
import { initVisitForm } from '../const/detail'
import { createVisit, updateVisit, deleteVisit } from '@/api/crms/custom'
import mixins from '@/mixins/mixins'
export default {
  name: 'visitLog',
  mixins: [ mixins ],
  components: { IepDialog },
  data () {
    return {
      isLoadTable: false,
      pagedTable: [],
      columnsMap: [
        { label: '主题', prop: 'name' },
        { label: '拜访时间', prop: 'zhiwu' },
        { label: '类型', prop: 'guanlian' },
      ],
      formData: {},
      rules: {},
      methodName: '',
      dialogShow: false,
      dicData: [
        { value: 1, label: '选项1' },
        { value: 2, label: '选项2' },
      ],
      submitFn: () => {},
    }
  },
  methods: {
    loadPage () {
      this.pagedTable = [
        { id:1, name: '拜访日志1' },
        { id:2, name: '拜访日志2' },
        { id:3, name: '拜访日志3' },
      ]
    },
    createdRecord () {
      this.dialogShow = true
      this.methodName = '新增'
      this.submitFn = createVisit
    },
    createdJournal () {},
    handleEdit () {
      this.dialogShow = true
      this.methodName = '编辑'
      this.submitFn = updateVisit
    },
    handleDeleteById (row) {
      this._handleGlobalDeleteById(row.id, deleteVisit)
    },
    resetForm () {
      this.formData = initVisitForm()
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
.visitLog {
  .add-visit {
    text-align: center;
    height: 40px;
    line-height: 40px;
    border-bottom: 1px solid #ececec;
    .button {
      cursor: pointer;
      padding: 5px;
    }
    .right {
      text-align: right;
      color: #db7a7e;
    }
    .left {
      text-align: left;
    }
  }
}
</style>
