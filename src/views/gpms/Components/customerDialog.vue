<template>
  <iep-dialog :dialog-show="dialogShow" title="新增客户" width="520px" @close="close">
    <el-form ref="form" :model="form" :rules="rules" size="small" label-width="120px">
      <el-form-item prop="clientName">
        <span slot="label">
          客户名称
          <iep-tip :content="tipContent.clientName"></iep-tip>
          :
        </span>
        <el-input v-model="form.clientName" placeholder="客户名称至少6个字" ref="clientName"></el-input>
      </el-form-item>
      <el-form-item prop="districtType">
        <span slot="label">
          区域类型
          <iep-tip :content="tipContent.districtType"></iep-tip>
          :
        </span>
        <iep-dict-select v-model="form.districtType" dict-name="crms_district_type"></iep-dict-select>
      </el-form-item>
      <el-form-item label="客户类型：" prop="clientTypeKey">
        <span slot="label">
          客户类型
          <iep-tip :content="tipContent.clientTypeKey"></iep-tip>
          :
        </span>
        <el-checkbox-group v-model="form.clientTypeKey">
          <el-checkbox v-for="item in dictGroup['crms_client_type']" :key="item.value" :label="item.value" name="leixing">{{item.label}}</el-checkbox>
        </el-checkbox-group>
      </el-form-item>
      <el-form-item label="客户关系：" prop="clientRela">
        <span slot="label">
          客户关系
          <iep-tip :content="tipContent.clientRela"></iep-tip>
          :
        </span>
        <iep-dict-select v-model="form.clientRela" dict-name="crms_client_relation"></iep-dict-select>
      </el-form-item>
      <el-form-item label="客户标签：" prop="tags">
        <span slot="label">
          客户标签
          <iep-tip :content="tipContent.tags"></iep-tip>
          :
        </span>
        <iep-tag v-model="form.tags"></iep-tag>
      </el-form-item>
    </el-form>
    <template slot="footer">
      <iep-button type="primary" @click="submitForm('formName')">确认</iep-button>
      <iep-button @click="close">取消</iep-button>
    </template>
  </iep-dialog>
</template>

<script>
import { mapState, mapMutations, mapGetters } from 'vuex'
import { createById } from '@/api/crms/business'
import { checkName, postCustomer } from '@/api/crms/customer'
const tipContent = {
  clientName: '客户名称精确到局办且为全称， 如：“北京市行政服务中心”',
  districtType: '部委：指中华人民共和国国务院下属的各部和各委员会，如发改委，国家信访局;<br>省级：省级国家机构所创立/ 负责管理或直属省政府领导和管理的行政单位, 如省发展改革委员会;<br>市级：市级国家机构负责管理或直属市政府领导和管理的行政单位, 如舟山市委组织部;<br>区级：属于市辖区下行政区单位，如舟山市定海区组织部；<br>园区：当地人民政府集中统一规划指定区域，如高新园区；<br>企业：以营利为目的，实行自主经营，自负盈亏，独立核算的法人或其他社会组织，如阿里巴巴；<br>其他：行业协会等。',
  clientRela: '核心客户：连续合作5年及以上、百万级项目、用软件/产品客户、数据服务客户、业务体系创新（标杆客户） <br/>;' +
    '重要客户：五十万以上项目、连续合作2年以上、每年有固定财政预算客户; <br/>' +
    '一般客户：有合作项目; <br/>' +
    '潜在客户：有意向的客户; <br/>' +
    '其它客户：目前无意向客户;',
  tags: '1、客户标签要与客户所处行业，合作项目/产品关联，其中合作项目简称，合作产品，客户简称等必须作为标签;<br>2、标签次序按照重要性排序。',
  clientTypeKey: '客户：与我公司有合作可能或已合作单位/机构/企业;<br>战略合作伙伴：为已签订战略合同的客户。',
}
function initForm () {
  return {
    clientName: '',
    districtType: '',
    clientTypeKey: [],
    clientRela: '',
    tags: [],
    assertionsSave: 0,
    toClaim: 0,
    marketManager: '', // 市场经理
    Manager: '',
  }
}

