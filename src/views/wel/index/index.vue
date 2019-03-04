<template>
  <div class="wel-wrapper">
    <information class="wel-content" />
    <transition name="el-zoom-in-center">
      <about-me class="wel-aside" v-if="showAside"></about-me>
    </transition>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import aboutMe from './wel-aside/'
import information from './wel-content/'

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
      showAside: true,
    }
  },
  computed: {
    ...mapGetters(['website']),
  },
  methods: {
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
    handleShowAside () {
      this.showAside = true
    },
  },
}
</script>

<style scoped="scoped" lang="scss">
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
    margin-right: 300px;
    box-sizing: border-box;
  }
  .wel-aside {
    width: 300px;
    position: fixed;
    right: 0;
    z-index: 102;
  }
}
@media (min-width: 1024px) and (max-width: 1199px) {
  .wel-wrapper {
    .wel-content {
      margin-right: 0;
      width: 100%;
    }
    .wel-aside {
      right: 0;
    }
  }
}
@media (min-width: 0px) and (max-width: 1138px) {
  .wel-wrapper {
    .wel-content {
      margin-right: 0;
      width: 100%;
    }
    .wel-aside {
      right: -300px;
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
      margin-right: 0;
    }
    .wel-aside {
      right: -300px;
    }
  }
}
</style>
