<template>
    <div class="visualization">
        <img :src="img">
    </div>
</template>
<script>
export default {
    data (){
        return{
            img:[require('./img/date.jpg')],
        }
    },
}
</script>
<style lang="scss" scoped>
.visualization{
    width: 100%;
    img{
        width: 100%;
    }
}
</style>

