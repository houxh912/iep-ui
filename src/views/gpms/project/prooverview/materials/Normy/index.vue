<template>
    <div>
        <el-row :gutter="20">
            <el-col :span="12">
                <div class="cloOne">
                    <div class="topBot">
                        <p class="font">会议纪要</p>
                        <el-button icon="el-icon-picture-outline" type="small">新增</el-button>
                        <el-button icon="el-icon-picture-outline" type="small">关联</el-button>
                    </div>
                    <div class="list">
                        <div class="item" v-for="item in list1" :key="item.id">
                            <i class="el-icon-picture-outline"></i>
                            <span class="content" @click="itemOpen(item)"> {{item.content}} </span>
                            <i style="cursor:pointer;" class="el-icon-picture-outline" @click="deleteOne(item)"></i>
                        </div>
                    </div>
                </div>
            </el-col>
            <el-col :span="12">
                <div class="cloOne">
                    <div class="topBot">
                        <p class="font">项目周报</p>
                        <el-button icon="el-icon-picture-outline" type="small">新增</el-button>
                        <el-button icon="el-icon-picture-outline" type="small">关联</el-button>
                    </div>
                    <div class="list">
                        <div class="item" v-for="item in list2" :key="item.id">
                            <i class="el-icon-picture-outline"></i>
                            <span class="content" @click="itemOpen(item)"> {{item.content}} </span>
                            <i style="cursor:pointer;" class="el-icon-picture-outline" @click="deleteOne(item)"></i>
                        </div>
                    </div>
                </div>
            </el-col>
        </el-row>

    </div>
</template>

<script>
    import { normyList, normyList2 } from '../const.js'
    export default {
        name: 'index',
        data (){
            return {
                list1:normyList,
                list2:normyList2,
            }
        },
        methods :{
            itemOpen (item){
                console.log('详情',item)
            },
            deleteOne (item){
                console.log('delete',item)
            },
        },

    }
</script>

<style lang="scss" scoped>
    .cloOne {
        min-height: 550px;
        border: 1px solid #ccc;
        color: #666;
    }
    .topBot{
        border-bottom: 1px solid #ccc;
        padding: 0 10px 10px;
    }
    .font{
        font-size: 14px;
        padding: 0 10px;
    }
    .list{
        padding: 10px 10px;
        color: #666;
        font-size: 13px;
        line-height: 26px;
        .item{
            margin-bottom: 10px;
        }
        .content{
            cursor: pointer;
            &:hover{
                color: #0000ff;
            }
        }
    }
</style>