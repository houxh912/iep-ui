<template>
  <el-form :model="formData" label-width="120px" ref="form" :rules="rules" :class="isReadonly ? 'readonly-form' : ''">
    <el-form-item label="红包简介" prop="description">
      <el-input v-model="formData.description" maxlength="255" :readonly="isReadonly" clearable></el-input>
    </el-form-item>

    <el-form-item label="关联政策">
      <div class="policyList">
        <el-tag type="info" v-for="item in formData.relationList" :key="item.value" :label="item.label" closable :disable-transitions="false" @close="handleClose(item)">{{item.title}}</el-tag>
        <el-button class="open" type="primary" icon="el-icon-edit" circle @click="getPolicyList"></el-button>
      </div>

    </el-form-item>

    <div class="policy-container" v-if="show">
      <collapse-form ref="collapseForm" @clear="formInline=initFormInline()" @search="search()">
        <template slot="search-header">
          <el-form-item label="政策标题:">
            <el-input placeholder="请输入政策标题" v-model.trim="formInline.title" clearable></el-input>
          </el-form-item>
        </template>
        <template slot="search-body">
          <el-form-item label="发布时间">
            <el-date-picker v-model="formInline.startTime" type="date" value-format="yyyy-MM-dd" placeholder="开始日期" class="block" clearable></el-date-picker> —
            <el-date-picker v-model="formInline.endTime" type="date" value-format="yyyy-MM-dd" placeholder="结束日期" class="block" clearable></el-date-picker>
          </el-form-item>
          <el-form-item label="政策类型" class="selectinput">
            <el-select v-model="policytype" placeholder="请选择">
              <el-option v-for="item in policyTypeList" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="主题" class="selectinput">
            <el-select v-model="formInline.theme" placeholder="请选择" clearable>
              <el-option v-for="item in themeList" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="适用行业" class="selectinput">
            <el-select v-model="formInline.industry" placeholder="请选择" clearable>
              <el-option v-for="item in industryList" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="地域" class="selectinput">
            <el-cascader :options="options" :props="regionProps" v-model="formInline.regionList" ref="region" clearable change-on-select @visible-change="handleVisibleChange($event)"></el-cascader>
          </el-form-item>
        </template>
      </collapse-form>

      <div class="tip">
        已选择<span>{{selectValue}}</span>条数据
        <el-button @click="closePolicyList">选中</el-button>
      </div>

      <el-table ref="multipleTable" :data="tableData" :row-key="getRowKeys" tooltip-effect="dark" style="width: 100%" @selection-change="handleChange">
        <el-table-column type="selection" :reserve-selection="true" width="55"></el-table-column>
        <el-table-column prop="id" label="政策id" align="left" width="100"></el-table-column>
        <el-table-column prop="title" label="政策名称" align="left"></el-table-column>
        <el-table-column prop="mark" label="政策类型" align="center" width="150"></el-table-column>
      </el-table>

      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="paginationOption.current" :page-sizes="[10, 20, 30, 40]" :page-size="paginationOption.size" layout="total, sizes, prev, pager, next, jumper" :total="paginationOption.total">
      </el-pagination>
    </div>

    <el-form-item label="有效时间" class="formWidth" prop="modifiedTime">
      <el-date-picker type="date" style="width:100%" placeholder="选择日期" v-model="formData.modifiedTime" value-format="yyyy-M-d HH:mm:ss" :disabled="isReadonly"></el-date-picker>
    </el-form-item>

    <el-form-item label="红包总量" class="formWidth" prop="totalAmount">
      <el-input-number v-model.number="formData.totalAmount" style="width:100%" controls-position="right" :min="1" :max="100000"></el-input-number>
    </el-form-item>

    <el-form-item label="红包剩余数量" class="formWidth" prop="remainAmount" v-if="isAdd">
      <el-input-number v-model.number="formData.remainAmount" style="width:100%" controls-position="right" :min="1" :max="100000"></el-input-number>
    </el-form-item>

    <div class="code-container" v-if="!isAdd">
      <div class="label">二维码</div>
      <div class="code-box">
        <div v-if="url">
          <el-popover placement="top" title="政策红包二维码" width="500" trigger="click">
            <qrcode class="code" :value="url" :options="{width:450}"></qrcode>
            <qrcode slot="reference" class="code" :value="url" :options="{width:120}"></qrcode>
          </el-popover>
        </div>
        <div class="code-bgc" v-else></div>
      </div>
    </div>

    <el-form-item style="text-align:center">
      <el-button type="primary" :loading="loading" @click="handleSubmit('form')" v-if="!isReadonly">提交</el-button>
      <el-button type="primary" plain @click="$emit('hideDialog', false)">关闭</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import { postPacket, putPacket, getpolicyPage } from '@/api/govdata/policy_packet'
