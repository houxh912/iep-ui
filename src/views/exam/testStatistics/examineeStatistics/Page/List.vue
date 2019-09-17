<template>
    <div>
        <basic-container>
            <iep-page-header title="考生统计" :data="[10, 5]"></iep-page-header>
            <operation-container>
                <template slot="left">
                    共有<span class="sum">{{total}}</span><span class="sumUnit">个</span> 国脉同学进行了考试
                </template>
                <template slot="right">
                    <operation-search
                        @search-page="searchPage"
                        :params="searchForm.staffName"
                        prop="staffName"
                        advanceSearch
                        placeholder="输入考生姓名进行搜索">
                        <advance-search @search-page="searchPage"></advance-search>
                    </operation-search>
                </template>
            </operation-container>

            <div class="table">
                <iep-table
                    :isLoadTable="isLoadTable"
                    :pagination="pagination"
                    :columnsMap="columnsMap"
                    :pagedTable="pagedTable"
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    is-index>
                    <el-table-column prop="operation" label="操作" width="120px">
                        <template slot-scope="scope">
                            <operation-wrapper>
                                <iep-button type="warning" plain @click="handleDetail(scope.row)">考试详情</iep-button>
                            </operation-wrapper>
                        </template>
                    </el-table-column>
                </iep-table>
            </div>
        </basic-container>
    </div>
</template>

<script>
import AdvanceSearch from './AdvanceSearch'
import mixins from '@/mixins/mixins'
import { mapGetters } from 'vuex'
import { columnsMap } from './option'
import { getExamineeList } from '@/api/exam/testStatistics/examineeStatistics'
export default {
    mixins: [mixins],
    components: { AdvanceSearch },
    computed: {
        ...mapGetters(['permissions']),
    },
    props: [
        'record',
    ],
    data () {
        return {
            columnsMap,
            activeName: 'first',
            total: null,
        }
    },
    created () {
        if (this.record) {
            var _this = this
            const param = {
                title: _this.record.search,
            }
            _this.pageOption.current = _this.record.current
            _this.pageOption.size = _this.record.size
            _this.searchForm.staffName = param.title
            _this.loadTable({ ...param, ..._this.pageOption,..._this.searchForm }, getExamineeList).then(function (res) {
                _this.total = res.total
            })
        }
        else {
            this.loadPage ()
        }
    },
    methods: {
        /**
         * 获取试卷列表数据
         */
        loadPage (param = this.searchForm) {
            var _this = this
            _this.loadTable(param, getExamineeList).then(function (res) {
                _this.total = res.total
            })
        },
        // 点击考试详情
        handleDetail (row) {
            this.$emit('onEdit', {
                row: row,
                current: this.pageOption.current,
                size: this.pageOption.size,
                search: this.searchForm.staffName,
            })
        },
    },
}
</script>

<style lang="scss" scoped>
.sum {
    margin-left: .5em;
    color: #BA1B21;
    font-weight: bold;
}
.sumUnit {
    padding-right: .5em;
    color: #BA1B21;
    font-weight: bold;
}
</style>