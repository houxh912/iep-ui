<template>
  <div class="contacts">
    <el-table
     :data="tableData">
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
    <div class="add-contacts" @click="created"><i class="el-icon-plus"></i> 添加联系人</div>

    <iep-dialog :dialog-show="dialogShow" :title="`${methodName}联系人`" width="60%" @close="resetForm">
      <el-form :model="formData" :rules="rules" ref="form" label-width="100px">
        <el-row>
          <el-col :span=12>
            <el-form-item label="联系人姓名：" prop="name">
              <el-input v-model="formData.name"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span=12>
            <el-form-item label="联系人职务：" prop="zhiwu">
              <el-input v-model="formData.zhiwu"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item label="电话：" prop="phone">
          <el-input v-model="formData.phone"></el-input>
        </el-form-item>
        <el-row>
          <el-col :span=12>
            <el-form-item label="区域类型：" prop="type">
              <el-select v-model="formData.type" placeholder="请选择">
                <el-option v-for="item in dicData.select" :key="item.value" :label="item.label" :value="item.value"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span=12>
            <el-form-item label="手机：" prop="tel">
              <el-input v-model="formData.tel"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span=12>
            <el-form-item label="传真：" prop="chuanzhen">
              <el-input v-model="formData.chuanzhen"></el-input>
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
            <el-form-item label="微信：" prop="weixin">
              <el-input v-model="formData.weixin"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span=12>
            <el-form-item label="邮箱：" prop="youxiang">
              <el-input v-model="formData.youxiang"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item label="地址：" prop="dizhi">
          <el-input v-model="formData.dizhi"></el-input>
        </el-form-item>
        <el-form-item label="客户关注：" prop="guanzhu">
          <el-input type="textarea" v-model="formData.guanzhu"></el-input>
        </el-form-item>
        <el-form-item label="其他：" prop="qita">
          <el-input type="textarea" v-model="formData.qita"></el-input>
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
import mixins from '@/mixins/mixins'
export default {
  name: 'contacts',
  mixins: [ mixins ],
  components: { IepDialog },
  data () {
    return {
      isLoadTable: false,
      tableData: [
        { id:1, name: '马云' },
        { id:2, name: '丁磊' },
        { id:3, name: '马化腾' },
      ],
      columnsMap: [
        { label: '联系人姓名', prop: 'name' },
        { label: '联系人职务', prop: 'zhiwu' },
        { label: '关联职务', prop: 'guanlian' },
        { label: '电话', prop: 'tel' },
      ],
      formData: {},
      rules: {},
      methodName: '',
      dialogShow: false,
      dicData: [
        { value: 1, label: '选项1' },
        { value: 2, label: '选项2' },
      ],
    }
  },
  methods: {
    loadPage () {
    },
    created () {
      this.dialogShow = true
      this.methodName = '新增'
    },
    handleEdit () {
      this.dialogShow = true
      this.methodName = '编辑'
    },
    handleDeleteById (row) {
      let delFn = () => {
        return {
          then: () => {
            this.$message.success('删除成功！')
          },
        }
      }
      this._handleGlobalDeleteById(row.id, delFn)
    },
    resetForm () {
      this.formData = initContactForm()
      this.dialogShow = false
    },
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.formRequestFn(this.formData).then(() => {
            this.$notify({
              title: '成功',
              message: `${this.methodName}成功`,
              type: 'success',
              duration: 2000,
            })
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