import Qrcode from '@chenfengyuan/vue-qrcode'
import mixins from '@/mixins/mixins'
import multiplyMixin from '@/views/govdata/policyManage/multiply_mixin'
import collapseForm from '@/components/deprecated/collapse-form'
import { findByTypeList } from '@/api/govdata/common'
import { region } from '../policyManage/region'
function initFormInline () {
  return {

  }
}
export default {
  mixins: [mixins, multiplyMixin],
  components: { Qrcode, collapseForm },
  props: ['formData', 'isAdd', 'isEdit', 'isReadonly'],
  data () {
    var checkTotalAmount = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('红包总数量不能为空'))
      }
      setTimeout(() => {
        if (!Number.isInteger(value)) {
          callback(new Error('请输入数字值'))
        } else {
          if (this.isAdd) {
            if (this.formData.totalAmount !== this.formData.remainAmount) {
              callback(new Error('红包总数量必须等于剩余红包数量 !'))
            } else {
              callback()
            }

          } else {
            callback()
          }
        }
      }, 1000)
    }
    var checkRemainAmount = (rule, value, callback) => {
      if (this.isAdd && !value) {
        return callback(new Error('红包剩余数量不能为空'))
      }
      setTimeout(() => {
        if (!Number.isInteger(value)) {
          callback(new Error('请输入数字值'))
        } else {
          if (this.isAdd) {
            if (this.formData.totalAmount !== this.formData.remainAmount) {
              callback(new Error('红包总数量必须等于剩余红包数量 !'))
            } else {
              callback()
            }

          } else {
            callback()
          }
        }
      }, 1000)
    }

    return {
      show: false,
      loading: false,
      url: '',
      rules: {
        description: [{ required: true, message: '请输入通用政策正文' }],
        totalAmount: [{ validator: checkTotalAmount, trigger: 'blur' }],
        remainAmount: [{ validator: checkRemainAmount, trigger: 'blur' }],
      },
      selectValue: 0,
      tableData: [],
      themeList: [],
      industryList: [],
      initFormInline,
      formInline: initFormInline(),
      policytype: 'general',
      policyTypeList: [
        {
          value: 'general',
          label: '通用政策',
        }, {
          value: 'declare',
          label: '申报政策',

        }, {
          value: 'explain',
          label: '政策解读',
        }, {
          value: 'information',
          label: '政策资讯',
        },
      ],
      options: region,
      regionProps: {
        value: 'code',
        label: 'name',
      },
      paginationOption: {
        current: 1,
        size: 0,
        total: 0,
      },
      pagePolicyOption: {
        current: 1,
        size: 10,
      },
    }
  },
  watch: {},
  created () {
    this.getCode()
    this.loadDict()

  },
  methods: {
    change (val) {
      console.log(val)
    },

    /**
     * 获取政策列表数据
     */
    getPolicyList () {
      this.show = true
      this.formInline.type = this.policytype
      getpolicyPage({ ...this.pagePolicyOption, ...this.formInline }).then(res => {
        const data = res.data
        this.paginationOption.current = data.current
        this.paginationOption.size = data.size
        this.paginationOption.total = data.total
        this.tableData = data.records

        const list = this.formData.relationPolicyList
        if (list && list.length > 0) {
          for (let i = 0; i < list.length; i++) {
            for (let j = 0; j < this.tableData.length; j++) {
              if (list[i].id == this.tableData[j].id) {
                this.$refs.multipleTable.toggleRowSelection(this.tableData[j], true)
              }
            }
          }
        }
      })
    },

    /**
     * 关闭政策列表界面
     */
    closePolicyList () {
      this.show = false
    },

    /**
     * 政策列表的多选
     */
    handleChange (val) {
      this.mutipleSelection = val.map(m => {
        return { policyId: m.id, title: m.title, policyType: m.mark }
      })
      let Arr = this.mutipleSelection
      let newArr = []
      if (Arr && Arr.length > 0) {
        let flag = true
        for (let i = 0; i < Arr.length; i++) {
          for (let j = 0; j < newArr.length; j++) {
            if (Arr[i].policyId == newArr[j].policyId) {
              flag = false
            }
          }
          if (flag) {
            newArr.push(Arr[i])
            this.formData.relationList = newArr
            this.selectValue = this.formData.relationList.length
          }
        }
      }
    },

    handleClose (item) {
      this.formData.relationList.splice(this.formData.relationList.indexOf(item), 1)
    },

    /**
     * 验证并提交
     */
    handleSubmit (formName) {
      this.loading = true
      const submitForm = JSON.parse(JSON.stringify(this.formData))

      this.$refs[formName].validate((valid) => {
        if (valid) {
          const requestFun = this.isEdit ? putPacket : postPacket
          requestFun(submitForm).then(res => {
            if (res.data.data) {
              this.submitMessage()
            }
          }).catch(() => {
            this.msg('保存失败，请检查你的网络链接。', 'error')
          })
        } else {
          this.msg('填写错误或者填写不完整', 'warning')
          return false
        }
      })
    },

    /**
     * 回显
     */
    getRowKeys (row) {
      return row.id
    },

    /*
     * 获取层级、适用对象、主题、规模、行业数据
     */
    loadDict () {
      findByTypeList().then(res => {
        const { data } = res
        this.themeList = data.POLICY_THEME
        this.industryList = data.POLICY_INDUSTRY
      })
    },

    /**
     * 点击地区字典按钮
     */
    handleVisibleChange (callback) {
      const { regionList } = this.formInline
      // 当关闭级联选择框时触发
      if (!callback) {
        this.formInline.region = regionList ? regionList.join(',') : []
        this.getPolicyList()
      }
    },

    /**
     * 生成二维码
     */
    getCode () {
      this.url = `https://gc.govmade.cn/policy-red-envelope-detail/${this.formData.id}`
    },

    /**
     *搜索
     */
    search () {
      this.pagePolicyOption.current = 1
      this.getPolicyList()
    },

    /**
     * 控制页面数据(10条/页)
     */
    handleSizeChange (val) {
      this.paginationOption.size = val
      this.pagePolicyOption.current = this.paginationOption.current
      this.pagePolicyOption.size = this.paginationOption.size
      this.getPolicyList()
    },

    /**
     * 控制去到第几页
     */
    handleCurrentChange (val) {
      this.paginationOption.current = val
      this.pagePolicyOption.current = this.paginationOption.current
      this.pagePolicyOption.size = this.paginationOption.size
      this.getPolicyList()
    },

    /**
     * 提交成功时
     */
    submitMessage () {
      this.msg('提交成功!', 'success')
      this.$emit('hideDialog', false)
    },

    /**
     * 提示语
     */
    msg (msg, type) {
      this.$message({
        message: msg,
        type: type,
      })
      this.loading = false
    },

  },
}
</script>

