<template>
  <div class="wel-wrapper">
    <span class="show" @click="show"><i class="el-icon-caret-right"></i>关于我</span>
    <information class="wel-content" :style="{'padding-right':padding+'px'}" />
    <transition name="move">
      <about-me class="wel-aside" v-if="hide" :style="{height:asideHeight+'px'}"></about-me>
    </transition>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import aboutMe from './wel-aside/index'
import information from './wel-content/information'

export default {
  name: 'Wel',
  components: { aboutMe, information },
  data () {
    return {
      activeNames: ['1', '2', '3', '4'],
      DATA: [],
      text: '',
      actor: '',
      count: 0,
      isText: false,
      asideHeight: '',
      clientHeight: '',
      sss: '',
    }
  },
  created () {
    this.asideHeight = document.body.clientHeight - 64
    // console.log(this.sss)
  },
  computed: {
    ...mapGetters(['website']),
    hide () {
      return this.$store.state.hideAside.hide
    },
    padding () {
      return this.$store.state.hideAside.padding
    },
  },
  watch: {
    width () {
    },
    right () {
    },
  },
  methods: {
    //我要创建添加按钮事件
    handelAdd () {
    },
    getData () {
      if (this.count < this.DATA.length - 1) {
        this.count++
      } else {
        this.count = 0
      }
      this.isText = true
      this.actor = this.DATA[this.count]
    },
    setData () {
      let num = 0
      let count = 0
      let active = false
      let timeoutstart = 5000
      let timeoutend = 1000
      let timespeed = 10
      setInterval(() => {
        if (this.isText) {
          if (count == this.actor.length) {
            active = true
          } else {
            active = false
          }
          if (active) {
            num--
            this.text = this.actor.substr(0, num)
            if (num == 0) {
              this.isText = false
              setTimeout(() => {
                count = 0
                this.getData()
              }, timeoutend)
            }
          } else {
            num++
            this.text = this.actor.substr(0, num)
            if (num == this.actor.length) {
              this.isText = false
              setTimeout(() => {
                this.isText = true
                count = this.actor.length
              }, timeoutstart)
            }
          }
        }
      }, timespeed)
    },
    show () {
      this.$store.commit('hideAside')
    },
  },
  mounted () {
    const that = this
    window.onresize = function () {
      // console.log('22e1')
      // that.clientHeight = `${document.documentElement.clientHeight}px`;
      // console.log(document.body.clientHeight)
      that.sss = document.body.clientWidth
      var width = document.body.clientWidth || document.documentElement.clientWidth
      // console.log(223123123)
      if (1025 < width < 1270) {
        // console.log(2222)
        this.$store.commit('response')
      } else if (width < 1025) {
        this.$store.state.hideAside.padding = 0
      }
    }
  },
}
</script>

<style scoped="scoped" lang="scss">
@keyframes animationIn {
  0% {
    transform: translate(0, 0);
  }
  100% {
    transform: translate(0, 0);
  }
}
@keyframes animationOut {
  0% {
    transform: translate(0, 0);
  }
  100% {
    transform: translate(100%, 0);
  }
}

.move-enter {
  transform: translate(0, 0);
}
.move-enter-active {
  animation: animationIn 1s;
}
.move-leave {
  transform: translate(0, 0);
}
.move-leave-active {
  animation: animationOut 1s;
}

.wel-wrapper {
  display: flex;
  position: relative;
  .show {
    position: fixed;
    display: inline-block;
    width: auto;
    height: 30px;
    color: #bfbfbf;
    background: #fafafa;
    font-size: 16px;
    text-align: center;
    line-height: 30px;
    border: 1px solid #eee;
    top: 70px;
    right: 10px;
    z-index: 101;
    i {
      transform: rotate(180deg);
    }
  }
  .wel-content {
    width: 100%;
    box-sizing: border-box;
    padding-right: 320px;
  }
  .wel-aside {
    width: 300px;
    position: fixed;
    top: 64px;
    right: 0;
    z-index: 102;
  }
}
@media (min-width: 1024px) and (max-width: 1270px) {
  .wel-wrapper {
    .wel-content {
      padding-right: 240px;
    }
    .wel-aside {
      width: 220px;
    }
  }
}
@media (min-width: 0px) and (max-width: 1023px) {
  .wel-wrapper {
    .show {
      display: none;
    }
    .wel-content {
      width: 100%;
      padding-right: 20px;
    }
    .wel-aside {
      display: none;
    }
  }
}
</style>