export default {
  name: 'RewardDialog',
  data () {
    var validateFun = (rule, value, callback) => {
      let val = value.replace(/(^\s*)|(\s*$)/g, '')
      if (!val) {
        return callback(new Error('客户名称不能为空'))
      } else {
        if (this.flagName == this.form.clientName) {
          callback()
          return false
        }
        if (value.length < 6 || value.length > 50) {
          callback(new Error('客户名称在6至50个字符之间'))
          return false
        } else {
          checkName({ clientName: val }).then(res => {
            if (!res.data.data) {
              callback(new Error('您输入的客户名称已存在，请重新输入！'))
            } else {
              callback()
            }
          })
        }
      }
    }
    return {
      form: initForm(),
      tipContent,
      rules: {
        clientName: [
          { required: true, validator: validateFun, trigger: 'blur' },
        ],
        districtType: [
          { required: true, message: '请选择区域类型', trigger: 'blur' },
        ],
        clientTypeKey: [
          { required: true, message: '请选择客户类型', trigger: 'blur' },
        ],
        clientRela: [{ required: true, message: '请选择客户关系', trigger: 'blur' }],
        tags: [{ required: true, message: '请添加客户标签', trigger: 'blur' }],
      },
    }
  },
  computed: {
    ...mapState({
      dialogShow: state => state.gpms.customerDialogShow,
    }),
    ...mapGetters([
      'dictGroup',
      'userInfo',
    ]),
  },
  methods: {
    ...mapMutations({
      setCustomerDialogShow: 'SET_CUSTOMER_DIALOG_SHOW',
    }),
    submitForm () {
      this.form.Manager = this.userInfo.realName
      this.form.marketManager = this.userInfo.userId
      this.$refs['form'].validate((valid) => {
        if (valid) {
          postCustomer((this.form)).then(({ data }) => {
            //验证联盟下客户是否存在，如果存在若还要保存再次调用接口
            let str = data.msg
            let res = str.substr(str.length - 1, 1)
            if (res == '？') {
              this.$confirm(str, '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning',
              }).then(() => {
                this.form.assertionsSave = 2
                postCustomer((this.form)).then(({ data }) => {
                  if (data.data) {
                    this.$message({
                      message: '新增客户成功',
                      type: 'success',
                    })
                    this.setCustomerDialogShow(false)
                    if (this.flag) {
                      createById({ iepOpportunityInputId: this.record.data.opportunityId }).then(() => {
                      })
                      this.$confirm('创建客户成功！', '提示', {
                        confirmButtonText: '返回商机',
                        cancelButtonText: '留在客户',
                        type: 'success',
                      }).then(() => {
                        this.$router.push({
                          path: '/crms/business',
                          query: {
                            flag: true,
                            type: '3',
                          },
                        })
                      }).catch(() => {
                        this.setCustomerDialogShow(false)
                      })
                    }
                    if (!this.flag) {
                      this.setCustomerDialogShow(false)
                    }
                  }
                })
              })
            }
            //名字不重复
            if (data.data) {
              this.$message({
                message: '新增客户成功',
                type: 'success',
              })
              this.setCustomerDialogShow(false)
            }
          })
        } else {
          return false
        }
      })
    },
    close () {
      this.form = initForm()
      this.setCustomerDialogShow(false)
    },
    validate (a, b) {
      // console.log(a, b, this.$refs[a])
      if (!b) {
        this.$refs[a].focus()

      }
    },
  },
  watch: {
    dialogShow (newVal) {
      if (newVal) {
        // this.form.targetUser = this.person
      }
    },
  },
}
</script>

<style lang="scss" scoped>
h3 {
  text-align: center;
  margin-bottom: 20px;
}
</style>
