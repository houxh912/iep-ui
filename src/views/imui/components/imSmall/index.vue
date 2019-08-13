<template>
  <div ref="imbox" class="im-box-small" :style="getPosition" @mousedown="mousedown">
    <span class="title">
      <span>即时消息</span>
      <span class="badge" v-show="$store.getters.imUnreadTotal">{{getUnreadTotal}}</span>
    </span>
    <i class="iconfont icon-arrow-up"></i>
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
      if (event.clientX !== this.mousePosition.x || event.clientY !== this.mousePosition.y) {
        this.move = true
      }
      this.positionChange({
        x: event.clientX - this.mousePosition.x,
        y: event.clientY - this.mousePosition.y,
      })
      this.mousePosition.x = event.clientX
      this.mousePosition.y = event.clientY
    },
    mouseup () {
      document.body.style['user-select'] = 'auto'
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
    getUnreadTotal () {
      if (this.$store.getters.imUnreadTotal) {
        return parseInt(this.$store.getters.imUnreadTotal) > 99 ? '99+' : parseInt(this.$store.getters.imUnreadTotal)
      } else {
        return ''
      }
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
  display: flex;
  justify-content: space-between;
  align-items: center;
  right: 0;
  bottom: 0;
  height: 40px;
  width: 200px;
  padding: 0 20px;
  background: $--color-primary;
  color: #FFFFFF;
  -webkit-box-shadow: 0 2px 12px 0 rgba(0, 0, 0, .1);
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, .1);
  cursor: pointer;
  opacity: .6;
  .title {
    span {
      vertical-align: middle;
    }
    .badge {
      margin-left: 10px;
      display: inline-block;
      padding: 0 7px;
      height: 14px;
      line-height: 14px;
      border-radius: 7px;
      background: #FFFFFF;
      color: $--color-primary;
    }
  }

  &:hover {
    opacity: 1;
  }
}

</style>