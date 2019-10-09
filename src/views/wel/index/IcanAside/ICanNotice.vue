<template>
  <i-can-content class="my-content" title-name="消息">
    <div class="my-wrapper">
      <div class="item">
        <div class="icon"><i class="icon-jiandati"></i></div>
        <div class="text">
          <div class="require">
            <div>待处理请求</div>
            <div class="time">01-30</div>
          </div>
          <div class="notice">张三发送了请假申请，请及时处理</div>
        </div>
      </div>
      <div class="item">
        <div class="icon"><i class="icon-jiandati"></i></div>
        <div class="text">
          <div class="require">
            <div>好友/徒弟添加请求</div>
            <div class="time">01-30</div>
          </div>
          <div class="notice">张三发向你申请添加为好友</div>
        </div>
      </div>
      <div class="item">
        <div class="icon"><i class="icon-jiandati"></i></div>
        <div class="text">
          <div class="require">
            <div>谁邀请我</div>
            <div class="time">01-30</div>
          </div>
          <div class="notice">国脉研发中心邀请您加入</div>
        </div>
      </div>
      <slot></slot>
    </div>
  </i-can-content>
</template>
<script>
import ICanContent from './ICanContent'
export default {
  components: { ICanContent },
  data () {
    return {
    }
  },
  methods: {

  },
}
</script>
<style lang="scss" scoped>
.data {
  margin: 20px;
  width: 100%;
  display: flex;
  justify-content: space-between;
}
.item {
  display: flex;
  padding: 8px 10px 0 10px;
  .icon {
    display: flex;
    background-color: #213133;
    border-radius: 50%;
    height: 50px;
    width: 50px;
    color: #fff;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .text {
    display: flex;
    flex: auto;
    flex-direction: column;
    justify-content: center;
    margin-left: 10px;
    .require {
      display: flex;
      justify-content: space-between;
      color: #666;
      .time {
        color: #999;
      }
    }
    .notice {
      color: #999;
      width: 180px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }
}
</style>


