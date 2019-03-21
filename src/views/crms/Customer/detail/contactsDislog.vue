<template>
  <div class="contacts">
    <el-table :data="pagedTable">
      <el-table-column :label="item.label" v-for="(item, index) in columnsMap" :key="index" :prop="item.prop">
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <operation-wrapper>
            <iep-button @click="handleEdit(scope.row)" size="small" type="warning">编辑</iep-button>
            <iep-button @click="handleDeleteById(scope.row)" size="small">删除</iep-button>
          </operation-wrapper>
        </template>
      </el-table-column>
    </el-table>
    <div class="add-contacts" @click="created"><i class="el-icon-plus"></i> 添加联系人</div>

    <iep-dialog :dialog-show="dialogShow" :title="`${methodName}联系人`" width="60%" @close="resetForm">
      <el-form :model="formData" :rules="rules" ref="form" label-width="100px">
        <el-row>
          <el-col :span=12>
            <el-form-item label="联系人姓名：" prop="contactName">
              <el-input v-model="formData.contactName"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span=12>
            <el-form-item label="联系人职务：" prop="contactPosition">
              <el-input v-model="formData.contactPosition"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item label="电话：" prop="telephoneNo">
          <el-input v-model="formData.telephoneNo"></el-input>
        </el-form-item>
        <el-row>
          <el-col :span=12>
            <el-form-item label="传真：" prop="fax">
              <el-input v-model="formData.fax"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span=12>
            <el-form-item label="QQ：" prop="qq">
              <el-input v-model="formData.qq"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span=12>
            <el-form-item label="微信：" prop="wechat">
              <el-input v-model="formData.wechat"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span=12>
            <el-form-item label="邮箱：" prop="email">
              <el-input v-model="formData.email"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span=12>
            <el-form-item label="手机：" prop="cellphone">
              <el-input v-model="formData.cellphone"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span=12>
            <el-form-item label="地址：" prop="address">
              <el-input v-model="formData.address"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item label="客户关注：" prop="clientConcern">
          <el-input type="textarea" v-model="formData.clientConcern"></el-input>
        </el-form-item>
        <el-form-item label="其他：" prop="other">
          <el-input type="textarea" v-model="formData.other"></el-input>
        </el-form-item>
      </el-form>
      <template slot="footer">
        <iep-button type="primary" @click="submitForm('form')">保存</iep-button>
        <iep-button @click="resetForm">取消</iep-button>
      </template>
    </iep-dialog>

  </div>
</template>

<script>
import IepDialog from '@/components/IepDialog/'
import { initContactForm } from '../options'
import { fetchList, createData, updateData, deleteDataById, editList } from '@/api/crms/contact'
import mixins from '@/mixins/mixins'
export default {
  name: 'contacts',
  mixins: [mixins],
  components: { IepDialog },
  data () {
    return {
      isLoadTable: false,
      columnsMap: [
        { label: '联系人姓名', prop: 'contactName' },
        { label: '联系人职务', prop: 'contactPosition' },
        { label: '电话', prop: 'cellphone' },
      ],
      pagedTables: [
        {
          name: 'aaa',
          zhiwu: 'sss',
          guanlian: 'aaa',
          tel: '1234123',
        },
        {
          name: 'aaa',
          zhiwu: 'sss',
          guanlian: 'aaa',
          tel: '1234123',
        },
        {
          name: 'aaa',
          zhiwu: 'sss',
          guanlian: 'aaa',
          tel: '1234123',
        },
      ],
      formData: {

      },
      rules: {},
      methodName: '',
      dialogShow: false,
      dicData: [
        { value: 1, label: '选项1' },
        { value: 2, label: '选项2' },
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
      this.loadTable(param, fetchList)
    },
    created () {
      this.dialogShow = true
      this.methodName = '新增'
      this.submitFn = createData
    },
    handleEdit (row) {
      this.dialogShow = true
      this.methodName = '编辑'
      this.submitFn = updateData
      editList(row.clientContactId).then(res => {
        this.formData = res.data.data
      })
    },
    handleDeleteById (row) {
      this._handleGlobalDeleteById(row.clientContactId, deleteDataById)
    },
    resetForm () {
      this.formData = initContactForm()
      this.dialogShow = false
    },
    submitForm (formName) {
      this.formData.clientIds = [this.record.clientId]
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
.contacts {
  .add-contacts {
    text-align: center;
    height: 40px;
    line-height: 40px;
    border-bottom: 1px solid #ececec;
    cursor: pointer;
  }
}
</style>
