<template>
    <div class="project-report">
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
.project-report{
    padding: 20px;
}
</style>
