<template>
    <div class="tag-content piece">
        <tag-desc></tag-desc>
        <about-person></about-person>
        <datas></datas>
    </div>
</template>
<script>
import TagDesc from './TagDesc'
import AboutPerson from './AboutPerson'
import Datas from './Datas'
export default {
    components:{
        TagDesc,
        AboutPerson,
        Datas,
    },
}
</script>
<style lang="scss" scoped>
.tag-content{
    padding: 15px 20px;
    border-right: 1px solid #eee;
    border-top: 1px solid #eee;
}
.piece{
    grid-column-start:1;
    grid-column-end:3;

}
</style>
