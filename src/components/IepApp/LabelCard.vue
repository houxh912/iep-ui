<template>
  <div class="label">
    <div v-if="dataList.length !== 0">
      <div v-for="(item,index) in dataList" :key="index" class="piece" @click="handleDetail(item)">
        {{typeof item === 'object' ? item[name] : item}}
      </div>
    </div>
    <IepNoData v-else></IepNoData>
  </div>
</template>
<script>
export default {
  name: 'IepAppLabelCard',
  props: {
    dataList: {
      type: Array,
      required: false,
      default: () => [],
    },
    name: {
      type: String,
      default: 'name',
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    handleDetail (row) {
      if (!this.disabled) {
        let val = typeof row === 'object' ? row.name : row
        this.$openTagDetail(val)
      } else {
        this.$emit('click', row)
      }
    },
  },
}
</script>
<style lang="scss" scoped>
.label {
  .piece {
    padding: 4px 15px;
    border: 1px solid #f0f0f0;
    border-radius: 2px;
    float: left;
    margin: 5px 4px;
    color: #333;
    transition-duration: 0.3s;
    &:hover {
      background-color: #fef6f4;
      border: 1px solid #dc8687;
      color: #dc8687;
      cursor: pointer;
    }
  }
}
</style>
