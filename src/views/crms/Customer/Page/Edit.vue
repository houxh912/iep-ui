<template>
  <div>
    <basic-container>
      <iep-page-header :title="`${methodName}客户`" :backOption="backOption"></iep-page-header>
      <div class="edit-wrapper">
        <el-form :model="formData" size="small" :rules="rules" ref="formName" label-width="120px" @validate='validate'>
          <el-row>
            <el-col :span='10'>
              <el-form-item prop="clientName">
                <span slot="label">
                  客户名称
                  <iep-tip :content="tipContent.clientName"></iep-tip>
                  :
                </span>
                <el-input v-model="formData.clientName" placeholder="客户名称至少6个字" ref="clientName"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span='10' :offset="4">
              <el-form-item label="客户简称:" prop="clientAbrName">
                <el-input v-model="formData.clientAbrName"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span='10'>
              <el-form-item label="原机构名:" prop="orgNameForOld">
                <el-input v-model="formData.orgNameForOld"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span='10' :offset="4">
              <el-form-item label="负责部门:" prop="iepClientRespDept">
                <iep-dept-select v-model="formData.iepClientRespDept"></iep-dept-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span='10'>
              <el-form-item prop="districtType">
                <span slot="label">
                  区域类型
                  <iep-tip :content="tipContent.districtType"></iep-tip>
                  :
                </span>
                <iep-dict-select v-model="formData.districtType" dict-name="crms_district_type"></iep-dict-select>
              </el-form-item>
            </el-col>
            <el-col :span='10' :offset="4">
              <el-form-item label="市场经理:" prop="Manager">
                {{this.Claim == true?'':formData.Manager}}
              </el-form-item>
            </el-col>
          </el-row>
          <el-form-item prop="companyUrl">
            <span slot='label'>
              客户描述
              <iep-tip :content="tipContent.companyUrl"></iep-tip>
              :
            </span>
            <el-input v-model="formData.companyUrl" placeholder="请务必准确填写客户单位网址，如http://www.123456.com"></el-input>
          </el-form-item>
          <el-form-item label="" prop="companyFunction">
            <el-input type="textarea" v-model="formData.companyFunction" placeholder="请务必分行简明扼要罗列单位各项职能"></el-input>
          </el-form-item>
          <el-form-item label="" prop="contractAddress">
            <el-input v-model="formData.contractAddress" placeholder="请务必详细填写客户联系地址，精确到XX路XX号XX室"></el-input>
          </el-form-item>
          <el-form-item label="" prop="otherDesc">
            <el-input type="textarea" v-model="formData.otherDesc" placeholder="如有客户内部管理/关系问题等可做简要说明"></el-input>
          </el-form-item>
          <el-form-item label="客户类型：" prop="clientTypeKey">
            <span slot="label">
              客户类型
              <iep-tip :content="tipContent.clientTypeKey"></iep-tip>
              :
            </span>
            <el-checkbox-group v-model="formData.clientTypeKey">
              <el-checkbox v-for="item in dictGroup['crms_client_type']" :key="item.value" :label="item.value" name="leixing">{{item.label}}</el-checkbox>
            </el-checkbox-group>
          </el-form-item>
          <el-form-item label="客户关系：" prop="clientRela">
            <span slot="label">
              客户关系
              <iep-tip :content="tipContent.clientRela"></iep-tip>
              :
            </span>
            <iep-dict-select v-model="formData.clientRela" dict-name="crms_client_relation"></iep-dict-select>
          </el-form-item>
          <el-form-item label="客户标签：" prop="tags">
            <span slot="label">
              客户标签
              <iep-tip :content="tipContent.tags"></iep-tip>
              :
            </span>
            <iep-tag v-model="formData.tags"></iep-tag>
          </el-form-item>
          <el-form-item label="协助人：" prop="collaborationsKey" v-if="formData.collaborations.length != 0">
            <a-tag :key="tag.commonId" v-for="tag in formData.collaborations" closable :disable-transitions="false" @close="handleClose(tag)">
              {{tag.commonName}}
            </a-tag>
          </el-form-item>
          <el-form-item label="放入公海：">
            <el-switch v-model="Claim" active-color="#13ce66" active-text="是" inactive-text="否">
            </el-switch>
          </el-form-item>
          <el-form-item label="开放范围：" prop="isOpen">
            <el-radio-group v-model="formData.isOpen">
              <el-radio :label="3">对联盟开放</el-radio>
              <el-radio :label="2">对组织开放</el-radio>
              <el-radio :label="0">生态开放</el-radio>
              <el-radio :label="1">关闭</el-radio>
            </el-radio-group>
          </el-form-item>
          <!-- <el-form-item label="跟进状态:" prop="followUpStatus">
            <iep-dict-select v-model="formData.followUpStatus" dict-name="crms_follow_up_status"></iep-dict-select>
          </el-form-item> -->

          <!-- <el-form-item label="相关产品：" prop="products">
          <iep-button size="small" @click="selectProduct"><i class="el-icon-plus"></i></iep-button>
          <el-col class="col-item">内网2.0改造项目 <i class="el-icon-close"></i></el-col>
          <el-col class="col-item">内网2.0改造项目 <i class="el-icon-close"></i></el-col>
        </el-form-item>
        <el-form-item label="相关方案：" prop="scheme">
          <iep-button size="small" @click="selectProgramme"><i class="el-icon-plus"></i></iep-button>
          <el-col class="col-item">20180909建设银行智慧城市支持项目方案 <i class="el-icon-close"></i></el-col>
          <el-col class="col-item">20180909建设银行智慧城市支持项目方案 <i class="el-icon-close"></i></el-col>
          <el-col class="col-item">20180909建设银行智慧城市支持项目方案 <i class="el-icon-close"></i></el-col>
        </el-form-item> -->
        </el-form>
      </div>
      <footer-tool-bar>
        <iep-button type="primary" @click="submitForm('formName')">保存</iep-button>
        <iep-button plain @click="close" v-if="id">取消</iep-button>
        <iep-button plain @click="handleGoContact('formName')" v-if="id==''">保存并新增联系人</iep-button>
      </footer-tool-bar>
    </basic-container>
  </div>
