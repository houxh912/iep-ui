<template>
  <iep-dialog :dialog-show="dialogShow" title="转发说说" width="50%" @close="resetForm">
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
        <formTpl :transmitId="contentData.thoughtsId"></formTpl>
      </div>
    </div>
  </iep-dialog>
</template>

<script>
import formTpl from './form'
import contentTpl from './content'
export default {
  components: { contentTpl, formTpl },
  data () {
    return {
      dialogShow: false,
      loadState: false,
      row: {
        images: [],
      },
    }
  },
  methods: {
    open (row) {
      this.dialogShow = true
      this.contentData = row
    },
    resetForm () {
      this.dialogShow = false
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
    width: 70px;
    height: 70px;
    border-radius: 50%;
    .img{
      cursor: pointer;
      width: 50px;
      height: 50px;
      border-radius: 50%;
      overflow: hidden;
    }
  }
  .content {
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
