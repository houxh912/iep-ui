<template>
  <div class="abs iep-page-form">
    <basic-container>
      <iep-page-header title="新增项目-选择项目主题" :backOption="backOption"></iep-page-header>

      <el-form :model="form" ref="form" label-width="100px" class="form-detail" size="small">
        <el-row>
          <div>* 即项目标签（可多选）；历史项目或信息明确的项目可直接<span class="jumpOver" @click="jumpOver">跳过</span>。</div>
          <div class="tag-counter">
            <span v-for="(item,index) in recommendTagList" :key="item.id" :class="item.isClick ? 'active':''" @click="changeTagList(index)">{{item.name}}</span>
          </div>
          <el-col :span="24">
            <el-form-item label="更多项目标签：" prop="projectTagList" placeholder="添加自定义主题（标签）" label-width="120px">
              <iep-tag v-model="form.projectTagList"></iep-tag>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="客户名称：" prop="projectName" label-width="120px">
              <IepCrmsSelect v-model="form.clientVal" :option="[{id: form.relatedClientList.id, name: form.relatedClientList.name}]" prefixUrl="crm/customer/all/list" @change="changClient">
              </IepCrmsSelect>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <footer-tool-bar>
        <iep-button type="primary" @click="next">下一步</iep-button>
      </footer-tool-bar>
    </basic-container>
  </div>
</template>

<script>
// import chunk from 'lodash/chunk'
import { getRecTags } from '@/api/tms/tag'
export default {
  name: 'add-first',
  data () {
    return {
      backOption: {
        isBack: true,
        backPath: null,
        backFunction: () => {
          this.close()
        },
      },
      recommendTagList: [],
      form: {
        clientName: '',
        clientVal: '',
        projectTagList: [],
        relatedClientList: [{
          id: '',
          name: '',
        }],
      },
      allTagList: [],
    }
  },
  computed: {
  },
  created () {
    this.loadPage()
  },
  methods: {
    async loadPage () {
      const { data } = await getRecTags()
      this.recommendTagList = data.data.map(m => {
        return {
          ...m,
          isClick: false,
        }
      })
    },
    close () {
      this.$router.history.go(-1)
    },
    next () {
      this.recommendTagList = this.recommendTagList.filter(item => item.isClick === true)
      this.recommendTagList = this.recommendTagList.map(m => {
        return m['name']
      })
      this.allTagList = this.recommendTagList.concat(this.form.projectTagList)
      this.allTagList = Array.from(new Set(this.allTagList))
      if (this.allTagList == '') {
        this.$message.error('请选择标签')
        this.loadPage()
      }
      else {
        this.$router.push({
          path: '/gpms_spa/project/recommend_add',
          query: {
            allTagList: this.allTagList,
            clientVal: this.form.clientVal,
            clientName: this.form.clientName,
          },
        })
      }
    },
    jumpOver () {
      this.$router.push({
        path: '/gpms_spa/project/add',
      })
    },
    changeTagList (val) {
      if (this.recommendTagList[val].isClick == false) {
        this.recommendTagList[val].isClick = true
      }
      else {
        this.recommendTagList[val].isClick = false
      }
    },
    changClient (newVal, name) {
      this.form.clientVal = newVal
      this.form.clientName = name
    },
  },
}
</script>

<style scoped lang="scss">
.jumpOver {
  color: #b91b21;
  cursor: pointer;
}
.tag-counter {
  padding: 20px;
  > span {
    display: inline-block;
    margin: 10px 5px;
    padding: 2px 10px;
    border: 1px solid #eee;
    transition: all 0.3s linear;
    color: #999;
    &:hover {
      cursor: pointer;
      color: #b91b21;
      border: 1px solid #b91b21;
    }
  }
  .active {
    color: #b91b21;
    border: 1px solid #b91b21;
  }
}
</style>