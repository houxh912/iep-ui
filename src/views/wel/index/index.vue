<template>
  <div class="wel-wrapper">
    <information class="wel-content" />
    <about-me class="wel-aside"></about-me>
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
    }
  },
  computed: {
    ...mapGetters(['website']),
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
  },
}
</script>

<style scoped="scoped" lang="scss">
.wel-wrapper {
  display: flex;
  .wel-content {
    display: block;
    // width: 75%;
  }
  // .wel-container {
  //   flex: 1;
  // }
  .wel-aside {
    flex: 0 0 300px;
  }
}
@media (min-width: 1024px) and (max-width: 1200px) {
  .wel-wrapper {
    .wel-aside {
      flex: 0 0 220px;
    }
  }
}
@media screen and (max-width: 1024px) {
  .wel-wrapper {
    .wel-content {
      display: block;
      width: 100%;
    }
    .wel-aside {
      flex: 0 0 0;
    }
  }
}
</style>
