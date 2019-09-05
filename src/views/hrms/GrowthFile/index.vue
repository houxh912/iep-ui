<template>
  <div>
    <basic-container>
      <iep-page-header title="员工成长档案" :backOption="backOption"></iep-page-header>
      <el-card class="staff-headers" shadow="hover">
        <div class="left">
          <span class="img-header zoom">
            <iep-img :src="form.avatar" alt=""></iep-img>
          </span>
          <div class="name-info">
            <span class="name">{{form.name}}<a class="state" href="#">（{{simpleEmployeeStatus[form.status]}}）</a></span>
            <span class="num">{{form.staffNo}}</span>
          </div>
        </div>
        <div class="right">
          <!-- <div class="list">
            <span>部门：国脉集团、国脉先锋队</span>
          </div> -->
          <div class="list">
            <span>岗位：{{form.position || '暂无'}}</span>
            <span>职务：{{form.job || '暂无'}}</span>
            <span>职称：{{form.title || '暂无'}}</span>
          </div>
          <div class="list">
            <span>我能：</span>
            <iep-tag-detail style="display: inline;" :value="form.abilityTag"></iep-tag-detail>
          </div>
          <div class="list">
            <span>我要：</span>
            <iep-tag-detail style="display: inline;" :value="form.projectTag"></iep-tag-detail>
          </div>
          <div class="list">
            <span>我想：</span>
            <iep-tag-detail style="display: inline;" :value="form.learningTag"></iep-tag-detail>
          </div>
        </div>
      </el-card>
      <iep-tabs v-model="activeTab" :tab-list="tabList" style="margin-top:20px;">
        <template v-slot:[activeTab]>
          <component ref="tabList" :is="activeTab"></component>
        </template>
      </iep-tabs>
    </basic-container>
  </div>
</template>
<script>
import { simpleEmployeeStatus, initForm } from './options'
import { getGrowthFile } from '@/api/hrms/employee_profile'
import PersonnelChange from './PersonnelChange/index'
import EvaluationRecord from './EvaluationRecord/index'
import ExaminationSituation from './ExaminationSituation/index'
import RewardPunishment from './RewardPunishment/index'
import TrainingRecord from './TrainingRecord/index'
export default {
  components: {
    PersonnelChange,
    EvaluationRecord,
    ExaminationSituation,
    RewardPunishment,
    TrainingRecord,
  },
  data () {
    return {
      activeTab: 'PersonnelChange',
      tabList: [
        {
          label: '人事变动',
          value: 'PersonnelChange',
        },
        {
          label: '评价记录',
          value: 'EvaluationRecord',
        },
        {
          label: '考试情况',
          value: 'ExaminationSituation',
        },
        {
          label: '奖惩信息',
          value: 'RewardPunishment',
        },
        {
          label: '培训记录',
          value: 'TrainingRecord',
        },
      ],
      simpleEmployeeStatus,
      form: initForm(),
      backOption: {
        isBack: true,
        backPath: this.$route.query.redirect,
      },
    }
  },
  created () {
    this.loadPage()
  },
  methods: {
    loadPage () {
      getGrowthFile(this.$route.params.id).then(({ data }) => {
        this.form = data.data
      })
    },
  },
}
</script>
<style lang="scss" scoped>
.staff-headers {
  margin: 0 20px;
  .left {
    display: inline-flex;
    padding-right: 20px;
    width: 20%;
    flex-wrap: wrap;
    justify-content: space-around;
    align-items: center;
    vertical-align: middle;
  }
  .right {
    display: inline-block;
    padding-left: 35px;
    width: 73%;
    font-size: 14px;
    vertical-align: middle;
    border-left: 1px dashed #d7d7d7;
    .list {
      margin-bottom: 15px;
      span {
        margin-right: 5px;
      }
      .list-right {
        margin-left: 30px;
      }
    }
  }
  .img-header {
    display: inline-block;
    width: 70px;
    height: 70px;
    overflow: hidden;
    vertical-align: middle;
    border-radius: 50%;
    img {
      display: block;
      width: 70px;
      height: 70px;
      border-radius: 50%;
      transition: all 1s ease 0s;
    }
  }
  .name-info {
    display: inline-block;
    vertical-align: middle;
    .name,
    .num {
      display: block;
      margin-top: 8px;
    }
    .num {
      font-size: 14px;
    }
  }
  .state {
    color: #999;
  }
}
</style>
