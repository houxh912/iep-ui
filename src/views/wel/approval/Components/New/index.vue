<template>
  <div class="edit-wrapper">
    <basic-container>
      <page-header :title="`${name}申请单`" :backOption="backOption"></page-header>
      <component :is="name"></component>
    </basic-container>
  </div>
</template>
<script>
import 转正 from './转正.vue'
import 请假 from './请假.vue'
import 调岗 from './调岗.vue'
import 离职 from './离职.vue'
import 加班 from './加班.vue'
import 出差 from './出差.vue'
import 物品领用 from './物品领用.vue'
import 报销 from './报销.vue'
export default {
  components: {
    转正,
    请假,
    调岗,
    离职,
    加班,
    出差,
    物品领用,
    报销,
  },
  data () {
    return {
      name: this.$route.query.name,
      backOption: {
        isBack: true,
        backPath: this.$route.query.redirect,
      },
    }
  },
}
</script>
<style scoped>
.edit-wrapper >>> .el-form {
  margin-right: 20%;
  margin-top: 50px;
}
</style>
