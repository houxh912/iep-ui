<template>
  <div class="five-key">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'IepFiveKay',
  data () {
    return {
    }
  },
}
</script>

<style lang="scss" scoped>
.five-key {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border: 1px solid #eee;
  border-radius: 5px;
}
</style>
