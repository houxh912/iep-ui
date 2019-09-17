<template>
    <div class="report">
        <iep-page-header :title="`${record.row.staffName}的成绩总览`" :data="[10, 5]" :backOption="backOption"></iep-page-header>
        <div>
            <hr>
        </div>
        <el-form ref="examineeForm" :model="examineeForm" label-width="130px">
            <el-row class="item">
                <el-col :span="6">
                    <el-form-item label="考生姓名：">
                        <el-input v-model="examineeForm.staffName" size="mini" readonly></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="6">
                    <el-form-item label="所在组织：">
                        <el-input v-model="examineeForm.department" size="mini" readonly></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row class="item">
                <el-col :span="6">
                    <el-form-item label="参加考试次数：">
                        <el-input v-model="examineeForm.examTime" size="mini" readonly></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="6">
                    <el-form-item label="合格次数：">
                        <el-input v-model="examineeForm.passTime" size="mini" readonly></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="6">
                    <el-form-item label="合格率：">
                        <el-input v-model="examineeForm.passRate" size="mini" readonly></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="6">
                    <el-form-item label="证书数量：">
                        <el-input v-model="examineeForm.certificate" size="mini" readonly></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row class="item">
                <!-- <el-col :span="6">
                    <el-form-item label="未参与考试次数：">
                        <el-input v-model="examineeForm.noJoinTime" size="mini" readonly></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="6">
                    <el-form-item label="参与率：">
                        <el-input v-model="examineeForm.joinRate" size="mini" readonly></el-input>
                    </el-form-item>
                </el-col> -->
                <el-col :span="6">
                    <el-form-item label="最高成绩：">
                        <el-input v-model="examineeForm.topGrade" size="mini" readonly></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="6">
                    <el-form-item label="最低成绩：">
                        <el-input v-model="examineeForm.lowGrade" size="mini" readonly></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
        </el-form>

        <el-tabs v-model="activeName">
            <el-tab-pane label="考试详情" name="exam">
                <exam-list ref="exam" :record="record.row"></exam-list>
            </el-tab-pane>
            <el-tab-pane label="证书详情" name="certificate">
                <certificate-list ref="certificate" :record="record.row"></certificate-list>
            </el-tab-pane>
        </el-tabs>
    </div>
</template>

<script>
import ExamList from './examList.vue'
import CertificateList from './certificateList.vue'
export default {
    props: [
        'record',
    ],
    components: {
        ExamList,
        CertificateList,
    },
    data () {
        return {
            backOption: {
                isBack: true,
                backPath: null,
                backFunction: this.handleGoBack,
            },
            examineeForm: {},
            activeName: 'exam',
        }
    },
    created () {
        this.showForm ()
    },
    methods: {
        // 填写表单
        showForm () {
            var rowData = this.record.row
            this.examineeForm = rowData
        },
        /**
         * 返回
         */
        handleGoBack () {
            this.$emit('onGoBack', {
                current: this.record.current,
                size: this.record.size,
                search: this.record.search,
            })
        },
    },
}
</script>

<style lang="scss" scoped>
.report {
  padding: 20px;
  background-color: #fff;
}
hr{
    margin-top: -8px;
    background-color: #D7D7D7;
    border: none;
    height: 1px;
}
.el-form-item {
    margin-bottom: 5px;
}
</style>