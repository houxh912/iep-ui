<template>
    <div class="table">
        <operation-container>
            <template slot="right">
                <operation-search
                    @search-page="searchPage"
                    :params="searchForm.cerName"
                    prop="cerName"
                    placeholder="输入证书名称进行搜索">
                    <advance-search @search-page="searchPage"></advance-search>
                </operation-search>
            </template>
        </operation-container>
        <iep-table
            :isLoadTable="isLoadTable"
            :pagination="pagination"
            :columnsMap="certificateMap"
            :pagedTable="pagedTable"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            is-index>
            <el-table-column prop="operation" label="操作" width="110px">
                <template slot-scope="scope">
                    <operation-wrapper>
                        <iep-button type="warning" plain @click="handleShow(scope.row)">查 看</iep-button>
                    </operation-wrapper>
                </template>
            </el-table-column>
        </iep-table>
        <iep-dialog :dialog-show="dialogShow" title="证书信息" width="700px" @close="dialogShow = false">
            <div @mouseenter="enter()" @mouseleave="leave()">
                <el-image :src="src"></el-image>
                <div v-show="seen" class="imgTxt">右键下载证书</div>
            </div>
            <template slot="footer">
                <!-- <iep-button type="primary" @click="handleDownloadImg()">下载证书</iep-button> -->
                <iep-button @click="dialogShow = false">确定</iep-button>
            </template>
        </iep-dialog>
    </div>
</template>
<script>
import { getCertificateMapList } from '@/api/exam/testStatistics/examineeStatistics'
import mixins from '@/mixins/mixins'
import { mapGetters } from 'vuex'
import { certificateMap } from './option'
export default {
    mixins: [mixins],
    computed: {
        ...mapGetters(['permissions']),
    },
    props: [
        'record',
    ],
    data () {
        return {
            certificateMap,
            dialogShow: false,
            src: '',
            cerName: '',
            seen: false,
        }
    },
    created () {
        this.loadPage ()
    },
    methods: {
        /**
         * 获取考试详情数据
         */
        loadPage (param = this.searchForm) {
            param.creatorId = this.record.creatorId
            param.examRankWay = 3
            this.loadTable(param, getCertificateMapList)
        },
        // 查看按钮
        handleShow (row) {
            this.dialogShow = true
            this.src = row.imgurl
            this.cerName = row.imgurl
        },
        // 下载证书按钮
        handleDownloadImg () {
            // 字符内容转变成blob地址
            var blob = new Blob([this.src])
            var eleLink = document.createElement('a')
            eleLink.href = window.URL.createObjectURL(blob)
            eleLink.download = this.src
            // 触发点击
            document.body.appendChild(eleLink)
            eleLink.style.display = 'none'
            eleLink.click()
            // 然后移除
            document.body.removeChild(eleLink)
        },
        //鼠标移入移出
        enter (){
            // this.seen = true
        },
        leave (){
            // this.seen = false
        },
    },
}
</script>

<style lang="scss" scoped>
.imgTxt{
    position: absolute;
    bottom: 5px;
    right: 15px;
    background-color: rgba(254, 240, 240, 0.6);
    padding: 2px 8px;
    border-radius: 5px;
    font-weight: 600;
}
</style>