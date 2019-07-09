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
  grid-template-columns: minmax(100px, 139px) minmax(100px, 1061px);
  .test {
    width: 100%;
    padding: 20px;
    border: 1px solid #eee;
    > p {
      margin: 0;
    }
  }
  .right {
    margin: 10px 0 10px;
  }
}
</style>
<style scoped>
.data >>> .el-table th.is-leaf,
.data >>> .el-table td {
  border: 0;
}
.data >>> .el-table th,
.data >>> .el-table td {
  padding: 6px 0;
}
.data >>> .el-table::before {
  height: 0;
  background: none;
}
</style>
