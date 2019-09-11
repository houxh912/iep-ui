<template>
  <el-form :model="model" label-width="120px" ref="form" :rules="rules" :class="isReadonly ? 'readonly-form' : ''">
    <el-form-item label="红包简介" prop="description">
      <el-input v-model="model.description" maxlength="255" :readonly="isReadonly" clearable></el-input>
    </el-form-item>

    <el-form-item label="关联政策">
      <div class="policyList">
        <el-tag type="info" v-for="item in model.relationList" :key="item.value" :label="item.label" closable :disable-transitions="false" @close="handleClose(item)">{{item.title}}</el-tag>
        <el-button class="open" type="primary" icon="el-icon-edit" circle @click="getPolicyList" :disabled="isReadonly"></el-button>
      </div>

    </el-form-item>

    <div class="policy-container" v-if="show">
      <collapse-form ref="collapseForm" @clear="formInline=initFormInline()" @search="search()">
        <template slot="search-header" class="title">
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
        已选中<span>{{this.policyValue.length}}</span>条数据
        <el-button @click="closePolicyList">选中</el-button>
      </div>

      <el-table ref="multipleTable" :data="tableData" :row-key="getRowKeys" tooltip-effect="dark" style="width: 100%" @select="select" @selection-change="handleChange">
        <el-table-column type="selection" :reserve-selection="true" width="40"></el-table-column>
        <el-table-column prop="title" label="政策名称" align="left"></el-table-column>
        <el-table-column prop="publishTime" label="发布时间" :formatter="dateFormat" align="center" width="120"> </el-table-column>
        <el-table-column prop="mark" label="政策类型" align="center" width="120">
          <template slot-scope="scope">
            <el-tag type="success" size="small" v-if="scope.row.mark=='general'">通用政策</el-tag>
            <el-tag type="info" size="small" v-if="scope.row.mark=='declare'">申报政策</el-tag>
            <el-tag type="warning" size="small" v-if="scope.row.mark=='explain'">政策解读</el-tag>
            <el-tag type="danger" size="small" v-if="scope.row.mark=='information'">政策资讯</el-tag>
          </template></el-table-column>
      </el-table>

      <el-pagination class="pagination" @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="paginationOption.current" :page-sizes="[10, 20, 30, 40]" :page-size="paginationOption.size" layout="total, sizes, prev, pager, next, jumper" :total="paginationOption.total">
      </el-pagination>
    </div>

    <el-form-item label="有效时间" class="formWidth" prop="effectiveDeadline">
      <el-date-picker type="date" style="width:100%" placeholder="选择日期" v-model="model.effectiveDeadline" value-format="yyyy-M-d HH:mm:ss" :disabled="isReadonly"></el-date-picker>
    </el-form-item>

    <el-form-item label="红包总量" class="formWidth" prop="totalAmount">
      <el-input-number v-model.number="model.totalAmount" style="width:100%" controls-position="right" :min="1" :max="100000" :disabled="isReadonly"></el-input-number>
    </el-form-item>

    <el-form-item label="红包剩余数量" class="formWidth" prop="remainAmount">
      <el-input-number v-model.number="model.remainAmount" style="width:100%" controls-position="right" :min="0" :max="100000" :disabled="isReadonly"></el-input-number>
    </el-form-item>

    <div class="code-container" v-if="!isAdd">
      <div class="label">二维码</div>
      <el-popover placement="right-end" title="政策红包二维码" width="500" trigger="click">
        <qrcode class="code" :value="url" :options="{width:450}"></qrcode>
        <div class="code-box" slot="reference">
          <div class="code-box-border">
            <qrcode class="code" :value="url" :options="{width:120}"></qrcode>
          </div>
        </div>
      </el-popover>
    </div>

    <el-form-item>
      <el-button type="primary" :loading="loading" @click="handleSubmit('form')" v-if="!isReadonly">提交</el-button>
      <el-button type="primary" plain @click="$emit('hideDialog', false)">关闭</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import { getPacketById, postPacket, putPacket, getpolicyPage } from '@/api/govdata/policy_packet'
