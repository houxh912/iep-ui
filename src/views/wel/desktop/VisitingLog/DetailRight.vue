<template>
  <el-col class="right">
    <div class="icon">
      <i class="icon-huiyikaihuitaolun"></i>
    </div>
    <h3 class="title">会议时间</h3>
    <p class="content" v-text="formData.meetingTime"></p>
    <h3 class="title">会议地点</h3>
    <p class="content" v-text="formData.meetingLocation"></p>
    <h3 class="title">发送人</h3>
    <p class="content" v-text="formData.realName"></p>
    <h3 class="title">主持人</h3>
    <p class="content" v-for="item in formData.host" :key="item.id">{{item.name}}</p>
    <h3 class="title">参会人</h3>
    <span style="margin-right:8px;" class="content" v-for="item in formData.attendee.users?formData.attendee.users:[]" :key="item.id">{{item.name}}</span>
    <h3 class="title">抄送人</h3>
    <span style="margin-right:8px;" class="content" v-for="item in formData.attendee.receiver?formData.attendee.receiver:[]" :key="item.id">{{item.name}}</span>
  </el-col>
</template>
<script>
function initForm () {
  return {
  }
}
export default {
  data () {
    return {
      formData: initForm(),
    }
  },
  props: {
    meetingMsg: {
      type: Object,
      required: true,
    },
  },
  created () {
    this.$watch('meetingMsg', (newVal) => {
      this.formData = { ...newVal }
    })
  },
}
</script>

<style scoped lang='scss'>
.right {
  border: 1px solid #eee;
  width: 350px;
  padding: 20px 10px;
  text-align: center;
  .icon {
    width: 100px;
    height: 100px;
    border: 1px solid #eee;
    border-radius: 50%;
    text-align: center;
    margin-left: 115px;
    i {
      font-size: 66px !important;
      color: #bbb;
    }
  }
  .title {
    font-size: 15px;
    margin: 20px 0 10px;
  }
  .content {
    display: inline-block;
    margin-bottom: 25px;
  }
}
</style>
