<template>
  <div class="monthly">
    <div class="head">
      <div class="title">组织工作月报<span class="date">{{getYearMonth(formData.timeStamp)}}</span></div>
      <div class="tips" v-if="dislogState!=='detail'">记不清楚做什么？<a class="href">参考本月周报</a></div>
      <div class="tips update" v-else @click="handleUpdate"><i class="el-icon-edit"></i></div>
    </div>
    <div class="content">
      <el-form ref="form" v-if="dislogState!=='detail'" :model="formData">
        <div class="title">领导指示</div>
        <el-form-item>
          <el-input type="textarea" v-model="formData.leaderIndication" rows=5 placeholder="此处填写领导指示"></el-input>
        </el-form-item>
        <div class="title">本月工作总结</div>
        <el-form-item prop="workSummary">
          <el-input type="textarea" v-model="formData.workSummary" rows=5 placeholder="此处填写本月工作总结"></el-input>
        </el-form-item>
        <div class="title">下月工作计划</div>
        <el-form-item prop="workPlan">
          <el-input type="textarea" v-model="formData.workPlan" rows=5 placeholder="此处填写下月工作计划"></el-input>
        </el-form-item>
        <div class="title">总结与感悟</div>
        <el-form-item>
          <el-input type="textarea" v-model="formData.summarySentiment" rows=5 placeholder="此处填写总结与感悟"></el-input>
        </el-form-item>
        <div class="select-item">
          <div class="label">市场拓展：</div>
          <div class="item">
            <iep-button class="col-button"><i class="el-icon-plus"></i></iep-button>
            <el-col class="col-item" v-for="(item, index) in formData.meetingSummary" :key="index">{{item.name}} <i class="el-icon-close"></i></el-col>
          </div>
        </div>
        <!-- <div class="select-item">
          <div class="label">相关产品：</div>
          <div class="item">
            <iep-button class="col-button"><i class="el-icon-plus"></i></iep-button>
            <el-col class="col-item" v-for="(item, index) in formData.product" :key="index">{{item.name}} <i class="el-icon-close"></i></el-col>
          </div>
        </div>
        <div class="select-item">
          <div class="label">相关项目：</div>
          <div class="item">
            <iep-button class="col-button"><i class="el-icon-plus"></i></iep-button>
            <el-col class="col-item" v-for="(item, index) in formData.project" :key="index">{{item.name}} <i class="el-icon-close"></i></el-col>
          </div>
        </div> -->
        <el-form-item>
          <iep-button @click="submit" type="danger">保存</iep-button>
        </el-form-item>
      </el-form>
      <div v-else class="detail">
        <div class="title">领导指示</div>
        <pre>{{formData.leaderIndication}}</pre>
        <div class="title">本月工作总结</div>
          <pre>{{formData.workSummary}}</pre>
        <div class="title">下月工作计划</div>
          <pre>{{formData.workPlan}}</pre>
        <div class="title">总结与感悟</div>
          <pre>{{formData.summarySentiment}}</pre>
        <div class="title">市场拓展</div>
        <div class="item">
          <el-tag type="info" class="tag" v-for="(item, index) in formData.meetingSummary" :key="index">{{item.name}}</el-tag>
        </div>
        <div class="title">相关产品</div>
        <!-- <div class="item">
          <el-tag type="info" class="tag" v-for="(item, index) in formData.product" :key="index">{{item.name}}</el-tag>
        </div>
        <div class="title">相关项目</div>
        <div class="item">
          <el-tag type="info" class="tag" v-for="(item, index) in formData.project" :key="index">{{item.name}}</el-tag>
        </div> -->

      </div>
    </div>
  </div>
</template>

<script>
import { getDateStr } from '../util'
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
          createData
          let fn = ()=>{}
          if (this.formData.createData) {
            fn = updateData
          } else {
            fn = createData
            this.formData.reportType = 1
            this.formData.createTime = getDateStr(this.formData.timeStamp)
          }
          delete this.formData.updateTime
          fn(this.formData).then(() => {
            this.$notify({
              title: '成功',
              message: '编辑月报成功',
              type: 'success',
              duration: 2000,
            })
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
    getYearMonth (timeStamp) {
      let msg = '（'
      let date = new Date(timeStamp)
      msg += date.getFullYear() + '年' + (date.getMonth() + 1) + '月）'
      return msg
    },
  },
  watch: {
    data (newVal) {
      this.formData = {...newVal}
    },
  },
}
</script>

<style lang="scss" scoped>
.monthly {
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
      .item {
        padding-left: 20px;
        .el-tag {
          margin: 0 15px 15px 0;
        }
      }
    }
    .select-item {
      display: flex;
      margin-bottom: 10px;
      .label {
        width: 90px;
      }
      .item {
        .col-button {
          margin-bottom: 10px;
        }
        .col-item {
          margin-bottom: 10px;
          font-size: 16px;
          i {
            cursor: pointer;
          }
        }
      }
    }
  }
}
</style>
