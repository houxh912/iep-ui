<template>
    <div class="visiting-log">
      <leader-top></leader-top>
      <iep-to-dev></iep-to-dev>
    </div>
</template>
<script>
import LeaderTop from '../LeaderTop'
export default {
    components: {
        LeaderTop,
    },
}
</script>
<style scoped lang='scss'>
.visiting-log{
    padding: 20px;
}
</style>
