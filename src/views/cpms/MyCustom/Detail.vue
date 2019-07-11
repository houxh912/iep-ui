<template>
  <div>
    <basic-container>
      <page-header title="我的定制" :backOption="backOption"></page-header>
      <operation-container>
      </operation-container>
      <div class="container">
        <div class="con-item">
          <div class="title">
            <div class="title1">定制信息</div>
            <div class="con-item">
              <span class="title2">提交人：</span>
              <iep-div-detail class="content" :value="form.title"></iep-div-detail>
            </div>
            <div class="con-item">
              <span class="title2">提交时间：</span>
              <iep-div-detail class="content" :value="form.title"></iep-div-detail>
            </div>
            <div class="con-item">
              <span class="title2">定制产品名称：</span>
              <iep-div-detail class="content" :value="form.title"></iep-div-detail>
            </div>
            <div class="con-item">
              <span class="title2">产品说明：</span>
              <iep-div-detail class="content" :value="form.title"></iep-div-detail>
            </div>
          </div>
        </div>
      </div>
      <custom-form></custom-form>
    </basic-container>
  </div>
</template>
<script>
function initForm () {
  return {
    title: '',
    orgName: '',
    createTime: '',
    realName: '',
  }
}
import CustomForm from '../Components/CustomForm'
export default {
  components: {
    CustomForm,
  },
  data () {
    return {
      backOption: {
        isBack: true,
      },
      form: initForm(),
    }
  },
}
</script>

<style scoped lang='scss'>
.container {
  padding: 0 10px;
  margin-bottom: 30px;
  border-bottom: 1px solid #eee;
  .con-item {
    margin-bottom: 15px;
    .title {
      font-size: 16px;
      color: #333;
    }
    .title1 {
      margin-bottom: 15px;
    }
    .title2 {
      display: inline-block;
      margin-right: 8px;
      width: 100px;
      text-align: right;
      font-size: 14px;
      color: #999;
    }
    .content {
      display: inline-block;
      word-break: break-all;
      word-wrap: break-word;
      white-space: pre-wrap;
      font-size: 14px;
      color: #999;
      vertical-align: -4px;
    }
  }
}
</style>
