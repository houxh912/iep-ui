<template>
  <div>
    <el-row class="aside-main" :gutter="8">
      <el-col class="sub-menu-left" :span="4">
        <el-card shadow="never" :body-style="bodyStyle">
          <div slot="header" class="clearfix">
            <span class="title">通讯录</span>
          </div>
          <el-menu :default-openeds="selectType" class="menu-vertical">
            <!-- <el-submenu index="1" collapse>
              <template slot="title">
                <span>国脉人</span>
              </template>
              <el-menu-item class="menu-item" :index="item.value+''" :key="item.value" v-for="item in allPeople" @click.native="handleAllPeople(item.value)">
                <span>{{item.label}}</span>
              </el-menu-item>
            </el-submenu> -->
            <el-menu-item index="1" @click.native="handleAllPeople(1001)">
              <span slot="title">国脉人</span>
            </el-menu-item>
            <el-submenu index="2" collapse>
              <template slot="title">
                <span>我的关系</span>
              </template>
              <el-menu-item index="601" class="menu-item" @click.native="mark = 'master'">
                <span>我的师父</span>
              </el-menu-item>
              <el-menu-item index="602" class="menu-item" @click.native="mark = 'apprentice'">
                <span>我的徒弟</span>
              </el-menu-item>
              <el-menu-item index="603" class="menu-item" @click.native="mark = 'attention'">
                <span>我的关注</span>
              </el-menu-item>
              <el-menu-item index="604" class="menu-item" @click.native="mark = 'friend'">
                <span>我的好友</span>
              </el-menu-item>
              <el-menu-item class="menu-item" :index="item.id+''" :key="item.id" v-for="item in relationship" @click.native="handleSelectType(item.id,item.userId==userInfo.userId)" @dblclick.native="item.userId==userInfo.userId?changeGroup(item.name,item.id,item.isOpen):''">
                <el-tooltip class="item" effect="dark" content="双击可进行编辑自定义分组名" placement="left" v-if="item.userId==userInfo.userId">
                  <span>{{item.name}}</span>
                </el-tooltip>
                <span v-else>{{item.name}}</span>
                <i class="iconfont icon-shanchu1" @click="handleDelete(item.id)" v-show="item.userId==userInfo.userId"></i>
              </el-menu-item>
            </el-submenu>
          </el-menu>
          <el-button style="width:100%;border:0;" @click="openContact"><i class="iconfont icon-xinzeng"></i></el-button>
        </el-card>
      </el-col>
      <el-col :span="20">
        <component ref="pageList" :is="mark"></component>
      </el-col>
    </el-row>
    <dialog-form ref="DialogForm" @load-page="loadPage"></dialog-form>
  </div>
</template>
<script>
import { joinRelationship, getRelationshipList, deleteRelationshipList, putRelationshipList } from '@/api/wel/relationship_manage'
import mixins from '@/mixins/mixins'
import formMixins from '@/mixins/formMixins'
import DialogForm from './DialogForm'
import master from './MentorTable/masterPage'
import apprentice from './MentorTable/apprenticePage'
import attention from './MentorTable/attentionPage'
import friend from './MentorTable/friendPage'
import mainPage from './MentorTable/mainPage'
import { initForm } from './options'
import { mapGetters } from 'vuex'

export default {
  mixins: [mixins, formMixins],
  components: {
    DialogForm,
    master,
    apprentice,
    attention,
    friend,
    mainPage,
  },
  data () {
    return {
      bodyStyle: {
        padding: 0,
      },
      mark: this.$route.query.mark ? this.$route.query.mark : 'mainPage',
      selectType: ['1', '2'],
      allPeople: [
        { value: 1001, label: '按岗位信息' },
        { value: 1002, label: '按职务信息' },
        { value: 1003, label: '按职称信息' },
      ],
      relationship: [
      ],
    }
  },
  computed: {
    ...mapGetters([
      'userInfo',
    ]),
  },
  created () {
    this.loadPage()
  },
  methods: {
    handleDelete (id) {
      this._handleGlobalDeleteById(id, deleteRelationshipList)
    },
    handleAllPeople (val) {
      this.mark = 'mainPage'
      this.$nextTick(() => {
        this.$refs['pageList'].mark = ''
        if (val == 1001) {
          this.$refs['pageList'].sort.positionId = '1'
          this.$refs['pageList'].sort.jobId = ''
          this.$refs['pageList'].sort.professionalTitleId = ''
        }
        else if (val == 1002) {
          this.$refs['pageList'].sort.positionId = ''
          this.$refs['pageList'].sort.jobId = '1'
          this.$refs['pageList'].sort.professionalTitleId = ''
        }
        else if (val == 1003) {
          this.$refs['pageList'].sort.positionId = ''
          this.$refs['pageList'].sort.jobId = ''
          this.$refs['pageList'].sort.professionalTitleId = '1'
        }
        if (typeof this.$refs['pageList'].$refs['OperationSearch'] != 'undefined') {
          this.$refs['pageList'].$refs['OperationSearch'].input = ''
        }
        this.$refs['pageList'].orgId = ''
        this.$refs['pageList'].searchPage()
      })
    },
    openContact () {
      this.$refs['DialogForm'].form = initForm()
      this.$refs['DialogForm'].formRequestFn = joinRelationship
      this.$refs['DialogForm'].dialogShow = true
      this.$refs['DialogForm'].methodName = '新增'
    },

    changeGroup (name, id, isOpen) {
      this.$refs['DialogForm'].form.name = name
      this.$refs['DialogForm'].form.id = id
      this.$refs['DialogForm'].form.isOpen = isOpen
      this.$refs['DialogForm'].methodName = '编辑'
      this.$refs['DialogForm'].formRequestFn = putRelationshipList
      this.$refs['DialogForm'].dialogShow = true
    },
    handleSelectType (k, isremove) {
      this.mark = 'mainPage'
      this.$nextTick(() => {
        this.$refs['pageList'].mark = 'group'
        this.$refs['pageList'].groupType = k
        this.$refs['pageList'].isremove = isremove
        if (typeof this.$refs['pageList'].$refs['OperationSearch'] != 'undefined') {
          this.$refs['pageList'].$refs['OperationSearch'].input = ''
        }
        this.$refs['pageList'].orgId = ''
        this.$refs['pageList'].searchPage()
      })

    },
    loadPage () {
      getRelationshipList().then(({ data }) => {
        this.relationship = data.data
      })
      this.$nextTick(() => {
        this.$refs['pageList'].searchPage()
      })
    },
  },
  watch: {
  },
}
</script>
<style lang="scss" scoped>
.aside-main {
  display: flex;
  margin: 0 !important;
  padding: 20px;
  width: 100%;
  height: 100vh;
  .title {
    font-size: 16px;
  }
  .menu-vertical {
    border: none;
  }
  .menu-item {
    display: flex;
    justify-content: space-between;
    & > .mark {
      margin-top: 5px;
    }
  }
  .page-container {
    margin-left: 20px;
    width: 100%;
  }
}
.sub-menu-left {
  margin: -20px 15px -20px -20px;
  padding-top: 12px;
  border-right: 1px solid #ebeef5;
  .el-card {
    border: 0;
  }
}
</style>
<style scoped>
.sub-menu-left >>> .el-card__header {
  padding: 8px 20px;
  border: 0;
}
.sub-menu-left >>> .el-menu-item {
  height: 40px;
  line-height: 40px;
}
</style>




