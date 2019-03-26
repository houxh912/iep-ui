<template>
    <div>
        <operation-container>
            <template slot="left">
                <iep-button @click="addProject" class="add" type="danger">
                    新增
                </iep-button>
                <iep-button @click="deleteAll" class="add">
                    批量删除
                </iep-button>
            </template>
            <template slot="right">
                <operation-search
                        @search="searchPage"
                        @closed="dialogIsShow = true"
                        advanceSearch
                        placeHolder="请输入项目名称"
                        :dialogIsShow="dialogIsShow">
                    <!--title-->
                    <el-row class="search">
                        <el-col :span="23">
                            高级搜索
                        </el-col>
                        <el-col :span="1">
                            <i class="iconfon el-icon-plus" @click="closeDialog" style="cursor: pointer;"></i>
                        </el-col>
                    </el-row>
                    <!--表单-->
                    <el-form :model="paramForm" label-width="120px" size="mini">
                        <!--项目名称-->
                        <el-form-item label="项目名称:">
                            <el-input v-model="paramForm.name" placeholder="请输入项目名称"></el-input>
                        </el-form-item>
                        <!--项目阶段-->
                        <el-form-item label="项目阶段:">
                            <el-select v-model="paramForm.stage" placeholder="请选择项目阶段">
                                <el-option
                                        v-for="item in stageOptions"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value">
                                </el-option>
                            </el-select>
                        </el-form-item>
                        <!--项目类型-->
                        <el-form-item label="项目类型:">
                            <el-select v-model="paramForm.protype" placeholder="请选择项目类型">
                                <el-option
                                        v-for="item in typeOptions"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value">
                                </el-option>
                            </el-select>
                        </el-form-item>
                        <!--业务类型-->
                        <el-form-item label="业务类型:">
                            <el-select v-model="paramForm.bustype" placeholder="请选择业务类型">
                                <el-option
                                        v-for="item in bustypeOptions"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value">
                                </el-option>
                            </el-select>
                        </el-form-item>
                        <!--项目预算（万元）-->
                        <el-form-item label="项目预算(万元):">
                            <el-input v-model="paramForm.budget.num1" placeholder="请输入数字" class="num"></el-input>-
                            <el-input v-model="paramForm.budget.num2" placeholder="请输入数字" class="num"></el-input>
                        </el-form-item>
                        <!--合同金额(元)-->
                        <el-form-item label="合同金额(元):">
                            <el-input v-model="paramForm.pact.num1" placeholder="请输入数字" class="num"></el-input>-
                            <el-input v-model="paramForm.pact.num2" placeholder="请输入数字" class="num"></el-input>
                        </el-form-item>
                        <!--市场经理-->
                        <el-form-item label="市场经理:">
                            <el-input v-model="paramForm.manager" placeholder="请输入市场经理姓名"></el-input>
                        </el-form-item>
                        <!--项目指导人-->
                        <el-form-item label="项目指导人:">
                            <el-input v-model="paramForm.guide" placeholder="请输入项目指导人姓名"></el-input>
                        </el-form-item>
                        <!--是否关联产品-->
                        <el-form-item label="是否关联产品:">
                            <el-select v-model="paramForm.relevancy" placeholder="请选择是否关联产品">
                                <el-option
                                        v-for="item in isRelevOptions"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value">
                                </el-option>
                            </el-select>
                        </el-form-item>
                        <!--承接部门-->
                        <el-form-item label="承接部门:">
                            <el-select v-model="paramForm.carry" filterable placeholder="请选择承接部门">
                                <el-option
                                        v-for="item in undertakeOptions"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value">
                                </el-option>
                            </el-select>
                        </el-form-item>
                        <!--合作部门-->
                        <el-form-item label="合作部门:">
                            <el-select v-model="paramForm.join" filterable placeholder="请选择合作部门">
                                <el-option
                                        v-for="item in undertakeOptions"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value">
                                </el-option>
                            </el-select>
                        </el-form-item>
                        <!--发布时间-->
                        <el-form-item label="发布时间:">
                            <el-row>
                                <el-col :span="12" class="smallcol">
                                    <el-date-picker value-format="yyyy-MM-dd" type="date" placeholder="选择日期" v-model="paramForm.time.opentime"></el-date-picker>
                                </el-col>
                                <el-col :span="1">
                                    -
                                </el-col>
                                <el-col :span="11" class="smallcol">
                                    <el-date-picker value-format="yyyy-MM-dd" type="date" placeholder="选择日期" v-model="paramForm.time.closetime"></el-date-picker>
                                </el-col>
                            </el-row>
                        </el-form-item>
                        <!--发布人-->
                        <el-form-item label="发布人:">
                            <el-input v-model="paramForm.issue" placeholder="请输入发布人姓名"></el-input>
                        </el-form-item>
                        <!--按钮组-->
                        <el-form-item>
                            <el-button-group>
                                <el-button size="small" class="searchbot" type="danger" @click="searchPage">搜索</el-button>
                                <el-button size="small" @click="closeDialog">取消</el-button>
                            </el-button-group>
                        </el-form-item>
                    </el-form>
                </operation-search>
            </template>
        </operation-container>
        <iep-table :isLoadTable="isLoadTable" :pagination="pagination" :columnsMap="columnsMap" :pagedTable="pagedTable" @size-change="handleSizeChange" @current-change="handleCurrentChange" is-mutiple-selection @selection-change="selectionChange">
            <el-table-column  label="项目名称" slot="before-columns" width="350px">
                <template slot-scope="scope">
                    <div style="cursor: pointer;" @click="jumpSurvey(scope.row)">
                        <span>{{ pagedTable[0].name }}</span>
                    </div>
                </template>
            </el-table-column>
            <el-table-column label="操作">
                <template slot-scope="scope">
                    <el-button size="small" type="text" @click="jumpSurvey">详情</el-button>
                    <el-button size="small" type="text">编辑</el-button>
                    <el-button size="small" type="text" @click="deleteOne(scope.row)">删除</el-button>
                </template>
            </el-table-column>
        </iep-table>
    </div>
