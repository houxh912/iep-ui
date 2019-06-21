<template>
  <div class="feelings">
    <IepAppTabCard :title="title" :linkName="linkName">
      <div class="dynamicList" v-if="dynamicList.length !== 0">
        <div v-for="(item,index) in dynamicList" :key="index" class="piece">
          <span>{{item.content}}</span>
        </div>
      </div>
      <IepNoData v-else></IepNoData>
    </IepAppTabCard>
  </div>
</template>

<script>

export default {
  props: {
    userId: {
      type: Number,
      default: 0,
    },
  },
  data () {
    return {
      showClass: 0,
      title: '我的需求',
      dynamicList: [],
      linkName: '/app/more_thoughts',
    }
  },
}
</script>

<style lang="scss" scoped>
.feelings {
  margin-bottom: 30px;
  .btn {
    padding: 0;
    color: #cb3737;
    &:hover {
      color: #f56c6c;
    }
  }
}
.dynamicList {
  .piece {
    position: relative;
    padding-left: 15px;
    cursor: pointer;
    height: 34px;
    line-height: 34px;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    &:hover {
      color: #cb3737;
    }
    &:before {
      content: "";
      position: absolute;
      left: 0;
      top: 14px;
      width: 5px;
      height: 5px;
      border-radius: 50%;
      background-color: #999;
    }
    .dn {
      opacity: 0;
    }
  }
}
</style>
