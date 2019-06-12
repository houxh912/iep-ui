<template>
  <div class="feelings">
    <IepAppTabCard :title="title">
      <el-button class="btn" type="text" slot="right">发表感想</el-button>
      <div class="dynamicList">
        <div v-for="(item,index) in dynamicList" :key="index" class="piece">
          <span>{{item.content}}</span>
        </div>
      </div>
    </IepAppTabCard>
  </div>
</template>

<script>
import { getPersonalThoughts } from '@/api/app/cpms/channel'

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
      title: '个人感想',
      dynamicList: [],
    }
  },
  watch: {
    userId () {
      getPersonalThoughts(this.userId).then(({ data }) => {
        this.dynamicList = data.data
      })
    },
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
