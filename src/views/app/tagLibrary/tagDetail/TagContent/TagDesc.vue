<template>
    <div class="tag-desc">
        <div class="tag-main">
            <p class="title" v-text='title'></p>
            <span class="sign" v-text="sign"></span>
            <span class="explain fr">
                <i class="icon-bangzhu"></i>
                <span>标签规范说明</span>
            </span>
            <p class="content">{{content}}</p>
            <span class="more fr">
                <span>查看更多</span>
                <i class="icon-jiantouxiangyou"></i>
            </span>
        </div>      
    </div>
</template>
<script>
export default {
    data () {
        return{
            title:'互联网+政务服务',
            sign: '行业知识',
            content:'实现互联网+政务服务十我国政府转变职能、提高智力能力、建设人民满意的服务型政府的关键一步，但要深刻认识到，我国政务服务建设仍然存在着一系列问题和严峻挑战：1、需求导向不足。2、资源整合不够。3、服务能力欠缺。4、监管体系薄弱。5、生态发展不足、只有正确认识互联网+政务服务，准确把握其限制因素，才能有效地推动政务服务进一步完善.',
        }
    },
}
</script>
<style lang="scss" scoped>
.tag-desc{
    margin-bottom: 20px;
}
.tag-main{
    overflow: hidden;
}
.title{
    display:inline-block;
    font-size: 18px;
    color:#333;
    margin-right: 10px;
}
.sign{
    padding: 0 5px;
    border: 1px solid #c73e3e;
    color: #c73e3e;
    font-size: 14px;
    border-radius: 3px;
    background-color: rgba(231, 168, 168, 0.1);
    cursor: pointer;
    &:hover{
        background-color: rgba(184, 105, 105, 0.1);
    }
}
.fr{
    float:right;
}
.explain{
    color:#999;
    line-height:30px;
    i{
        margin-right:8px;
        vertical-align: -2px;
    }
}
.content{
    margin-bottom: 5px;
    font-size: 14px;
    color:#666;
    line-height:28px;
}
.more{
    padding:0 5px;
    border: 1px solid #eee;
    font-size: 14px;
    color:#c73e3e;
    border-radius: 3px;
    cursor: pointer;
    span{
        margin-right: 5px;
    }
    i{
        display:inline-block;
        transform: rotate(90deg);
        vertical-align: -2px;
    }
}
</style>
