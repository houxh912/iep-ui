<template>
  <div ref="imbox" class="im-box-small" :style="getPosition" @mousedown="mousedown">
    <el-badge class="unread-point"
              v-show="$store.getters.imUnreadTotal"
              :max="99"
              :value="$store.getters.imUnreadTotal">
      <img @mousemove.prevent="" class="headimage" :src="$store.getters.userInfo.avatar"/>
    </el-badge>
    <img @mousemove.prevent="" v-show="!$store.getters.imUnreadTotal" class="headimage" :src="$store.getters.userInfo.avatar"/>
  </div>
</template>

<script>
export default {
  name: 'im-ui-small',
  data () {
    return {
      mousePosition: {
        x: 0,
        y: 0,
      },
      position: {
        x: 0,
        y: 0,
      },
      boxWidth: 0,
      boxHeight: 0,
      move: false,
    }
  },
  mounted () {
    this.boxWidth = this.$refs.imbox.offsetWidth
    this.boxHeight = this.$refs.imbox.offsetWidth
  },
  methods: {
    positionChange (translate) {
      if (this.position.x + translate.x < 0 && this.position.x + translate.x > this.boxWidth - this.windowSize.width) {
        this.position.x = this.position.x + translate.x
      }
      if (this.position.y + translate.y < 0 && this.position.y + translate.y > this.boxHeight - this.windowSize.height) {
        this.position.y = this.position.y + translate.y
      }
    },
    mousedown () {
      document.body.style['user-select'] = 'none'
      document.addEventListener('mousemove', this.mousemove)
      document.addEventListener('mouseup', this.mouseup)
      this.mousePosition.x = event.clientX
      this.mousePosition.y = event.clientY
    },
    mousemove (event) {
      this.move = true
      this.positionChange({
        x: event.clientX - this.mousePosition.x,
        y: event.clientY - this.mousePosition.y,
      })
      this.mousePosition.x = event.clientX
      this.mousePosition.y = event.clientY
    },
    mouseup () {
      if (!this.move) {
        this.$emit('showLarge')
      }
      this.move = false
      document.removeEventListener('mousemove', this.mousemove)
      document.removeEventListener('mouseup', this.mouseup)
    },
  },
  computed: {
    getPosition () {
      return {
        transform: `translate(${this.position.x}px, ${this.position.y}px)`,
      }
    },
    windowSize () {
      return this.$store.getters.windowSize
    },
  },
  watch: {
    windowSize () {
      this.position = {
        x: 0,
        y: 0,
      }
    },
  },
}
</script>

<style lang="scss" scoped>
@keyframes flash {
  from {
    opacity: 0
  }
  to {
    opacity: 1
  }
}
.im-box-small {
  box-sizing: border-box;
  position: fixed;
  right: 0;
  bottom: 0;
  background: #FFFFFF;
  box-shadow: 1px 1px 50px rgba(0,0,0,.3);
  border-radius: 30px;
  cursor: move;
  opacity: .4;
  .headimage {
    height: 60px;
    width: 60px;
    border-radius: 30px;
    vertical-align: middle;
    cursor: pointer;
  }
  &:hover {
    opacity: 1;
  }
}

</style>