import Qrcode from '@chenfengyuan/vue-qrcode'
import mixins from '@/mixins/mixins'
import multiplyMixin from '@/views/govdata/policyManage/multiply_mixin'
import collapseForm from '@/components/deprecated/collapse-form'
import { findByTypeList } from '@/api/govdata/common'
import { region } from '../policyManage/region'
import moment from 'moment'
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
            if (this.model.totalAmount !== this.model.remainAmount) {
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
            if (this.model.totalAmount !== this.model.remainAmount) {
              callback(new Error('红包总数量必须等于剩余红包数量 !'))
            } else {
              callback()
            }
          }
          if (this.isEdit) {
            if (this.model.remainAmount > this.model.totalAmount) {
              callback(new Error('剩余红包数量必须小于或等于红包总数量 !'))
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
      policyValue: [],
      model: {
        description: '',
        effectiveDeadline: '',
        totalAmount: 0,
        remainAmount: 0,
        relationList: [],
      },
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
  created () {
    this.getRedDetail()
    this.getCode()
    this.loadDict()

  },
  methods: {
    /**
     * 公用
     */
    common () {
      const submitForm = JSON.parse(JSON.stringify(this.model))
      const requestFun = this.isEdit ? putPacket : postPacket
      requestFun(submitForm).then(res => {
        if (res.data.data) {
          this.getRedDetail()
          this.msg('操作成功!', 'success')
        }
      }).catch(() => {
        this.msg('保存失败，请检查你的网络链接。', 'error')
      })
    },

    /**
     * 获取红包详情数据
     */
    getRedDetail () {
      if (this.isEdit || this.isReadonly) {
        getPacketById(this.formData.id).then(res => {
          this.model = res.data.data
        })
      }
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

        const list = this.model.relationPolicyList
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
      * 单选
      */
    select (selection, row) {
      let status = this.isSelectNow(selection, row)
      let hash = {}
      if (status) {
        let arr = { policyId: row.id, title: row.title, policyType: row.mark }
        this.model.relationList.push(arr)
        // if (this.model.relationList && this.model.relationList.length > 0) {
        this.model.relationList.reduce(function (item, next) {
          hash[next.policyId] ? '' : hash[next.policyId] = true && item.push(next)
          return item
        }, [])
        // }
      } else {
        for (let index in this.model.relationList) {
          if (this.model.relationList[index].policyId == row.id) {
            this.model.relationList.splice(index, 1)
            return
          }
        }
      }
    },

    // 判断当前数据是否选中
    isSelectNow (list, row) {
      for (let item of list) {
        if (item.id == row.id) {
          return true
        }
      }
      return false
    },

    /**
     * 政策列表选择项发生变化时
     */
    handleChange (val) {
      this.mutipleSelection = val.map(m => {
        return { policyId: m.id, title: m.title, policyType: m.mark }
      })
      if (this.model.relationList && this.model.relationList.length > 0) {
        let hash = {}
        const value = [... this.mutipleSelection, ...this.model.relationList]
        this.policyValue = value.reduce(function (item, next) {
          hash[next.policyId] ? '' : hash[next.policyId] = true && item.push(next)
          return item
        }, [])
        this.model.relationList = this.policyValue
      } else {
        this.model.relationList = this.mutipleSelection
      }
    },

    /**
     * 选中政策
     */
    closePolicyList () {
      this.show = false
      // this.model.relationList = this.policyValue
      if (!this.isAdd) {
        this.common()
      }
    },

    /**
     * 动态关闭政策tag
     */
    handleClose (item) {
      if (!this.isReadonly) {
        this.model.relationList.splice(this.model.relationList.indexOf(item), 1)
      }
      if (this.show) {
        for (let items of this.tableData) {
          if (item.policyId == items.id) {
            this.$refs.multipleTable.toggleRowSelection(items, false)
          }
        }
      }
      if (!this.isAdd && !this.isReadonly) {
        this.common()
      }
    },

    /**
     * 验证并提交表单
     */
    handleSubmit (formName) {
      this.loading = true
      const submitForm = JSON.parse(JSON.stringify(this.model))

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
     * 政策列表多选的回显
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
      this.url = `http://hb.govmade.cn/?id=${this.formData.id}`
    },

    /**
     *政策列表的搜索
     */
    search () {
      this.pagePolicyOption.current = 1
      this.getPolicyList()
    },

    /**
     * 获取政策列表里时间戳转标准时间
     */
    dateFormat: function (row, column) {
      let publishTime = row[column.property]
      if (publishTime == undefined) {
        return ''
      }
      return moment(publishTime).format('YYYY-MM-DD')
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
  height: 120px;
  margin: 0px 52px 25px;
  display: flex;
  .code-box {
    width: 200px;
    height: 130px;
    padding: 3px;
    margin-left: 25px;
    .code-box-border {
      width: 127px;
      height: 127px;
      border-radius: 2px;
      border: 1px solid #dcdfe6;
      .code {
        cursor: pointer;
        transition: all 0.6s;
        &:hover {
          transform: scale(1.4);
        }
      }
    }
  }
}
.policyList {
  .el-tag {
    margin-right: 5px;
  }
  .open {
    margin-left: 5px;
    border-color: #66b1ff;
    background-color: #66b1ff;
  }
}
.policy-container {
  width: 79%;
  margin: 30px auto;
  padding: 20px;
  box-shadow: 0px 0px 2px 0px #bbb;
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
      padding: 5px 6px;
      margin-left: 20px;
      color: #fff;
      font-size: 13px;
      border-color: #ba1b21;
      background-color: #ba1b21;
    }
  }
  .pagination {
    text-align: center;
    padding: 15px 0px 0px;
  }
}
</style>
<style scoped>
.mutiplySelect >>> .select-box {
  width: 100%;
}
.policy-container >>> .search {
  margin-left: -1px;
  border-radius: 3px;
  color: #fff;
  background: #ba1b21;
  border-color: #ba1b21;
}
</style>