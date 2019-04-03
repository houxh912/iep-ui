<template>
    <div>
        <div class="cloOne">
            <div class="topBot">
                <div class="font">
                    会议纪要
                    <el-button class="bots" icon="el-icon-picture-outline" type="small" @click="edit">编写</el-button>
                </div>
            </div>
            <div class="list">
                <div class="item2">
                    暂无说明！
                </div>
            </div>
        </div>
        <el-row :gutter="20">
            <!--项目方案-->
            <el-col :span="12">
                <div class="cloOne">
                    <div class="topBot">
                        <p class="font">项目方案</p>
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
            <!--最终成果文档-->
            <el-col :span="12">
                <div class="cloOne">
                    <div class="topBot">
                        <p class="font">最终成果文档</p>
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
        <el-row :gutter="20">
            <!--需求规格说明书-->
            <el-col :span="12">
                <div class="cloOne">
                    <div class="topBot">
                        <p class="font">需求规格说明书</p>
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
            <!--测试文档-->
            <el-col :span="12">
                <div class="cloOne">
                    <div class="topBot">
                        <p class="font font2">测试文档(测试方案、功能测试报告、安全测试报告、性能测试报告、三方测试报告、第三方检测报告等)</p>
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
        <el-row :gutter="20">
            <!--项目合同-->
            <el-col :span="12">
                <div class="cloOne">
                    <div class="topBot">
                        <p class="font">项目合同</p>
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
        </el-row>
        <main-dialog ref="addDialogForm" @load-page="loadPage"></main-dialog>
    </div>
</template>

<script>
    import { normyList, normyList2 } from '../const.js'
    import mixins from '@/mixins/mixins'
    import MainDialog from './mainDialog'
    export default {
        name: 'index',
        components:{
            MainDialog,
        },
        mixins: [mixins],
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
            edit (){
                this.$refs['addDialogForm'].dialogShow = true
                this.$refs['addDialogForm'].methodName = '保存'
            },
            loadPage () {
                // this.loadTable(param)
            },
        },
    }
</script>

<style lang="scss" scoped>
    .cloOne {
        border: 1px solid #ccc;
        color: #666;
        margin-bottom: 5px;
    }
    .topBot{
        border-bottom: 1px solid #ccc;
        padding: 0 10px 10px;
    }
    .font{
        font-size: 14px;
        padding: 0 10px;
        margin-top: 8px;
    }
    .font2{
        padding: 0;
        margin: 0;
        margin-top: 3px;
    }
    .list{
        padding: 10px 10px;
        color: #666;
        font-size: 13px;
        line-height: 26px;
        .item{
            margin-bottom: 10px;
        }
        .item2{
            margin-bottom: 10px;
            text-align: center;
            color: #ccc;
            font-size: 14px;
            height: 40px;
            line-height: 40px;
        }
        .content{
            cursor: pointer;
            &:hover{
                color: #0000ff;
            }
        }
    }
    .bots{
        margin-left: 10px;
    }
</style>