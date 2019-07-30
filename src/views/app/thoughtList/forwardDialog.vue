<template>
  <iep-dialog :dialog-show="dialogShow" title="转发说说" width="50%" @close="resetForm">
    <forwardContent forward :contentData="contentData" @load-page="loadPage"></forwardContent>
  </iep-dialog>
</template>

<script>
import forwardContent from './library/forwardContent'
export default {
  components: { forwardContent },
  data () {
    return {
      dialogShow: false,
      loadState: false,
      row: {
        images: [],
      },
      contentData: {},
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
    loadPage () {
      this.dialogShow = false
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
