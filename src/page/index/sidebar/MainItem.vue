<template>
  <div class="main-item-wrapper">
    <span class="main-link" @click="open">{{website.menu.firstMenu.name}}</span>
    <span v-if="subText">-</span>
    <span>{{subText}}</span>
  </div>
</template>
<script>
import website from '@/const/website'
export default {
  name: 'MainItem',
  props: {
    mainMenu: {
      type: Object,
      required: true,
      default: () => { },
    },
  },
  data () {
    return {
      website,
    }
  },
  computed: {
    subText () {
      console.log(this.mainMenu.label)
      const titleArray = this.mainMenu.label.split('-')
      return titleArray.length >= 2 ? titleArray[1] : ''
    },
  },
  methods: {
    open () {
      this.$router.push({
        path: website.menu.firstMenu.path,
      })
    },
  },
}
</script>
<style lang="scss" scoped>
.main-item-wrapper {
  font-size: 20px;
  text-align: center;
  padding: 20px 20px;
  border-bottom: 2px solid #eee;
  margin-bottom: 5px;
  color: #666;
  .main-link {
    cursor: pointer;
    &:hover {
      color: #333;
      border-bottom: 1px solid #666;
    }
  }
}
</style>
