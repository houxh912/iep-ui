<template>
  <div class="edit-wrapper">
    <basic-container>
      <iep-page-header :title="`${methodName}联系人`"></iep-page-header>
      <el-form :model="formData" :rules="rules" ref="formName" label-width="130px" size="small" class="form-detail">
        <el-row>
          <el-col :span="12">
            <el-form-item prop="contactName">
              <span slot="label">
                联系人姓名
                <iep-tip :content="tipContent.contactName"></iep-tip>
                :
              </span>
              <el-input v-model.trim="formData.contactName"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item prop="contactPosition">
              <span slot="label">
                联系人职务
                <iep-tip :content="tipContent.contactPosition"></iep-tip>
                :
              </span>
              <el-input v-model.trim="formData.contactPosition"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="电话：" prop="telephoneNo">
              <el-input v-model="formData.telephoneNo" placeholder="座机（区号+号码）（多个号码空格隔开）"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item prop="clientIds">
              <span slot="label">
                对应客户
                <iep-tip :content="tipContent.clientInfos"></iep-tip>
                :
              </span>
              <!-- <el-tag v-for="(item,index) in formData.clientInfos" :key="index" closable @close="handleClose(item)">
                {{item.clientName}}
              </el-tag>
              <el-button size="small" @click="addContact" icon="el-icon-plus"></el-button> -->
              <IepCrmsSelectMultiple v-model="formData.clientIds" :option="formData.clientInfos" prefixUrl="crm/customer/page/list"></IepCrmsSelectMultiple>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="手机：" prop="cellphone">
              <el-input v-model="formData.cellphone" placeholder="常用手机号码（多个号码空格隔开）"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="传真：" prop="fax">
              <el-input v-model="formData.fax" placeholder="区号+号码"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="QQ：" prop="qq">
              <el-input v-model="formData.qq" placeholder="QQ号码"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="微信：" prop="wechat">
              <el-input v-model="formData.wechat" placeholder="微信"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="邮箱：" prop="email">
              <el-input v-model="formData.email" placeholder="常用邮箱"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="地址：" prop="address">
              <el-input v-model="formData.address" placeholder="详细地址"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item prop="clientConcern">
              <span slot="label">
                客户关注
                <iep-tip :content="tipContent.clientConcern"></iep-tip>
                :
              </span>
              <el-input v-model="formData.clientConcern"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="其他：" prop="other">
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
    <el-dialog title="添加对应客户" :visible.sync="dialogVisible" width="40%">
      <div class="bottom">
        <el-input placeholder="请输入客户姓名" v-model="clientName" size="mini" :maxlength="20">
          <template slot="append">
            <div class="search" @click="search">
              搜索
            </div>
          </template>
        </el-input>
      </div>
      <!-- <avue-crud :data="pagedTable" :option="option" :page="page" @size-change="handleSizeChange" @current-change="handleCurrentChange" @selection-change="handleSelectionChange">
      </avue-crud> -->
      <iep-table :pagination="pagination" :pagedTable="pagedTable" @size-change="handleSizeChange" :isLoadTable="isLoadTable" :columnsMap="columnsMap" @selection-change="handleSelectionChange" :isMutipleSelection="true" @current-change="handleCurrentChange"></iep-table>
      <div class="btn">
        <iep-button class="cancel" @click="dialogVisible = false">取 消</iep-button>
        <iep-button type="primary" @click="handlequery">添加</iep-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import mixins from '@/mixins/mixins'
import { initForm, rules } from '../options'
import { getContactById } from '@/api/crms/contact'
import { getPageData } from '@/api/crms/customer'
const tipContent = {
  contactName: '请务必填写真实联系人姓名，与⾝份证信息⼀致，切记出现张主任等',
  clientInfos: '请务必准确关联该联系人对应的单位/企业',
  contactPosition: '请务必准确填写该联系人在其单位/企业所担任的职务',
  clientConcern: '请简明扼要说明该联系人对合作中所关注的方面，如项目进度管理',
}
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
      tipContent,
      clientName: '',
      dialogShow: false,
      formRequestFn: () => { },
      methodName: '创建',
      formData: initForm(),
      rules,
      Checklist: false,
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
          // {
          //   label: '市场经理',
          //   prop: 'marketManagerName',
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
    columnsMap () {
      return [{ label: '客户名称', prop: 'clientName' }]
    },
  },
  created () {
    this.methodName = this.record.methodName
    this.formRequestFn = this.record.formRequestFn
    this.id = this.record.id
    if (this.id) {
      getContactById(this.id).then(({ data }) => {
        let form = this.$mergeByFirst(initForm(), data.data)
        form.clientIds = form.clientInfos.map(m => m.clientId)
        form.clientInfos = form.clientInfos.map(m => { return { id: m.clientId, name: m.clientName, clientId: m.clientId, clientName: m.clientName } })
        this.formData = { ...form }
      })
    }
  },

  methods: {
    handleClose (val) {
      this.formData.clientInfos.splice(this.formData.clientInfos.indexOf(val), 1)
    },
    addContact () {
      this.pageOption.current = 1
      this.clientName = ''
      this.dialogVisible = true
      this.loadPage()
    },
    loadPage () {
      this.loadTable({ clientName: this.clientName, clientContactId: this.record.id }, getPageData)
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
      this.formData.clientIds = row.map(m => m.clientId)
      this.selectData = row
      this.Checklist = true
    },
    handlequery () {
      if (this.Checklist && this.formData.clientIds.length > 0) {
        this.dialogVisible = false
        for (var i = 0; i < this.selectData.length; i++) {
          this.formData.clientInfos.push(this.selectData[i])
        }
        let result = {}
        let finalResult = []
        for (let i = 0; i < this.formData.clientInfos.length; i++) {
          result[this.formData.clientInfos[i].clientName] = this.formData.clientInfos[i]
        }
        for (var item in result) {
          finalResult.push(result[item])
        }
        this.formData.clientInfos = finalResult
      } else {
        this.$message('请勾选需要添加的对应客户')
      }
    },
    search () {
      this.loadPage()
    },
    submitForm (formName) {
      // this.formData.clientIds = this.formData.clientInfos.map(m => m.clientId)
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.formRequestFn(this.formData).then(() => {
            this.$message({
              message: `${this.methodName}成功`,
              type: 'success',
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
  margin-top: 0;
}
.search {
  cursor: pointer;
}
.el-tag {
  margin-right: 5px;
}
.bottom {
  margin-bottom: 10px;
}
</style>

