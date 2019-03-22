<template>
  <div class="edit-wrapper">
    <el-card class="edit-card" shadow="hover">
      <div slot="header" class="title">
        <span>编辑联系人</span>
      </div>
      <el-form :model="formData" :rules="rules" ref="formName" label-width="100px">
        <el-form-item label="联系人姓名" prop="contactName" class="form-half">
          <el-input v-model="formData.contactName"></el-input>
        </el-form-item>
        <el-form-item label="联系人职务" prop="contactPosition" class="form-half">
          <el-input v-model="formData.contactPosition"></el-input>
        </el-form-item>
        <el-form-item label="电话" prop="telephoneNo" class="form-half">
          <el-input v-model="formData.telephoneNo"></el-input>
        </el-form-item>
        <el-form-item label="对应客户" prop="clientName" class="form-half">
          <span class="tags" v-for="(item,index) in formData.clientInfos" :key="index">{{item.clientName}}</span>
          <el-button class="btn" size="small" @click="addContact" icon="el-icon-plus"></el-button>
        </el-form-item>
        <el-form-item label="手机" prop="cellphone" class="form-half">
          <el-input v-model="formData.cellphone"></el-input>
        </el-form-item>
        <el-form-item label="传真" prop="fax" class="form-half">
          <el-input v-model="formData.fax"></el-input>
        </el-form-item>
        <el-form-item label="QQ" prop="qq" class="form-half">
          <el-input v-model="formData.qq"></el-input>
        </el-form-item>
        <el-form-item label="微信" prop="wechat" class="form-half">
          <el-input v-model="formData.wechat"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email" class="form-half">
          <el-input v-model="formData.email"></el-input>
        </el-form-item>
        <el-form-item label="地址" prop="address" class="form-half">
          <el-input v-model="formData.address"></el-input>
        </el-form-item>
        <el-form-item label="客户关注" prop="clientConcern" class="form-half">
          <el-input v-model="formData.clientConcern"></el-input>
        </el-form-item>
        <el-form-item label="其他" prop="other" class="form-half">
          <el-input v-model="formData.other"></el-input>
        </el-form-item>
      </el-form>
    </el-card>
    <el-dialog title="添加对应客户" :visible.sync="dialogVisible" width="50%">
      <avue-crud :data="pagedTable" :option="option" :page="page" @size-change="handleSizeChange" @current-change="handleCurrentChange" @selection-change="selectionChange">
      </avue-crud>
      <div class="btn">
        <el-button @click="dialogVisible = false" size="small">取 消</el-button>
        <el-button type="primary" @click="handlequery" size="small">确 定</el-button>
      </div>
    </el-dialog>
    <footer-tool-bar>
      <iep-button type="info" @click="handleGoBack">返回</iep-button>
      <iep-button type="primary " @click="submitForm('formName')">提交</iep-button>
    </footer-tool-bar>
  </div>
</template>
<script>
import { initForm, rules } from '../options'
import FooterToolBar from '@/components/FooterToolbar'
import { updateData } from '@/api/crms/contact'
import { fetchList } from '@/api/crms/custom'
import { mergeByFirst } from '@/util/util'
import mixins from '@/mixins/mixins'
export default {
  mixins: [mixins],
  components: { FooterToolBar },
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
        // menuAlign: 'center',
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
          // {
          //   label: '操作',
          //   prop: 'menu',
          //   solt: true,
          //   align: 'center',
          // },
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
      this.formRequestFn(this.id).then(({ data }) => {
        this.formData = mergeByFirst(initForm(), data.data)
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
    selectionChange (row) {
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
          updateData(this.formData).then(() => {
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
<style lang="scss" scoped>
.edit-wrapper {
  margin: 5px 5px 50px 5px;
  .form-half {
    width: 50%;
    display: inline-block;
  }
  .edit-card {
    .title {
      font-weight: 600;
    }
  }
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
  margin-left: 20px;
  text-align: right;
}
.input {
  width: 200px;
}
</style>