</template>
<script>
import { initForm } from '../options'
import { getCustomerById } from '@/api/crms/customer'
import { notificationCreate } from '@/api/fams/investment'
import { mapGetters } from 'vuex'
import { createById } from '@/api/crms/business'
import { getObj } from '@/api/admin/user'
import { checkName } from '@/api/crms/customer'
// import businessType from './businessType'
const tipContent = {
  clientName: '客户名称精确到局办且为全称， 如：“北京市行政服务中心”',
  districtType: '部委：指中华人民共和国国务院下属的各部和各委员会，如发改委，国家信访局;<br>省级：省级国家机构所创立/ 负责管理或直属省政府领导和管理的行政单位, 如省发展改革委员会;<br>市级：市级国家机构负责管理或直属市政府领导和管理的行政单位, 如舟山市委组织部;<br>区级：属于市辖区下行政区单位，如舟山市定海区组织部；<br>园区：当地人民政府集中统一规划指定区域，如高新园区；<br>企业：以营利为目的，实行自主经营，自负盈亏，独立核算的法人或其他社会组织，如阿里巴巴；<br>其他：行业协会等。',
  clientRela: '核心客户：连续合作5年及以上、百万级项目、用软件/产品客户、数据服务客户、业务体系创新（标杆客户） <br/>;' +
    '重要客户：五十万以上项目、连续合作2年以上、每年有固定财政预算客户; <br/>' +
    '一般客户：有合作项目; <br/>' +
    '潜在客户：有意向的客户; <br/>' +
    '其它客户：目前无意向客户;',
  businessTypeKey: '咨询：规划/行动计划/工作方案/课题研究/标准规范/管理制度/整体解决方案/评测;<br>产品：DNA/DIPS/营商通/咨询服务产品化;<br>数据：数据采集/普查/编目/标准化/开放共享/应用服务/主题库、基础库建设/事项材料梳理/主题清单规范优化、再造;<br>外包：软件/平台/服务;<br>会议培训：研讨会/招商合作/培训会;<br>平台：平台新建/平台升级;<br>技术服务：网站/平台/软件;<br>其他：自定义填写;',
  tags: '1、客户标签要与客户所处行业，合作项目/产品关联，其中合作项目简称，合作产品，客户简称等必须作为标签;<br>2、标签次序按照重要性排序。',
  companyUrl: '1、单位网址：请务必准确填写客户单位网址，如http://www.123456.com;<br>2、单位职能：请务必分行简明扼要罗列单位各项职能;<br>3、联系地址：请务必详细填写客户联系地址，精确到XX路XX号XX室;<br>4、其他说明：如有客户内部管理/关系问题等可做简要说明。',
  clientTypeKey: '客户：与我公司有合作可能或已合作单位/机构/企业;<br>战略合作伙伴：为已签订战略合同的客户。',
}
export default {
  // components: { businessType },
  name: 'edit',
  props: {
    record: {
      type: Object,
      default: () => { },
    },
  },
  data () {
    var validateFun = (rule, value, callback) => {
      let val = value.replace(/(^\s*)|(\s*$)/g, '')
      if (!val) {
        return callback(new Error('客户名称不能为空'))
      } else {
        if (this.flagName == this.formData.clientName) {
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
    // var deptFun = (rule, value, callback) => {
    //   if (value.id == '') {
    //     callback(new Error('请选择负责部门'))
    //   } else {
    //     callback()
    //   }
    // }
    return {
      tipContent,
      id: '',
      Claim: false,
      backOption: {
        isBack: true,
        backPath: null,
        backFunction: () => {
          if (this.flag) {
            this.$router.push({
              path: '/crms/business',
              query: {
                flag: true,
                type: '3',
              },
            })
          } else {
            this.$emit('onGoBack')
          }
        },
      },
      rules: {
        clientName: [
          { required: true, validator: validateFun, trigger: 'blur' },
        ],
        // iepClientRespDept: [
        //   { required: true, validator: deptFun, trigger: 'change' },
        // ],
        phoneNumber: [
          { required: true, message: '请输入手机号码', trigger: 'blur' },
          { min: 11, max: 11, message: '手机位数为11位', trigger: 'blur' },
        ],
        clientAbrName: [
          { max: 100, message: '长度不超过100个字符', trigger: 'blur' },
        ],
        districtType: [
          { required: true, message: '请选择区域类型', trigger: 'blur' },
        ],
        companyFunction: [
          { message: '请填写单位职能', trigger: 'blur' },
          { max: 255, message: '长度不超过255个字符', trigger: 'blur' },
        ],
        contractAddress: [
          { message: '请填写单位地址', trigger: 'blur' },
          { max: 255, message: '长度不超过255个字符', trigger: 'blur' },
        ],
        orgNameForOld: [
          { max: 100, message: '长度不超过100个字符', trigger: 'blur' },
        ],
        otherDesc: [
          { message: '请填写其他说明', trigger: 'blur' },
          { max: 255, message: '长度不超过255个字符', trigger: 'blur' },
        ],
        clientTypeKey: [
          { required: true, message: '请选择客户类型', trigger: 'blur' },
        ],
        companyUrl: [
          { max: 255, message: '长度不超过255个字符', trigger: 'blur' },
        ],
        businessTypeKey: [
          { required: true, message: '请选择业务类型', trigger: 'blur' },
        ],
        specificBusinessType: [
          { required: true, message: '请填写具体业务类型', trigger: 'blur' },
          { max: 50, message: '长度不超过50个字符', trigger: 'blur' },
        ],
        clientRela: [{ required: true, message: '请选择客户关系', trigger: 'blur' }],
        tags: [{ required: true, message: '请添加客户标签', trigger: 'blur' }],
        followUpStatus: [
          { required: true, message: '请选择跟进状态', trigger: 'blur' },
        ],
      },
      flag: false,
      data: '',
      flagName: '',
      methodName: '',
      formRequestFn: () => { },
      formData: initForm(),
      clientId: '',
      type: '',

      businessType: [
        { name: '咨询：规划/行动计划/工作方案/课题研究/标准规范/管理制度/整体解决方案/评测' },
        { name: '产品：DNA/DIPS/营商通/咨询服务产品化' },
        { name: '数据：数据采集/普查/编目/标准化/开放共享/应用服务/主题库、基础库建设/事项材料梳理/主题清单规范优化、再造' },
        { name: '外包：软件/平台/服务' },
        { name: '会议培训：研讨会/招商合作/培训会' },
        { name: '平台：平台新建/平台升级' },
        { name: '技术服务：网站/平台/软件' },
        { name: '其他：自定义填写' },
      ],


    }
  },
  created () {
    this.formData.Manager = this.userInfo.realName
    this.formData.marketManager = this.userInfo.userId
    this.flagName = this.record.flagName
    this.type = this.record.type
    this.methodName = this.record.methodName
    this.formRequestFn = this.record.formRequestFn
    this.id = this.record.id
    if (this.record.flag) {
      this.flag = this.record.flag
      this.data = this.record.data
    }
    if (this.id) {
      getCustomerById(this.id).then(({ data }) => {
        this.formData = this.$mergeByFirst(initForm(), data.data)
        this.formData.clientTypeKey = data.data.clientTypeKey.map(m => m.commonId)
        this.formData.districtType = data.data.districtTypeKey
        this.formData.followUpStatus = data.data.followUpStatusKey
        this.formData.clientRela = data.data.clientRelaKey
        this.formData.tags = data.data.tags.map(m => (m.commonName))
        this.formData.collaborations = data.data.collaborations
        getObj(data.data.marketManager).then(res => {
          this.formData.Manager = res.data.data.realName
        })
        if (this.formData.marketManager == 0) {
          this.Claim = true
        } else {
          this.Claim = false
        }
      })
    } else if (this.flag) {
      this.formData.clientName = this.data.clientName
      this.formData.tags = this.data.tags.map(m => (m.commonName))
    }
  },
  computed: {
    ...mapGetters([
      'userInfo',
      'dictGroup',
    ]),
  },
  methods: {
    handleTag () {
      this.$message('添加标签')
    },
    handleGoContact (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.formRequestFn((this.formData)).then(({ data }) => {
            //验证联盟下客户是否存在，如果存在若还要保存再次调用接口
            let str = data.msg
            let res = str.substr(str.length - 1, 1)
            if (res == '？') {
              this.$confirm(str, '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning',
              }).then(() => {
                this.formData.assertionsSave = 2
                this.formRequestFn((this.formData)).then(({ data }) => {
                  if (data.data) {
                    this.$message({
                      message: `客户${this.methodName}成功`,
                      type: 'success',
                    })
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
                        this.$emit('onGoBack')
                      })
                    }
                    if (!this.flag) {
                      this.$emit('onGoBack')
                    }
                  }
                })
              })
            }
            //名字不重复
            if (data.data) {
              this.$message({
                message: `客户${this.methodName}成功`,
                type: 'success',
              })
              this.$emit('onGoBack')
              this.$emit('showDrawer', data.data)
            }
          })
        } else {
          return false
        }
      })
    },
    load () {
      getCustomerById(this.record.id).then(({ data }) => {
        this.formData = this.$mergeByFirst(initForm(), data.data)
      })
    },
    submitForm (formName) {
      if (this.Claim) {
        this.formData.toClaim = 1
      } else {
        this.formData.toClaim = 0
      }
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.formRequestFn((this.formData)).then(({ data }) => {
            //验证联盟下客户是否存在，如果存在若还要保存再次调用接口
            let str = data.msg
            let res = str.substr(str.length - 1, 1)
            if (res == '？') {
              this.$confirm(str, '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning',
              }).then(() => {
                this.formData.assertionsSave = 2
                this.formRequestFn((this.formData)).then(({ data }) => {
                  if (data.data) {
                    this.$message({
                      message: `客户${this.methodName}成功`,
                      type: 'success',
                    })
                    if (this.methodName == '新增') {
                      if (this.formData.clientTypeKey.includes('0')) {
                        let form = {
                          content: this.userInfo.orgName + '与' + this.formData.clientName + '客户成立了战略合作伙伴关系',
                          orgId: this.userInfo.orgId,
                        }
                        notificationCreate({ list: [form] })
                      }
                    }
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
                        this.$emit('onGoBack')
                      })
                    }
                    if (!this.flag) {
                      this.$emit('onGoBack')
                    }
                  }
                })
              })
            }
            //名字不重复
            if (data.data) {
              this.$message({
                message: `客户${this.methodName}成功`,
                type: 'success',
              })
              if (this.methodName == '新增') {
                if (this.formData.clientTypeKey.includes('0')) {
                  let form = {
                    content: this.userInfo.orgName + '与' + this.formData.clientName + '客户成立了战略合作伙伴关系',
                    orgId: this.userInfo.orgId,
                  }
                  notificationCreate({ list: [form] })
                }
              }
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
                  this.$emit('onGoBack')
                })
              }
              if (!this.flag) {
                this.$emit('onGoBack')
              }
            }
          })
        } else {
          return false
        }
      })
    },
    handleClose (tag) {
      this.formData.collaborations.splice(this.formData.collaborations.indexOf(tag), 1)
    },
    close () {
      this.formData = initForm()
      this.$emit('onGoBack')
    },
    validate (a, b) {
      // console.log(a, b, this.$refs[a])
      if (!b) {
        this.$refs[a].focus()

      }
    },
  },
}
</script>

<style scoped>
.edit-wrapper {
  padding-bottom: 50px;
}
</style>
