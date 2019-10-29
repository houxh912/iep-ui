<template>
  <div class="reward-card box">
    <div class="title">打赏是对分享者的最大赞许</div>
    <iep-button type="danger" round style="padding:8px 40px" @click="handleReward">打赏</iep-button>
    <!-- <span class="total">{{total}}人打赏</span> -->
    <!-- <div v-for="(item,index) in dataList" :key="index" class="avatar">
      <iep-img class="img" :src="item.avatar" :alt="item.name"></iep-img>
    </div> -->
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'IepAppRewardCard',
  props: {
    total: {
      type: String,
      default: '0',
    },
    dataList: {
      type: Array,
      required: false,
      default: () => [],
    },
    userInfo: {
      default: () => { },
    },
  },
  data () {
    return {

    }
  },
  methods: {
    // 打赏
    ...mapActions(['famsReward']),
    handleReward () {
      if (this.userInfo.id) {
        this.famsReward({ id: this.userInfo.id, name: this.userInfo.name })
      }
    },
  },
}
</script>
<style lang="scss" scoped>
.box {
  width: 100%;
  padding: 10px 0 20px;
  background-color: #fafafa;
  text-align: center;
  .title {
    height: 50px;
    line-height: 50px;
    color: #333;
    font-size: 16px;
  }
  .total {
    display: block;
    height: 32px;
    line-height: 32px;
  }
  .avatar {
    display: inline-block;
  }
}
</style>
<style lang="scss" scoped>
.reward-card {
  img {
    width: 40px;
    height: 40px;
    margin: 5px;
    border-radius: 50%;
  }
}
</style>

