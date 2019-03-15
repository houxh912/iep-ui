<template>
  <div class="edit-wrapper">
    <basic-container>
      <page-header title="发布招聘" :backOption="backOption"></page-header>
      <div class="recruit-headers">
        <span class="state"><i class="iconfont icon-shijian"></i><span>招聘中</span></span>
        <div class="con">
          <div class="left">
            <h4 class="name">
              {{form.positionName}}
            </h4>
            <div class="address"><span>{{form.deptName}}</span>舟山</div>
          </div>
          <div class="right">
            <div class="pay">{{form.welfare}}元/月</div>
            <div class="info">
              <iep-dict-detail :current-value="form.academicId" dict-name="hrms_highest_educational"></iep-dict-detail>
              <label>{{form.years}}年</label>
              <span>招{{form.recruitsCount}}人</span>
              <span>目标{{form.targetCount}}人</span>
            </div>
          </div>
        </div>
      </div>
      <el-form class="form-detail recruit-detail" ref="form" :model="form" label-width="120px" size="small" disabled>
        <el-form-item>
          <div class="sub-title">其他要求</div>
          <el-row>
            <el-col :span="6">
              <el-form-item label="专业要求：">
                <label>{{form.profession}}</label>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="工作类型：">
                <iep-dict-detail :current-value="form.jobTypeId" dict-name="hrms_work_type"></iep-dict-detail>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="外语要求：">
                <label>{{form.language}}</label>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="性别要求：">
                <label>{{form.sexName}}</label>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form-item>
        <el-form-item>
          <div class="sub-title">岗位职责</div>
          <el-row>
            <el-col class="text" :span="24">
              {{form.duties}}
            </el-col>
          </el-row>
        </el-form-item>
        <el-form-item>
          <div class="sub-title">岗位要求</div>
          <el-row>
            <el-col class="text" :span="24">
              {{form.claim}}
            </el-col>
          </el-row>
        </el-form-item>
        <el-form-item class="btn-con">
          <el-button type="primary">我要推荐</el-button>
        </el-form-item>
      </el-form>
    </basic-container>
  </div>
</template>
<script>
import { getPublishRecruitmentById } from '@/api/hrms/publish_recruitment'
import { mapState } from 'vuex'
import PageHeader from '@/components/Page/Header'
import { initForm } from '../options'
import { mergeByFirst } from '@/util/util'
export default {
  props: {
    record: {
      type: Object,
      default: () => { },
    },
  },
  components: { PageHeader },
  data () {
    return {
      backOption: {
        isBack: true,
        backPath: null,
        backFunction: () => { this.$emit('onGoBack') },
      },
      form: initForm(),
    }
  },
  computed: {
    ...mapState({
      dictGroup: state => state.user.dictGroup,
    }),
  },
  created () {
    this.load()
  },
  methods: {
    load () {
      getPublishRecruitmentById(this.record.id).then(({ data }) => {
        this.form = mergeByFirst(initForm(), data.data)
      })
    },
  },
}
</script>
<style scoped>
.edit-wrapper >>> .el-form {
  margin-right: 20%;
  margin-top: 20px;
}
.recruit-detail >>> .el-form-item__content {
  margin-left: 0 !important;
}
</style>

<style lang="scss" scoped>
.recruit-headers {
  padding: 20px;
  background-color: #fff;
  border-radius: 3px;
  margin-bottom: 10px;
  border: 1px solid #eee;
  box-shadow: 0 0 1px 1px #eee;
  .con {
    display: flex;
    justify-content: space-between;
  }
  .state {
    font-size: 14px;
    i {
      display: inline-block;
      margin-right: 5px;
      vertical-align: middle;
      color: #999;
    }
    span {
      display: inline-block;
      vertical-align: middle;
    }
  }
  .left {
    margin: 10px 0;
    .name {
      margin-bottom: 20px;
      font-size: 24px;
      font-weight: 400;
      line-height: 32px;
    }
    .address {
      font-size: 14px;
      color: #999;
      span {
        margin-right: 10px;
      }
    }
  }
  .right {
    display: flex;
    flex-flow: column;
    margin: 10px 0;
    align-items: flex-end;
    .pay {
      margin-bottom: 20px;
      font-size: 24px;
      line-height: 32px;
      color: #cb3737;
    }
    .info {
      font-size: 14px;
      color: #999;
      span {
        display: inline-block;
        padding: 0 20px;
        border-right: 1px solid #eee;
        &:nth-child(4) {
          padding-right: 0;
          border: 0;
        }
      }
    }
  }
}
.recruit-detail {
  .sub-title {
    margin: 20px 35px;
    font-size: 16px;
  }
  .text {
    margin: 0 45px 15px;
    font-size: 14px;
    color: #606266;
    word-wrap: break-word;
  }
  .btn-con {
    margin: 20px;
    .el-button--primary {
      border: 1px solid #cb3737;
      background-color: #cb3737;
      color: #fff;
      cursor: pointer;
      &:hover {
        border-color: #fb5966;
        background-color: #fb5966;
        color: #fff;
      }
    }
  }
}
</style>