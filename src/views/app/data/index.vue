<template>
  <iep-app-layout>
    <div class="data">
      <menus @change-menu="changeMenu"></menus>
      <div class="right">
        <component :is="currentComponet"></component>
      </div>
    </div>
  </iep-app-layout>
</template>
<script>
import Menus from './Menus'
import overview from './overview/'
import organizationalAssets from './organizationalAssets'

export default {
  components: { Menus, overview, organizationalAssets },
  data () {
    return {
      currentComponet: '',
    }
  },
  methods: {
    changeMenu (link) {
      this.currentComponet = link
    },
  },
}
</script>
<style lang="scss" scoped>
.data {
  width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-column-gap: 20px;
  grid-auto-flow: row dense;
  grid-template-columns: minmax(100px, 130px) minmax(100px, 1070px);
  .right {
    margin: 10px 0 30px;
  }
}
</style>
<style scoped>
.data >>> .el-table th.is-leaf,
.data >>> .el-table td {
  border: 0;
}
.data >>> .el-table::before {
  height: 0;
  background: none;
}
</style>
