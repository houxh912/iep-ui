<template>
  <div>
    <div class="im-box" :style="getPosition()" @mousedown="mousedown">
      <div @click="showLarge" style="margin: 0 5px;padding: 5px 10px;cursor: pointer;">
        <img @click.stop="" class="headimage" :src="$store.getters.userInfo.avatar"/>
        <span class="username">{{$store.getters.userInfo.realName}}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'im-ui-small',
  data () {
    return {
      moveHorizontal: 0,
      moveVertical: 0,
    }
  },
  methods: {
    showLarge () {
      this.$emit('showLarge')
    },
    getPosition () {
      return {
        right: this.moveHorizontal + 'px',
        bottom: this.moveVertical + 'px',
      }
    },
    mousedown () {
      document.body.style['user-select'] = 'none'
      document.addEventListener('mousemove', this.mousemove)
      document.addEventListener('mouseup', this.mouseup)
    },
    mousemove (event) {
      console.log(document.body.clientWidth - event.clientX)
    },
    mouseup () {
      document.removeEventListener('mousemove', this.mousemove)
      document.removeEventListener('mouseup', this.mouseup)
    },
  },
}
</script>

<style lang="scss" scoped>
.im-box {
  position: fixed;
  right: 0;
  bottom: 0;
  height: 50px;
  background: #FFFFFF;
  border-radius: 2px;
  box-shadow: 1px 1px 50px rgba(0,0,0,.3);
  cursor: move;
  .headimage {
    height: 40px;
    width: 40px;
    border-radius: 20px;
    cursor: move;
    vertical-align: middle
  }
  .username {
    padding-left: 10px;
    display: inline-block;
    vertical-align: middle;
    line-height: 40px;
    font-size: 16px;
    color: #000;
  }
}

</style>