<template>
    <div class="table">
        <operation-container>
            <template slot="right">
                <operation-search
                    @search-page="searchPage"
                    :params="searchForm.examName"
                    prop="examName"
                    advanceSearch
                    placeholder="输入考试名称进行搜索">
                    <advance-search @search-page="searchPage"></advance-search>
                </operation-search>
            </template>
        </operation-container>
        <iep-table
            :isLoadTable="isLoadTable"
            :pagination="pagination"
            :columnsMap="examMap"
            :pagedTable="pagedTable"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            is-index>
            <el-table-column prop="answerTime" label="答题时长">
                <template slot-scope="scope">
                {{scope.row.answerTime | setTime}}
                </template>
            </el-table-column>
            <el-table-column prop="result" label="成绩">
            <template slot-scope="scope">
                {{scope.row.result}}
            </template>
            </el-table-column>
            <el-table-column prop="isPass" label="成绩状态">
                <template slot-scope="scope">
                    <el-tag type="success" size="medium" v-if="scope.row.isPass === 1">及格</el-tag>
                    <el-tag type="warning" size="medium" v-if="scope.row.isPass === -1">不及格</el-tag>
                    <span v-if="scope.row.isPass === 0">暂无</span>
                </template>
            </el-table-column>
        </iep-table>
    </div>
</template>
<script>
import AdvanceSearch from './ExamAdvanceSearch'
import { getExamList } from '@/api/exam/testStatistics/examineeStatistics'
import mixins from '@/mixins/mixins'
import { mapGetters } from 'vuex'
import { examMap } from './option'
export default {
    components: { AdvanceSearch },
    mixins: [mixins],
    computed: {
        ...mapGetters(['permissions']),
    },
    props: [
        'record',
    ],
    data () {
        return {
            examMap,
            searchExamName: '',
        }
    },
    filters: {
        setTime (val) {
            if (val) {
                return val + ' 分钟'
            }
        },
    },
    created () {
        this.loadPage ()
    },
    methods: {
        /**
         * 获取考试详情数据
         */
        loadPage (param = this.searchForm) {
            param.examRankWay = 3
            param.creatorId = this.record.creatorId
            this.loadTable(param, getExamList)
        },
    },
}
</script>

<style lang="scss" scoped>

</style>