<template>
  <iep-slot-card :title="title">
    <template slot="left">
      <slot name="left"></slot>
    </template>
    <template slot="right">
      <slot name="right"></slot>
    </template>
    <div class="total-wrapper">
      <div class="total-item" v-for="(item, index) in dataMap" :key="index">
        <div class="value">{{judgeSN(item)}}</div>
        <div class="label"><a href="#" @click="handleClick(index)">{{index}}</a></div>
      </div>
    </div>
  </iep-slot-card>
</template>
<script>
import { validatenull } from '@/util/validate'
export default {
  name: 'IepStatisticsHeader',
  props: {
    title: {
      type: String,
      required: true,
    },
    dataMap: {
      type: Object,
      required: true,
    },
    typeUrlMap: {
      type: Object,
      required: false,
      default: () => { },
    },
  },
  methods: {
    judgeSN (value) {
      if (typeof (value) === 'number') {
        return this.$options.filters.parseToM(value)
      } else {
        return value
      }
    },
    handleClick (index) {
      if (!validatenull(this.typeUrlMap)) {
        this.$openPage(this.typeUrlMap[index])
      }
    },
  },
}
</script>
<style lang="scss" scoped>
.total-wrapper {
  display: flex;
  justify-content: space-around;
  margin: 12px 0;
  .total-item {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border-right: 1px solid rgb(233, 233, 233);
    width: 100%;
    &:last-child {
      border-right: none;
    }
    .value {
      font-size: 24px;
      color: rgb(48, 49, 51);
    }
    .label {
      & > a {
        color: #999;
      }
    }
  }
}
</style>
