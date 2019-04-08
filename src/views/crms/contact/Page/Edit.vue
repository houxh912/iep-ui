<template>
  <div class="edit-wrapper">
    <basic-container>
      <page-header :title="`${methodName}联系人`"></page-header>
      <el-form :model="formData" :rules="rules" ref="formName" label-width="100px" size="small">
        <el-row>
          <el-col :span="12">
            <el-form-item label="联系人姓名" prop="contactName">
              <el-input v-model="formData.contactName"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="联系人职务" prop="contactPosition">
              <el-input v-model="formData.contactPosition"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="电话" prop="telephoneNo">
              <el-input v-model="formData.telephoneNo"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="对应客户" prop="clientInfos">
              <span class="tags" v-for="(item,index) in formData.clientInfos" :key="index">{{item.clientName}}</span>
              <el-button size="small" @click="addContact" icon="el-icon-plus"></el-button>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="手机" prop="cellphone">
              <el-input v-model="formData.cellphone"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="传真" prop="fax">
              <el-input v-model="formData.fax"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="QQ" prop="qq">
              <el-input v-model="formData.qq"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="微信" prop="wechat">
              <el-input v-model="formData.wechat"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="邮箱" prop="email">
              <el-input v-model="formData.email"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="地址" prop="address">
              <el-input v-model="formData.address"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="客户关注" prop="clientConcern">
              <el-input v-model="formData.clientConcern"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="其他" prop="other">
              <el-input v-model="formData.other"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item label="">
          <operation-wrapper>
            <iep-button type="primary " @click="submitForm('formName')">提交</iep-button>
            <iep-button @click="handleGoBack">返回</iep-button>
          </operation-wrapper>
        </el-form-item>
      </el-form>
    </basic-container>
    <el-dialog title="添加对应客户" :visible.sync="dialogVisible" width="50%">
      <avue-crud :data="pagedTable" :option="option" :page="page" @size-change="handleSizeChange" @current-change="handleCurrentChange" @selection-change="handleSelectionChange">
      </avue-crud>
      <div class="btn">
        <iep-button class="cancel" @click="dialogVisible = false">取 消</iep-button>
        <iep-button type="primary" @click="handlequery">添加</iep-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { mergeByFirst } from '@/util/util'
import mixins from '@/mixins/mixins'
import { initForm, rules } from '../options'
import { getContactById } from '@/api/crms/contact'
import { fetchList } from '@/api/crms/custom'

export default {
  mixins: [mixins],
  props: {
    record: {
      type: Object,
      default: () => { },
    },
  },
  data () {
    return {
      dialogShow: false,
      formRequestFn: () => { },
      methodName: '创建',
      formData: initForm(),
      rules,
      gridData: [],
      selectData: [],
      clientId: '',
      dialogVisible: false,
      option: {
        align: 'center',
        selection: true,
        header: false,
        menu: false,
        column: [
          {
            label: '客户姓名',
            prop: 'clientName',
          },
          {
            label: '市场经理',
            prop: 'marketManager',
          },
        ],
      },
    }
  },
  computed: {
    page () {
      return {
        currentPage: this.pagination.current,
        total: this.pagination.total,
        pageSize: this.pagination.size,
      }
    },
  },
  created () {
    this.methodName = this.record.methodName
    this.formRequestFn = this.record.formRequestFn
    this.id = this.record.id
    if (this.id) {
      getContactById(this.id).then(({ data }) => {
        this.formData = mergeByFirst(initForm(), data.data)
        this.formData.clientIds = this.formData.clientInfos.map(m => m.clientId)
      })
    }
  },
  methods: {
    addContact () {
      this.dialogVisible = true
      this.loadPage()
    },
    loadPage (param = { type: 1 }) {
      this.loadTable(param, fetchList)
    },
    handleGoBack () {
      this.$emit('onGoBack')
    },
    addTags () {
      this.$message('添加标签')
    },
    resetForm () {
      this.formData = initForm()
    },
    handleSelectionChange (row) {
      console.log(row)
      this.formData.clientIds = row.map(m => m.clientId)
      this.selectData = row
    },
    handlequery () {
      this.dialogVisible = false
      this.formData.clientInfos = this.selectData
    },
    submitForm (formName) {
      this.formData.clientIds = this.formData.clientInfos.map(m => m.clientId)
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.formRequestFn(this.formData).then(() => {
            this.$notify({
              title: '成功',
              message: `${this.methodName}成功`,
              type: 'success',
              duration: 2000,
            })
            this.$emit('onGoBack')
            this.loadPage()
          })
        } else {
          return false
        }
      })
    },
  },
}
</script>
<style scoped>
.edit-wrapper >>> .el-form {
  margin-right: 20%;
  margin-top: 30px;
}

.tags {
  display: inline-block;
  line-height: 0;
  margin-right: 8px;
  padding: 10px 5px;
  border-radius: 4px;
  background: #f3f2f2;
  font-size: 12px;
}
.btn {
  text-align: right;
}
.btn .cancel {
  margin-right: 10px;
}
.el-dialog {
  margin-top: 20px;
}
</style>

