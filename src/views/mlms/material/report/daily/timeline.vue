<template>
  <div class="time-line">
    <div class="item" v-for="(item, index) in list" :key=index>
      <div class="before" v-if="item.month">{{item.month}}</div>
      <div class="middle">
        <div class="tail"></div>
        <div v-if="item.month">
          <div class="date icon"><i class="icon-jiantouxiangyou"></i></div>
          <div class="content"></div>
        </div>
        <div v-else>
          <div class="date" :class="active===index?'active':''">{{item.date}}</div>
          <div class="content">
            <slot name="content" :row="item" :index="index"></slot>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'timeline',
  props: ['list'],
  data () {
    return {
      active: -1,
    }
  },
}
</script>

<style lang="scss" scoped>
.time-line {
  .item {
    position: relative;
    min-height: 50px;
    .before {
      width: 100px;
      padding: 5px 0 0;
      position: absolute;
      top: 0px;
    }
    .middle {
      margin-left: 100px;
      position: relative;
      .tail {
        position: absolute;
        left: 17px;
        top: 36px;
        height: calc(100% - 36px);
        border-left: 1px solid #e4e7ed;
        :last-of-type {
          border: 0;
        }
      }
      .tail:last-of-type {
        border: 0;
      }
      .date {
        border-radius: 50%;
        border: 1px solid #ddd;
        width: 34px;
        height: 34px;
        line-height: 34px;
        text-align: center;
        font-size: 12px;
      }
      .icon {
        transform: rotate(134deg);
        color: #999;
      }
      .active {
        border: 1px solid #F56C6C;
        color: #F56C6C;
        background: #fef0f0;
        border-color: #fbc4c4;
      }
      .content {
        position: relative;
        margin-left: 43px;
        top: -33px;
        min-height: 40px;
        // border: 1px solid #ddd;
      }
      // .content:before {
      //   content: '';
      //   position: absolute;
      //   top: 10px;
      //   left: -10px;
      //   width: 0;
      //   height: 0;
      //   border-right: 10px solid #bbb;
      //   border-bottom: 10px solid transparent;
      //   border-top: 10px solid transparent; 
      // }
      // .content:after {
      //   content: '';
      //   position: absolute;
      //   top: 11px;
      //   left: -9px;
      //   width: 0;
      //   height: 0;
      //   border-right: 9px solid #fff;
      //   border-bottom: 9px solid transparent;
      //   border-top: 9px solid transparent; 
      // }
    }
  }
}
</style>