</template>

<script>
    import mixins from '@/mixins/mixins'
    import { stageOptions, typeOptions, bustypeOptions, isRelevOptions, undertakeOptions, columnsMap, pagedTable } from './const.js'
    export default {
        data () {
            return {
                addDialogShow:false,
                isLoadTable:false,
                stageOptions,
                typeOptions,
                bustypeOptions,
                isRelevOptions,
                undertakeOptions,
                columnsMap,
                pagedTable,
                dialogIsShow: true,
                paramForm: {
                    name: '',//项目名称
                    stage: '',//项目阶段
                    protype: '',//项目类型
                    bustype: '',//业务类型
                    budget:{
                        num1 : null,
                        num2 : null,
                    },//项目预算
                    pact: {
                        num1:null,
                        num2:null,
                    },//合同金额
                    manager: '',//市场经理
                    guide: '',//项目指导
                    relevancy: '',//关联产品
                    carry: '',//承接部门
                    join: '',//合作部门
                    time:{
                        opentime:null,
                        closetime:null,
                    },
                    issue: '',//发布人
                },
                value: '',
            }
        },
        mixins: [mixins],
        components:{
        },
        methods: {
            closeDialog () {
                this.dialogIsShow = false
                this.paramForm = {
                    name: '',//项目名称
                        stage: '',//项目阶段
                        protype: '',//项目类型
                        bustype: '',//业务类型
                        budget:{
                        num1 : null,
                            num2 : null,
                    },//项目预算
                    pact: {
                        num1:null,
                            num2:null,
                    },//合同金额
                    manager: '',//市场经理
                        guide: '',//项目指导
                        relevancy: '',//关联产品
                        carry: '',//承接部门
                        join: '',//合作部门
                        time:{
                        opentime:null,
                            closetime:null,
                    },
                    issue: '',//发布人
                }
            },
            jumpSurvey (row){
                this.$store.commit('SET_ACCESS_TOKEN',row)
                this.$router.push('/gpms/project/prooverview/overview')
            },
            searchPage (name){
                if(name){
                    this.paramForm.name = name
                }
                console.log(this.paramForm)
                // console.log(this.paramForm)
                // 搜索完成后
                // this.paramForm.name = ''
            },
            //勾选行执行
            selectionChange (val){
                this.multipleSelection = val
            },
            //删除所有勾选行
            deleteAll (){
                this._handleGlobalAll()
            },
            deleteOne (val){
                // console.log(val)
                this._handleGlobalById(val.id)
            },
            addProject (){
                // console.log('添加项目')
                // console.log(this.isShow)
                this.$emit('toggle-show',!this.isShow)
            },
        },
        mounted (){
          // console.log(this.isShow)
        },
        props:{
            isShow:{
                type: Boolean,
                required: false,
            },
        },
    }
</script>

<style scoped>
    .search {
        height: 35px;
        line-height: 26px;
        color: #666;
        font-weight: 900;
        font-size: 17px;
        border-bottom: 1px solid #cdcdcd;
        margin-bottom: 20px;
    }
    .searchbot {
        margin-right: 20px !important;
    }
    .num{
        width: 47%;
    }
    .smallcol{
        width: 110px !important;
    }
    .blackColor{
        color: #666;
    }

</style>