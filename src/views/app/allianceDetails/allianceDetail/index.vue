<template>
  <div class="allianceDetails">
    <div class="menus">
      <menus @chnage="chnage"></menus>
    </div>
    <div class="router">
      <contentView :index="activeIndex"></contentView>
    </div>
  </div>
</template>

<script>
import menus from './menus'
import contentView from './content'

export default {
  components: { menus, contentView },
  daat () {
    return {
      index: '1',
    }
  },
  methods: {
    chnage (index) {
      this.activeIndex = index
    },
  },
}
</script>

<style lang="scss" scoped>
.allianceDetails {
  width: 1200px;
  display: flex;
  margin: 20px auto;
  .menus {
    width: 300px;
  }
  .router {
    width: 900px;
  }
}
</style>
