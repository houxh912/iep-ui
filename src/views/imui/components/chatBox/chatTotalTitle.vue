<template>
  <div class="chat-total-title"  @mousedown="mousedown"></div>
</template>

<script>
export default {
  name: 'chat-total-title',
  data () {
    return {
      position: {
        x: null,
        y: null,
      },
    }
  },
  methods: {
    mousedown (event) {
      document.body.style['user-select'] = 'none'
      document.addEventListener('mousemove', this.mousemove)
      document.addEventListener('mouseup', this.mouseup)
      this.position.x = event.clientX
      this.position.y = event.clientY
    },
    mousemove (event) {
      this.$emit('positionChange', {
        x: event.clientX - this.position.x,
        y: event.clientY - this.position.y,
      })
      this.position.x = event.clientX
      this.position.y = event.clientY
    },
    mouseup () {
      document.removeEventListener('mousemove', this.mousemove)
      document.removeEventListener('mouseup', this.mouseup)
    },
  },
}
</script>

<style lang="scss" scoped>
.chat-total-title {
  flex: 0 0 80px;
  background: #ECECEC;
  cursor: move;
}
</style>