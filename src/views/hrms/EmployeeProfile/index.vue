<template>
  <div>
    <basic-container>
      <page-header title="员工" :replaceText="replaceText" :data="[10 ,5, 1]"></page-header>
      <div>人力模块</div>
    </basic-container>
  </div>
</template>
<script>
import PageHeader from './PageHeader'
export default {
  components: { PageHeader },
  data () {
    return {
      replaceText: (data) => `（本周新增${data[0]}位正式员工，新增${data[1]}位实习生，离职${data[2]}人）`,
    }
  },
}
</script>
