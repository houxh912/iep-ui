<template>
  <div class="plate">
    <div class="head">
      <p class="title">项目团队</p>
      <div class="button">
        <iep-button type="primary" plain>管理</iep-button>
      </div>
    </div>
    <div class="content">
      <div class="box">
        <div class="title">市场经理：</div>
        <div class="item">{{form.mktManagerList.name}}</div>
      </div>
      <div class="box">
        <div class="title">项目经理：</div>
        <div class="item">{{form.projectManagerList.name}}</div>
      </div>
      <div class="box">
        <div class="title">项目指导人：</div>
        <div class="item">{{form.projectMentorList.name}}</div>
      </div>
      <div class="box">
        <div class="title">项目成员：</div>
        <div class="item">{{form.membersList.map(m => m.name).join('，')}}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    form: {
      type: Object,
      default: () => {
        return {
          mktManagerList: { name: '' },
          projectManagerList: { name: '' },
          projectMentorList: { name: '' },
          membersList: [],
        }
      },
    },
  },
}
</script>


<style lang="scss" scoped>
.plate {
  border: 1px solid #eee;
  padding: 20px 15px;
  margin-bottom: 20px;
  .head {
    display: flex;
    border-bottom: 1px solid #eee;
    justify-content: space-between;
    height: 47px;
    .title {
      font-size: 18px;
      margin: 0;
    }
    .button {
      padding-bottom: 10px;
      .el-button {
        margin-right: 10px;
      }
      i {
        font-size: 16px !important;
      }
    }
  }
  .content {
    padding: 15px 0;
    .box {
      display: flex;
      line-height: 30px;
      word-break: break-all;
      .title {
        width: 150px;
        white-space: nowrap;
        padding: 0 12px 0 0;
        text-align: right;
      }
    }
  }
}
.el-form-item {
  margin-bottom: 0;
}
</style>
