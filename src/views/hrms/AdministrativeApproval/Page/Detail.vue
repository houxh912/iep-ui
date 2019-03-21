<template>
  <div class="edit-wrapper">
    <basic-container>
      <page-header :title="`${form.name}的转正申请`" :backOption="backOption"></page-header>
      <el-card class="top-card" :body-style="bodyStyle" shadow="hover">
        <div class="avatar-wrapper">
          <iep-img class="avatar" :src="form.avatar"></iep-img>
        </div>
        <div class="info">
          <div class="info-item">
            <label>申请人：</label>
            <div class="content">{{form.name}}</div>
          </div>
          <div class="info-item">
            <label>所属部门：</label>
            <div class="content">{{form.deptList.join('、')}}</div>
          </div>
          <div class="info-item">
            <label>创建时间：</label>
            <div class="content">{{form.createTime}}</div>
          </div>
          <div class="info-item">
            <label>{{startTimeLabel}}：</label>
            <div class="content">{{form.startTime}}</div>
          </div>
          <div class="info-item">
            <label>{{endTimeLabel}}：</label>
            <div class="content">{{form.endTime}}</div>
          </div>
          <div class="info-item">
            <label>职务：</label>
            <div class="content">{{form.job}}</div>
          </div>
          <div class="info-item">
            <label>职称：</label>
            <div class="content">{{form.title}}</div>
          </div>
        </div>
      </el-card>
      <el-card class="middle-card" :body-style="middleBodyStyle" shadow="never">
        <div slot="header" class="clearfix">
          <span>申请理由</span>
        </div>
        <pre>
          {{form.reason}}
        </pre>
      </el-card>
      <el-card class="middle-card" :body-style="middleBodyStyle" shadow="never">
        <div slot="header" class="clearfix">
          <span>附件</span>
        </div>
        <pre>
          {{form.annex}}
        </pre>
      </el-card>
      <el-card class="middle-card" :body-style="middleBodyStyle" shadow="never">
        <div slot="header" class="clearfix">
          <span>申请流程</span>
        </div>
        <el-timeline>
          <el-timeline-item v-for="p in form.processList" :key="p.id" :timestamp="p.time" placement="top">
            <el-card>
              <h4>{{p.username}} {{p.status}}</h4>
              <p>审批意见：{{p.msg}}</p>
            </el-card>
          </el-timeline-item>
        </el-timeline>
      </el-card>
      <el-card class="middle-card" :body-style="middleBodyStyle" shadow="never">
        <div slot="header" class="clearfix">
          <span>抄送人</span>
        </div>
        <pre>
          {{form.cc}}
        </pre>
      </el-card>
    </basic-container>
  </div>
</template>
<script>
import { getAdministrativeApprovalById } from '@/api/hrms/administrative_approval'
import { initForm, dictsMap } from '../options'
import { mergeByFirst } from '@/util/util'
export default {
  props: {
    record: {
      type: Object,
      default: () => { },
    },
  },
  data () {
    return {
      backOption: {
        isBack: true,
        backPath: null,
        backFunction: this.handleGoBack,
      },
      bodyStyle: {
        display: 'flex',
        padding: '20px',
      },
      middleBodyStyle: {
        padding: '20px',
        border: 0,
      },
      form: initForm(),
    }
  },
  computed: {
    startTimeLabel () {
      return dictsMap.startTime[this.form.type]
    },
    endTimeLabel () {
      return dictsMap.endTime[this.form.type]
    },
  },
  created () {
    this.loadPage()
  },
  methods: {
    loadPage () {
      getAdministrativeApprovalById(this.record.id).then(({ data }) => {
        this.form = mergeByFirst(initForm(), data.data)
      })
    },
    handleGoBack () {
      this.$emit('onGoBack')
    },
  },
}
</script>

<style lang="scss" scoped>
.top-card {
  .avatar-wrapper {
    flex: 1;
    text-align: center;
  }
  .avatar {
    border-radius: 50%;
    border: 1px solid #fff;
    height: 100px;
    width: 100px;
  }
  .info {
    flex: 5;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    .info-item {
      label {
        width: 120px;
        text-align: right;
        vertical-align: middle;
        float: left;
        font-size: 14px;
        color: #606266;
        line-height: 40px;
        padding: 0 12px 0 0;
        box-sizing: border-box;
      }
      .content {
        margin-left: 120px;
        line-height: 40px;
        position: relative;
        font-size: 14px;
      }
    }
  }
}
.middle-card {
  margin-top: 20px;
}
</style>