<style lang="scss" scoped>
.formWidth {
  display: inline-block;
  width: 50%;
}
.code-container {
  width: 200px;
  height: 120px;
  margin: 0px 52px 25px;
  display: flex;
  .code-box {
    width: 127px;
    height: 127px;
    padding: 3px;
    margin-left: 25px;
    border-radius: 2px;
    border: 1px solid #dcdfe6;
    position: relative;
    .code {
      cursor: pointer;
    }
    .code-bgc {
      width: 99%;
      height: 100%;
      background-image: url("./add.jpg");
      position: absolute;
    }
  }
}
.policyList {
  .el-tag {
    margin-right: 5px;
  }
}
.open {
  margin-left: 5px;
  border-color: #66b1ff;
  background-color: #66b1ff;
}
.tip {
  color: #666;
  font-size: 13px;
  margin-bottom: 10px;
  span {
    margin: 0 7px;
    color: #66b1ff;
    font-size: 21px;
    font-weight: 600;
  }
  .el-button {
    padding: 6px 8px;
    margin-left: 20px;
    color: #fff;
    border-color: #ba1b21;
    background-color: #ba1b21;
  }
}
.policy-container {
  width: 80%;
  margin: 30px auto;
  padding: 20px;
  box-shadow: 0px 0px 2px 0px #bbb;
}
</style>
<style scoped>
.mutiplySelect >>> .select-box {
  width: 100%;
}
</style>