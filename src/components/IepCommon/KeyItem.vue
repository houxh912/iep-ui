<template>
  <div class="icon-box" :class="isChecked !==false ? 'red' : ''">
    <i :class="icon"></i>
    <span>{{name}}</span>
  </div>
</template>

<script>
export default {
  name: 'IepKeyItem',
  props: {
    icon: {
      type: String,
      default: '',
    },
    name: {
      type: String,
      default: '',
    },
    isChecked: {
      default: false,
    },
  },
}
</script>

<style lang="scss" scoped>
.icon-box {
  display: inline-block;
  margin: 0 5px;
  padding: 10px;
  cursor: pointer;
  color: #333;
  i {
    display: block;
    text-align: center;
    font-size: 22px !important;
  }
  span {
    display: block;
    font-size: 16px;
  }
}
.icon-box:hover {
  color: #F56C6C !important;
}
.red {
  color: #F56C6C;
}
</style>
