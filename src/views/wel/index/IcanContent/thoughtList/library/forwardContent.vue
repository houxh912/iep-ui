<template>
  <div class="forward">
    <div class="avatar">
      <iep-img :src="contentData.avatar" class="img"></iep-img>
    </div>
    <div class="content">
      <div class="top">
        <div class="title">
          <div class="name">{{contentData.userName}}</div>
          <div class="date"><i class="icon-shijian"></i> {{contentData.createTime}}</div>
        </div>
      </div>
      <contentTpl class="contentTpl" :data="contentData"></contentTpl>
      <formTpl @load-page="loadPage" :transmitId="contentData.thoughtsId" v-if="forward"></formTpl>
    </div>
  </div>
</template>

<script>
import formTpl from './form'
import contentTpl from './content'
export default {
  components: { contentTpl, formTpl },
  props: {
    forward: {
      type: Boolean,
      default: false,
    },
    contentData: {
      type: Object,
    },
  },
  methods: {
    loadPage () {
      this.$emit('load-page', true)
    },
  },
}
</script>

<style lang="scss" scoped>
.forward {
  display: flex;
  padding: 0 10px;
  .avatar {
    margin-right: 35px;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    .img {
      cursor: pointer;
      width: 50px;
      height: 50px;
      border-radius: 50%;
      overflow: hidden;
    }
  }
  .content {
    flex: 1;
    .top {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 15px;
      .title {
        display: flex;
        .name {
          font-size: 16px;
          color: #4d6e8f;
        }
        .date {
          padding: 2px 0 0 15px;
          color: #666;
          i {
            font-size: 14px !important;
          }
          &:nth-child(2) {
            color: #999;
          }
        }
      }
    }
    .contentTpl {
      margin-bottom: 15px;
    }
  }
}
</style>