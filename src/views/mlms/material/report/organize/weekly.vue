<template>
  <div class="weekly">
    <div class="update-page">
      <div class="head">
        <div class="title" v-text="`第${formatDig(formData.index)}周组织工作周报`"><span class="date">（02-25 ~ 03-02）</span></div>
        <!-- <div class="tips" v-if="dislogState!=='detail'">记不清楚做什么？<a class="href" @click="changePage">参考本周日报</a></div> -->
        <div class="tips update" @click="handleUpdate"><i class="el-icon-edit"></i></div>
      </div>
      <div class="content">
        <el-form ref="form" v-if="dislogState!=='detail'" :rules="rules" :model="formData">
          <div class="title">领导指示</div>
          <el-form-item>
            <el-input type="textarea" v-model="formData.leaderIndication" rows=5 placeholder="此处填写领导指示"></el-input>
          </el-form-item>
          <div class="title">本周工作总结</div>
          <el-form-item prop="workSummary">
            <el-input type="textarea" v-model="formData.workSummary" rows=5 placeholder="此处填写本周工作总结"></el-input>
          </el-form-item>
          <div class="title">下周工作计划</div>
          <el-form-item prop="workPlan">
            <el-input type="textarea" v-model="formData.workPlan" rows=5 placeholder="此处填写下周工作计划"></el-input>
          </el-form-item>
          <div class="title">总结与感悟</div>
          <el-form-item>
            <el-input type="textarea" v-model="formData.summarySentiment" rows=5 placeholder="此处填写总结与感悟"></el-input>
          </el-form-item>
          <el-form-item>
            <iep-button @click="submit" type="primary">保存</iep-button>
          </el-form-item>
        </el-form>
        <div v-else class="detail">
          <div class="title">领导指示</div>
          <pre>{{formData.leaderIndication}}</pre>
          <div class="title">本周工作总结</div>
            <pre>{{formData.workSummary}}</pre>
          <div class="title">下周工作计划</div>
            <pre>{{formData.workPlan}}</pre>
          <div class="title">总结与感悟</div>
            <pre>{{formData.summarySentiment}}</pre>
        </div>
      </div>
    </div>
    
  </div>
</template>

<script>
import { toChinesNum, getDateStr } from '../util'
import { updateData, createData } from '@/api/mlms/material/report/organize'

export default {
  props: {
    data: {
      type: Object,
      default: () => {},
    },
  },
  computed: {
  },
  data () {
    return {
      formData: {},
      dislogState: 'detail',
      rules: {
        workSummary: [{ required: true, message: '必填', trigger: 'blur' }],
        workPlan: [{ required: true, message: '必填', trigger: 'blur' }],
      },
    }
  },
  methods: {
    submit () {
      this.$refs['form'].validate((valid) => {
        if (valid) {
          // 判断这条数据是否在系统中已经生成
          let fn = ()=>{}
          if (this.formData.createData) {
            fn = updateData
          } else {
            fn = createData
            this.formData.createTime = getDateStr(this.formData.timeStamp)
          }
          delete this.formData.updateTime
          this.formData.title = `第${this.formatDig(this.formData.index)}周个人工作周报`
          fn(this.formData).then(() => {
            this.$notify({
              title: '成功',
              message: '编辑月报成功',
              type: 'success',
              duration: 2000,
            })
            this.pageState = true
            this.$emit('success-submit', true)
          })
        } else {
          return false
        }
      })
    },
    handleUpdate () {
      this.dislogState = 'update'
    },
    formatDig (index) {
      return toChinesNum(index)
    },
    handleSelectionChange (val) {
      this.selectList = val
    },
  },
  watch: {
    data (newVal) {
      this.pageState = true
      this.formData = {
        leaderIndication: '',
        workSummary: '',
        workPlan: '',
        summarySentiment: '',
      }
      this.formData = Object.assign({}, this.formData, newVal)
    },
  },
}
</script>

<style lang="scss" scoped>
.weekly {
  .update-page {
    .head {
      margin-bottom: 20px;
      display: flex;
      justify-content: space-between;
      border-bottom: 1px solid #ddd;
      padding: 20px 0;
      font-size: 18px;
      .title {
        font-weight: 700;
        .date {
          font-size: 14px;
          color: #999;
          font-weight: 500;
        }
      }
      .tips {
        font-size: 14px;
        line-height: 24px;
        margin-right: 3px;
        color: #999;
        .href {
          color: #ba1b21;
          cursor: pointer;
        }
      }
      .update {
        font-size: 18px;
        cursor: pointer;
      }
    }
    .content {
      .title {
        margin-bottom: 20px;
      }
      .detail {
        pre {
          padding-left: 20px;
          line-height: 20px;
          margin: 0;
          min-height: 50px;
        }
        .title {
          font-weight: 700;
          margin-top: 10px;
        }
      }
    }
  }
  .detail-page {
    .footer {
      margin-top: 20px;
    }
  }
}
</style>
