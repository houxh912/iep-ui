<template>
  <div class="chat-total-title"  @mousedown="mousedown">
    <i @mousedown.stop="" @mousemove.stop="" class="icon-font icon-guanbi" @click.stop="chatClose"></i>
  </div>
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
    chatClose () {
      this.$store.dispatch('updateCurrentChat', {chat: null, show: false})
    },
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
      document.body.style['user-select'] = 'auto'
      document.removeEventListener('mousemove', this.mousemove)
      document.removeEventListener('mouseup', this.mouseup)
    },
  },
}
</script>

<style lang="scss" scoped>
.chat-total-title {
  position: relative;
  flex: 0 0 80px;
  background: #ECECEC;
  cursor: move;
  i {
    display: block;
    position: absolute;
    right: 5px;
    top: 15px;
    font-size: 14px;
    cursor: auto;
    &:hover {
      color: $--color-primary;
    }
  }
}
</style>