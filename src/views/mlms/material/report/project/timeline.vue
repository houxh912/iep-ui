<template>
  <div class="time-line">
    <div class="item" v-for="(item, index) in list" :key=index>
      <div class="before" v-if="item.year">{{item.year}}</div>
      <div class="middle">
        <div class="tail"></div>
        <div class="date icon" v-if="item.year"><i class="icon-jiantouxiangyou"></i></div>
        <div class="date" v-else @click="actively(index, 'month')" :class="active===index?'actively':''">{{item.date}}</div>
        <div class="content">
          <slot name="content" :row="item" :index="index"></slot>
        </div>
      </div>
      <div v-if="active===index">
        <div class="child" v-for="(child, i) in item.children" :key="i" :class="activeChild===i?'actively':''">
          <div class="before" @click="actively(i, 'week')">
            <div class="title">{{child.title}}</div>
            <div class="sub-title">{{child.subTit}}</div>
          </div>
          <div class="middle">
            <div class="tail"></div>
            <div class="date" @click="actively(i, 'week')"><i class="spot"></i></div>
            <div class="content"></div>
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
      activeChild: -1,
    }
  },
  methods: {
    actively (index, type) {
      if (type === 'month') {
        this.active = index
        this.activeChild = -1
      } else {
        this.activeChild = index
      }
      this.$emit('actively', index, type)
    },
  },
}
</script>

<style lang="scss" scoped>
.time-line {
  .item {
    width: 150px;
    position: relative;
    min-height: 50px;
    .before {
      width: 100px;
      padding: 5px 0 0;
      position: absolute;
      top: 0px;
      text-align: right;
    }
    .middle {
      margin-left: 100px;
      position: relative;
      padding-left: 10px;
      .tail {
        position: absolute;
        left: 27px;
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
        cursor: pointer;
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
      }
    }
    .child {
      position: relative;
      min-height: 50px;
      .before {
        cursor: pointer;
        text-align: right;
        margin-top: -20px;
        .title {
          font-size: 14px;
          color: #666;
        }
        .sub-title {
          font-size: 12px;
          color: #999;
        }
      }
      .middle {
        margin-left: 108px;
      }
      .tail {
        left: 20px;
        top: 21px;
        height: calc(100% - 21px);
      }
      .date {
        width: 18px;
        height: 18px;
        .spot:before {
          content: "";
          position: absolute;
          height: 4px;
          width: 4px;
          border: 2px solid #ddd;
          border-radius: 50%;
          background-color: #ddd;
          top: 6px;
          left: 17px;
        }
      }
    }
    .actively {
      color: #F56C6C;
      .title {
        color: #F56C6C !important;
      }
      .date {
        border: 1px solid #F56C6C;
        .spot:before {
          border: 2px solid #F56C6C;
          background-color: #F56C6C;
        }
      }
    }
  }
}
</style>
