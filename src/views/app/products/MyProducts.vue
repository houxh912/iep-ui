<template>
    <div class="myProducts">
        <div class="title">我的产品<span>（{{num[0]}}）</span></div>
        <div class="productsBtn">
            <el-button size="small">产品官网</el-button>
            <el-button size="small">代理政策</el-button>
            <el-button size="small">我要代理</el-button>
            <el-button size="small">申请技术服务</el-button>
            <el-button size="small">联合开发</el-button>
        </div>
        <div class="deletionBox">
            <div class="coduleDeletion">
                分类：
                <div v-for="(item,index) in coduleDeletion" :key="index" class="pieceDeletion">{{item}}</div>
            </div>
            <div class="productsDeletion">
                分类：
                <div v-for="(item,index) in productsDeletion" :key="index" class="pieceDeletion">{{item}}</div>
            </div>
        </div>
        <div class="myProductsBox">
            <el-card shadow="never"  v-for="(item,index) in Module" :key="index" class="moduleList">
                <i class="iconfont" :class="item.icon"></i>
                <hr>
                <span class="name">{{item.name}}</span>
                <p class="desc">{{item.desc}}</p>
                <RouterLink class="inline change" to="">详情介绍>
                </RouterLink>
            </el-card>
        </div>
    </div>
</template>
<script>
export default {
    data () {
        return {
            num:[18],
            coduleDeletion: ['全部','基础','通用','业务','分类4'],            
            productsDeletion: ['全部','DMA','营商通','国策','智慧赋能平台'],    
            Module: [
                {icon:'icon-tongyongleiziyuanpeizhi',name:'资源配置模块',desc:'支持各单位应用系统的表结构导入本系统，通过配置可实现数据元配置。',to:''},
                {icon:'icon-qingdan',name:'清单管理模块',desc:'提供数据元的频率分析、同义词分析提供数据资源管理部门对彰据元、倍关联分析等功能',to:''},
                {icon:'icon-hetongbianzhi-',name:'目录编制模块',desc:'提供部门数据元、信息资源总屋排行可共享开放排行，热门资翻可',to:''},
                {icon:'icon-chaxun',name:'资源查询模块',desc:'表结构导入本系统，通过配置可实现资源查询模块。',to:''},
                {icon:'icon-tongji1',name:'数据元分析模块',desc:'提供数据元的频率分析、同义词分析提供数据资源管理部门对彰据元、倍关联分析等功能,频率分析统计',to:''},
                {icon:'icon-shenhexitong',name:'资源审核模块',desc:'息资源的常态化审核管理',to:''},
                {icon:'icon-yunzhuomian',name:'资源桌面导航模块',desc:'提供部门数据元、信息资源总屋排行可共享开放排行，热门资翻可',to:''},
                {icon:'icon-tongji1',name:'资源统计模块',desc:'支持各单位应用系统的表结构导入本系统，通过配置可实现资源统计。',to:''},
            ],
        }
    },
}
</script>
<style lang="scss" scoped>
.myProducts{
    grid-column-start: 1;
    grid-column-end: 4; 
    text-align: center;
    .title{
        height: 60px;
        line-height: 60px;
        font-size: 18px;
        color: #333;
        span{
            font-size: 14px;
            color: #999;
        }
    }
    .productsBtn{
        width: 100%;
    }
    .coduleDeletion,.productsDeletion{
        width: 50%;
        float: left;
        text-align: left;
        margin:20px 0;
        .pieceDeletion{
            display: inline;
            padding:2px 6px;
            border-radius:6px;
            margin:0 10px;
        }
    }
    .myProductsBox{
        width: 100%;
        display: grid;
        grid-auto-flow: row dense;
        grid-row-gap: 10px;
        grid-column-gap: 10px;
        grid-template-columns: minmax(100px, 1fr) minmax(100px, 1fr) minmax(100px, 1fr) minmax(100px, 1fr);
        .moduleList{
            text-align: center;
            .iconfont{
                font-size: 46px;
                color: #999;
                display: block;
            }
            hr{
                margin:20px 0 10px;
            }
            .name{
                font-size: 16px;
                color: #333;
                line-height: 55px;
            }
            .desc{
                color: #999;
                overflow : hidden;
                text-overflow: ellipsis;
                display: -webkit-box;
                -webkit-line-clamp: 2;
                -webkit-box-orient: vertical;
            }
            .change {
                padding: 4px 20px;
                border-radius: 3px;
                font-size: 14px;
                text-align: center;
                color: #cb3737;
                margin-left: 10px;
                border: 1px solid #cb3737;
                -webkit-transition: all 0.5s;
                transition: all 0.5s;
                &:focus,
                &:hover {
                    cursor: pointer;
                    background-color: #cb3737;
                    color: #fff;
                    outline: none;
                }
            }
        }
    }
}
</style>
