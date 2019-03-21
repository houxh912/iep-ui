<template>
  <div class="edit-wrapper">
    <basic-container>
      <page-header :title="`${form.name}的转正申请`" :backOption="backOption"></page-header>
      <div class="base-msg">
        <el-row>
          <el-col :span="3">
            <div class="grid-content bg-purple">
              <div class="img zoom"><img id="information-avatar" alt="头像"></div>
            </div>
          </el-col>
          <el-col :span="21">
            <div class="grid-content bg-purple">
              <el-form ref="form" :model="form" label-width="100px">
                <el-col :span="7">
                  <el-form-item label="申请人：">
                    <span>{{form.name}}</span>
                  </el-form-item>
                  <el-form-item label="入职时间：">
                    <span>{{form.time}}</span>
                  </el-form-item>
                  <el-form-item label="岗位：">
                    <span>{{form.position}}</span>
                  </el-form-item>
                </el-col>
                <el-col :span="14">
                  <el-form-item label="所属部门：">
                    <span>{{form.deptList.join('、')}}</span>
                  </el-form-item>
                  <el-form-item label="转正日期：">
                    <span>{{form.date}}</span>
                  </el-form-item>
                  <el-form-item label="薪资：">
                    <span>{{form.salary}}</span>
                  </el-form-item>
                </el-col>
              </el-form>
            </div>
          </el-col>
        </el-row>
      </div>
      <!-- <div class="review">
        <el-form ref="form" :model="form" label-width="280px">
          <div class="title">申请理由</div>
          <el-form-item :label="item.label+'：'" v-for="(item,index) in form.review.list" :key="index">
            <span>{{item.value}}</span>
          </el-form-item>
        </el-form>
      </div>
      <div class="review">
        <div class="title">附件 某某某的附件</div>
      </div>
      <div class="review">
        <el-form ref="form" :model="form" label-width="280px">
          <div class="title">申请流程</div>
          <el-form-item :label="item.label+'：'" v-for="(item,index) in form.opinion.list" :key="index">
            <span>{{item.value}}</span>
          </el-form-item>
        </el-form>
      </div> -->
      <!-- <div class="review">
        <div class="prompt">抄送人：{{form.sourceName}}</div>
        <div class="prompt color" readonly>注：（审批通过后，通知抄送人）</div>
      </div> -->
    </basic-container>
  </div>
</template>
<script>
import { getAdministrativeApprovalById } from '@/api/hrms/administrative_approval'
import { initForm } from '../options'
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
      form: initForm(),
    }
  },
  created () {
    this.loadPage()
  },
  methods: {
    loadPage () {
      getAdministrativeApprovalById(this.record.id).then(({ data }) => {
        this.form = data.data
      })
    },
    handleGoBack () {
      this.$emit('onGoBack')
    },
  },
}
</script>

<style lang="scss" scoped>
.base-msg {
  width: 100%;
  color: #606266;
  box-sizing: border-box;
  border-radius: 3px;
  padding: 15px 0 7px 0;
  border: 1px solid #eee;
  box-shadow: 0 0 1px 1px #eee;
  .img {
    margin: 0 auto;
    width: 120px;
    height: 120px;
    border-radius: 50%;
    overflow: hidden;
    img {
      width: 100%;
      border-radius: 50%;
    }
  }
}
.review {
  border-bottom: 1px solid #eee;
  color: #606266;
  padding: 20px;
  .title {
    padding: 15px 20px;
    font-weight: 600;
  }
  .prompt {
    padding: 0 20px 10px 20px;
  }
  .color {
    color: #ccc;
  }
}
.el-form-item {
  margin: 0;
}
</style>
