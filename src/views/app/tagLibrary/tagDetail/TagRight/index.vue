<template>
    <div class="piece">
        <about-tags></about-tags>
        <statistics></statistics>
    </div>
</template>
<script>
import AboutTags from './AboutTags'
import Statistics from './Statistics'
export default {
    components: {
        AboutTags,
        Statistics,
    },
}
</script>
<style lang="scss" scoped>
.piece{
    border-top:1px solid #eee;
    grid-column-start:3;
    grid-column-end:4;
}
</style>
