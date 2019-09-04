<template>
    <div>
        <el-row class="testShow">
            <el-row>
                <el-col :span="8">
                    <el-card class="box-card" shadow="never">
                        <span class="txt">试题种类</span><br>
                        <div class="tags">
                            <iep-tag-detail :value="tagSubject">
                            </iep-tag-detail>
                        </div>
                        <div class="btn">
                            <iep-button :disabled="btnModifyOne" type="primary" plain @click="handleModify (0)">修改
                            </iep-button>
                        </div>
                    </el-card>
                </el-col>
                <el-col :span="8">
                    <el-card class="box-card" shadow="never">
                        <span class="txt">试题类型</span><br>
                        <div class="tags">
                            <iep-tag-detail :value="tagType">
                            </iep-tag-detail>
                        </div>
                        <div class="btn">
                            <iep-button :disabled="btnModifyTwo" type="primary" plain @click="handleModify (1)">修改
                            </iep-button>
                        </div>
                    </el-card>
                </el-col>
                <el-col :span="8">
                    <el-card class="box-card" shadow="never">
                        <span class="txt">证书级别</span><br>
                        <div class="tags">
                            <iep-tag-detail :value="tagDifficulty">
                            </iep-tag-detail>
                        </div>
                        <div class="btn">
                            <iep-button :disabled="btnModifyThree" type="primary" plain @click="handleModify (2)">修改
                            </iep-button>
                        </div>
                    </el-card>
                </el-col>
            </el-row>
            <hr v-show="iepTag" style="margin:37px 0;border: 0;">
            <el-row v-show="iepTag">
                <el-col :span="21">
                    <iep-tag v-model="form.tagKeyWords">
                    </iep-tag>
                </el-col>
                <el-col :span="3">
                    <el-button-group>
                        <el-button size="small" plain @click="handleSubmitTag" :loading="loading" icon="el-icon-circle-check">确定
                        </el-button>
                        <el-button size="small" plain @click="handleCloseTag" icon="el-icon-circle-close">关闭
                        </el-button>
                    </el-button-group>
                </el-col>
            </el-row>
        </el-row>
    </div>
</template>

<script>
import { getOptionList } from '@/api/exam/setting/setting'
export default {
    data () {
        return {
            form: {
                tagKeyWords: [],
            },
            iepTag: false,
            tagSubject: [],
            tagType: [],
            tagDifficulty: [],
            btnModifyOne: false,
            btnModifyTwo: false,
            btnModifyThree: false,
            loading: false,
        }
    },
    created () {
        this.getOption ()
    },
    methods: {
        /**
         * 确定提交
         */
        handleSubmitTag () {
            this.loading = true
        },
        /**
         * 关闭
         */
        handleCloseTag () {
            this.iepTag = false
            this.btnModifyOne = false
            this.btnModifyTwo = false
            this.btnModifyThree = false
        },
        /**
         * 修改
         */
        handleModify (value) {
            this.iepTag = true
            if (value === 0) {
                this.btnModifyTwo = true
                this.btnModifyThree = true
            }
            else if (value === 1) {
                this.btnModifyOne = true
                this.btnModifyThree = true
            }
            else {
                this.btnModifyOne = true
                this.btnModifyTwo = true
            }
        },
        /**
         * 获取选项数据
         */
        async getOption () {
            const params = {
                numberList: [
                'exms_subjects',//考试科目
                'exms_question_type',//题型
                'exms_question_category',//题类
                'exms_difficulty',//难度
                ],
            }
            const { data } = await getOptionList(params)
            this.tagSubject = data.exms_subjects.map(item => item.label)
            this.tagType = data.exms_question_type.map(item => item.label)
            this.tagDifficulty = data.exms_difficulty.map(item => item.label)
        },
    },
}
</script>

<style lang="scss" scoped>
.testShow {
    .el-row:first-child {
        .el-col {
            padding: 10px;
            .box-card {
                .btn {
                    text-align: center;
                }
                .tags {
                    width: 100%;
                    min-height: 110px;
                    margin-top: 20px;
                    float: left;
                }
                .txt {
                    padding-bottom: 9px;
                    font-weight: 500;
                    font-size: 16px;
                    border-bottom: 1.5px solid #cb3737;
                }
            }
        }
    }
    .el-row:last-child {
        padding: 0 10px;
        .el-col:first-child {
            float: left;
        }
        .el-col:last-child {
            float: right;
            text-align: right;
        }
    }
}
</style>

